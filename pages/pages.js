import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import moment from 'moment';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import { converter, getH1 } from '../lib/content';

const getData = ({ id, type, setState }) => {
  if (!id || !type) {
    return;
  }

  const markdownPromise = axios
    .get(`/content/${type}/${id}/index.md`)
    .then(res => {
      const html = converter.makeHtml(res.data);
      const title = html.indexOf('<h1') === -1 ? '' : getH1(html);
      return { html, title };
    });

  const filesPromise = axios
    .get(`/content/${type}/${id}`)
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
      type,
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
    id: props.id,
    type: props.type,
  };
  const [state, setState] = useState(initialState);
  const { initial, html, files, title, exists, id, type } = state;

  useEffect(() => {
    if (initial || id !== props.id || type !== props.type) {
      getData({ id: props.id, type: props.type, setState });
    }
  });

  if (!id || !type || exists === false) {
    return <Error statusCode={404} />;
  }

  if (exists === undefined) {
    return null;
  }

  return (
    <div className="root">
      <PageTitle title={title} />
      {html && (
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      )}
      {files.length > 0 && (
        <div className="markdown">
          <ul className="files">
            {files.map(file => (
              <li key={file}>
                <a href={`/content/pages/${id}/${file}`}>{file}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {type === 'blog' && !initial && (
        <div className="markdown">
          <p>Posted {moment(id).format('MMMM Do, YYYY')}.</p>
        </div>
      )}
    </div>
  );
};

Pages.getInitialProps = ({ query: { id, type } }) => ({ id, type });

Pages.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
};

Pages.defaultProps = {
  id: '',
  type: '',
};

export default Pages;
