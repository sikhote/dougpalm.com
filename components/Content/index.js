import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import { get } from 'lodash';
import Error from 'next/error';
import he from 'he';
import PageTitle from '../PageTitle';
import { scopedStyles, globalStyles } from './styles';

const converter = new showdown.Converter();
const getH1 = html => {
  const strippedHtml = html.replace(/<[^>]+>/g, '');
  const decodedStrippedHtml = he.decode(strippedHtml);
  return decodedStrippedHtml.split('\n')[0];
};

const Content = ({ markdown, folder }) => {
  if (!markdown) {
    return <Error statusCode={404} />;
  }

  const html = converter.makeHtml(markdown);
  const title = html.indexOf('<h1') === -1 ? '' : getH1(html);

  return (
    <div className="root">
      <PageTitle title={title} />
      <style jsx>{scopedStyles}</style>
      <style jsx>{globalStyles}</style>
      {html && (
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      )}
      {folder && <iframe className="folder" src={folder} />}
    </div>
  );
};

Content.getInitialProps = ({ res }) => ({
  markdown: get(res, 'markdown'),
  folder: get(res, 'folder'),
});

Content.propTypes = {
  markdown: PropTypes.string,
  folder: PropTypes.string,
};

Content.defaultProps = {
  markdown: '',
  hasFiles: '',
};

export default Content;
