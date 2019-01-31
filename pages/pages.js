import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import moment from 'moment';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import { converter, getH1, contentBase } from '../lib/content';

const getData = ({ id, type, setState }) => {
  if (!id || !type) {
    return;
  }

  const markdownPromise = axios
    .get(`${contentBase}/${type}/${id}/content.md`)
    .then(res => {
      const html = converter.makeHtml(res.data);
      const title = html.indexOf('<h1') === -1 ? '' : getH1(html);
      return { html, title };
    })
    .catch(() => ({}));

  const filesPromise = axios
    .get(`${contentBase}/${type}/${id}`)
    .then(res => {
      const parser = new DOMParser();
      const page = parser.parseFromString(res.data, 'text/html');
      const links = page.querySelectorAll('#files li a');
      const files = Array.prototype.slice
        .call(links)
        .map(element => {
          const parts = element.getAttribute('href').split('/');
          return parts.slice(-1)[0];
        })
        .filter(file => file !== 'content.md');

      return {
        exists: typeof res.data === 'string',
        files,
      };
    })
    .catch(() => ({ exists: false }));

  Promise.all([markdownPromise, filesPromise]).then(([a, b]) =>
    setState({ ...a, ...b }),
  );
};

const Pages = ({ id, type }) => {
  const initialState = {
    exists: undefined,
    html: '',
    files: [],
    title: '',
  };
  const [state, setState] = useState(initialState);
  const { initial, html, files, title, exists } = state;

  useEffect(() => getData({ id, type, setState }), [id, type]);

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
                <a href={`${contentBase}/pages/${id}/${file}`}>{file}</a>
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
