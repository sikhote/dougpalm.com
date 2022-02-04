import { promises as fs } from 'fs';
import path from 'path';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/router';
import PageTitle from '../components/PageTitle';
import { converter, getH1 } from '../lib/content';

const getInitialData = () => ({
  exists: undefined,
  html: '',
  files: [],
  title: '',
});

const Pages = ({ paths }) => {
  const [data, setData] = useState(getInitialData);
  const { exists, html, files, title } = data;
  const { query } = useRouter();
  const { id, type } = query;

  useEffect(() => {
    async function getData() {
      const exists = paths.find(path => path.includes(`${type}/${id}`));

      if (!type || !id || !exists) {
        return;
      }

      const { html, title } = await axios
        .get(`/content/${type}/${id}/content.md`)
        .then(res => {
          const html = converter.makeHtml(res.data);
          const title = html.indexOf('<h1') === -1 ? '' : getH1(html);
          return { html, title };
        })
        .catch(() => ({ html: '', title: '' }));
      const files =
        type === 'pages'
          ? paths
              .filter(
                path =>
                  path.includes(`${type}/${id}`) &&
                  !path.includes('content.md'),
              )
              .map(path => path.split('/').slice(-1)[0])
          : [];

      setData({ exists, html, files, title });
    }

    getData();
  }, [id, type, paths]);

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
      {type === 'blog' && exists && (
        <div className="markdown">
          <p>Posted {moment(id).format('MMMM Do, YYYY')}.</p>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  async function getPaths(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map(dirent => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getPaths(res) : res;
      }),
    );
    return Array.prototype.concat(...files);
  }

  const fullPaths = await getPaths('public/content');
  const paths = fullPaths.map(path => path.split('public/content/')[1]);
  return { props: { paths } };
}

Pages.propTypes = {
  paths: PropTypes.array.isRequired,
};

export default Pages;
