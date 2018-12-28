import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import { get } from 'lodash';
import Error from 'next/error';
import he from 'he';
import Page from '../components/Page';
import { spacing, bps, colors, fontSizes } from '../lib/styling';

const converter = new showdown.Converter();
const getH1 = html => {
  const strippedHtml = html.replace(/<[^>]+>/g, '');
  const decodedStrippedHtml = he.decode(strippedHtml);
  return decodedStrippedHtml.split('\n')[0];
};

const Content = ({ content }) => {
  if (!content) {
    return <Error statusCode={404} />;
  }
  const html = converter.makeHtml(content);
  const title = html.indexOf('<h1') === -1 ? '' : getH1(html);

  return (
    <Page title={title}>
      <div className="root">
        <style jsx>{`
          .root {
            padding: ${spacing.page}px;
            padding-top: ${spacing.a4}px;
          }
          @media (max-width: ${bps.a2}px) {
            .root {
              padding: ${spacing.pageA2}px;
              padding-top: ${spacing.a4}px;
            }
          }
        `}</style>
        <style global jsx>{`
          .markdown a {
            color: ${colors.a1};
          }
          .markdown h1 {
            padding-bottom: ${spacing.a5}px;
          }
          .markdown h2 {
            padding-bottom: ${spacing.a3}px;
          }
          .markdown hr {
            border-top: 1px solid ${colors.border};
            margin-bottom: ${spacing.a4}px;
          }
          .markdown blockquote {
            color: ${colors.primary};
            font-style: italic;
            ${fontSizes.a4}
            display: inline-block;
          }
          .markdown blockquote > * {
            display: inline;
          }
          .markdown blockquote:before {
            display: inline;
            content: '“';
            color: ${colors.text};
          }
          .markdown blockquote:after {
            display: inline;
            content: '”';
            color: ${colors.text};
          }
          .markdown pre {
            max-width: 100%;
            word-break: break-all;
            white-space: pre-wrap;
          }
          .markdown img {
            max-width: 100%;
          }
          .markdown ul {
            padding: 0;
            list-style: none;
          }
          .markdown ul > li {
            padding-left: 34px;
            text-indent: -24px;
          }
          .markdown ul > li:before {
            content: '•';
            padding-right: ${spacing.a4}px;
          }
          .markdown ol {
            padding: 0;
            margin-left: ${spacing.a5}px;
          }
          .markdown
            > *:not(:last-child):not(h1):not(h2):not(h3):not(h4):not(hr) {
            padding-bottom: ${spacing.a5}px;
          }
        `}</style>
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Page>
  );
};

Content.getInitialProps = ({ res }) => ({ content: get(res, 'content') });

Content.propTypes = {
  content: PropTypes.string,
};

Content.defaultProps = {
  content: '',
};

export default Content;
