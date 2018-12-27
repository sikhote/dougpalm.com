import React from 'react';
import showdown from 'showdown';
import content from '../../static/content/navigation.md';
import styles from './styles';

const converter = new showdown.Converter();

const Navigation = () => (
  <div className="root">
    <style jsx>{styles}</style>
    <img src="/static/img/P9030648.jpg" alt="header" />
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}
    />
  </div>
);

export default Navigation;
