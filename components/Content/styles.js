import css from 'styled-jsx/css';
import { colors, spacing, bps, fontSizes } from '../../lib/styling';

export const scopedStyles = css`
  .root {
    padding: ${spacing.page}px;
    padding-top: ${spacing.a5}px;
  }
  .folder {
    width: 100%;
    min-height: 600px;
    border: none;
  }
  .folder:not(:first-child) {
    margin-top: ${spacing.a5}px;
  }
  @media (max-width: ${bps.a2}px) {
    .root {
      padding: ${spacing.pageA2}px;
      padding-top: ${spacing.a4}px;
    }
  }
`;

export const globalStyles = css.global`
  .markdown a {
    color: ${colors.a1};
  }
  .markdown h1:not(:last-child) {
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
    max-height: 400px;
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
