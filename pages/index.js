import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import { get } from 'https';
import { get as _get } from 'lodash';

const converter = new showdown.Converter();

const Content = ({ content }) => (
  <div className="root">
    <style jsx>{`
      .root {}
    `}</style>
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}
    />
  </div>
);

Content.getInitialProps = ({ res }) => ({ content: _get(res, 'content') });

Content.propTypes = {
  content: PropTypes.string,
};

Content.defaultProps = {
  content: '',
};

export default Content;
