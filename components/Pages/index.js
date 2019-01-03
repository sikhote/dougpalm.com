import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import Error from 'next/error';
import he from 'he';
import axios from 'axios';
import PageTitle from '../PageTitle';
import styles from './styles';

const converter = new showdown.Converter();
const getH1 = html => {
  const strippedHtml = html.replace(/<[^>]+>/g, '');
  const decodedStrippedHtml = he.decode(strippedHtml);
  return decodedStrippedHtml.split('\n')[0];
};
const getData = ({ id, setState }) => {
  if (!id) {
    return;
  }

  const markdownPromise = axios
    .get(`/content/pages/${id}/index.md`)
    .then(res => {
      const html = converter.makeHtml(res.data);
      const title = html.indexOf('<h1') === -1 ? '' : getH1(html);
      return { html, title };
    });

  const filesPromise = axios
    .get(`/content/pages/${id}`)
    .then(res => ({
      exists: typeof res.data === 'object',
      files: res.data.filter(file => file !== 'index.md'),
    }))
    .catch(() => ({ exists: false }));

  Promise.all([markdownPromise, filesPromise]).then(([a, b]) =>
    setState({
      ...a,
      ...b,
      initial: false,
      id,
    }),
  );
};

const Pages = props => {
  const initialState = {
    initial: true,
    exists: undefined,
    html: '',
    files: [],
    title: '',
    id,
  };
  const [state, setState] = useState(initialState);
  const { initial, html, files, title, exists, id } = state;

  useEffect(() => {
    if (initial || id !== props.id) {
      getData({ id: props.id, setState });
    }
  });

  if (!id || exists === false) {
    return <Error statusCode={404} />;
  }

  if (exists === undefined) {
    return null;
  }

  return (
    <div className="root">
      <PageTitle title={title} />
      <style jsx>{styles}</style>
      {html && (
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      )}
      <div className="markdown">
        {files.length > 0 && (
          <ul className="files">
            {files.map(file => (
              <li key={file}>
                <a href={`/content/pages/${id}/${file}`}>{file}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Pages.getInitialProps = ({ query: { id } }) => ({ id });

Pages.propTypes = {
  id: PropTypes.string,
};

Pages.defaultProps = {
  id: '',
};

export default Pages;
