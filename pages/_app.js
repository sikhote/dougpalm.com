import css from 'styled-jsx/css';
import React from 'react';
import PropTypes from 'prop-types';
import {
  fontFamilies,
  fontWeights,
  fontSizes,
  colors,
  spacing,
} from '../lib/styling';
import Page from '../components/Page';

const styles = css.global`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
  body {
    font-family: ${fontFamilies.normal};
    font-weight: ${fontWeights.normal};
    font-size: ${fontSizes.a3}px;
    color: ${colors.text};
    background: ${colors.background};
  }
  .markdown:nth-of-type(n + 2) {
    padding-top: ${spacing.a5}px;
  }
  .markdown a {
    color: ${colors.a1};
  }
  .markdown h1:not(:last-child) {
    padding-bottom: ${spacing.a5}px;
  }
  .markdown h2 {
    padding-bottom: ${spacing.a3}px;
  }
  .markdown h3 {
    padding-bottom: ${spacing.a3}px;
  }
  .markdown hr {
    border-top: .1px solid ${colors.border};
    margin-top: ${spacing.a5}px;
    margin-bottom: ${spacing.a6}px;
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
    max-height: 200px;
    margin-right: ${spacing.a4}px;
    margin-bottom: ${spacing.a4}px;
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
  .markdown > *:not(:last-child):not(h1):not(h2):not(h3):not(h4):not(hr) {
    padding-bottom: ${spacing.a5}px;
  }
`;

const App = ({ Component, pageProps }) => (
  <div>
    <style jsx>{styles}</style>
    <Page>
      <Component {...pageProps} />
    </Page>
  </div>
);

App.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
};

App.defaultProps = {
  pageProps: [],
};

export default App;
