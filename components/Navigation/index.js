import React from 'react';
import Router from 'next/router';
import content from '../../content/navigation.md';
import { converter } from '../../lib/content';
import { pagesMatch } from '../../lib/routing';
import styles from './styles';

const Navigation = () => (
  <div className="root">
    <style jsx>{styles}</style>
    <div className="inner">
      <img src="/static/img/P9030648.jpg" alt="header" />
      <div
        dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}
        className="content"
        onClick={e => {
          e.preventDefault();
          const asUrl = e.target.getAttribute('href');

          if (!asUrl) {
            return;
          }

          const pagesParams = pagesMatch(asUrl);
          let url = asUrl;

          if (pagesParams) {
            url = {
              pathname: '/pages',
              query: { ...pagesParams, type: 'pages' },
            };
          }

          Router.push(url, asUrl);
        }}
      />
    </div>
  </div>
);

export default Navigation;
