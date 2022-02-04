import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import content from '../../public/content/navigation.md';
import { converter } from '../../lib/content';
import { pagesMatch } from '../../lib/routing';
import translations from '../../lib/translations';
import styles from './styles';

const html = converter.makeHtml(content);

const Navigation = () => {
  const initialState = {
    showNav: false,
  };
  const [state, setState] = useState(initialState);
  const { showNav } = state;

  return (
    <div className="root">
      <style jsx>{styles}</style>
      <div className="inner">
        <img src="/img/P9030648.jpg" alt="header" />
        <div className="content">
          <Link href="/">
            <a className="home">{translations.siteName}</a>
          </Link>
          <div
            className={`nav ${showNav ? 'open' : ''}`}
            onClick={() => setState({ ...state, showNav: !showNav })}
          >
            <svg className="close" viewBox="0 0 32 32">
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </svg>
            <svg className="open" viewBox="0 0 512 512">
              <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
            </svg>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className={`md ${showNav ? 'open' : ''}`}
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

              setState({ ...state, showNav: false });
              Router.push(url, asUrl);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
