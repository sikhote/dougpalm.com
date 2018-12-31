import React from 'react';
import showdown from 'showdown';
import content from '../../content/navigation.md';
import styles from './styles';

const converter = new showdown.Converter();

const Navigation = () => (
  <div className="root">
    <style jsx>{styles}</style>
    <div className="inner">
      <img src="/static/img/P9030648.jpg" alt="header" />
      <div
        dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}
        className="content"
      />
    </div>
  </div>
);

export default Navigation;
