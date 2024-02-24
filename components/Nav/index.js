'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import styles from './styles.module.scss';

export default function Nav({ items }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(true);

  return (
    <nav className={styles.nav}>
      <div className={styles.title}>Doug Palm</div>
      <button
        className={styles.toggle}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {!isMobileOpen && (
          <svg viewBox="0 0 32 32" className={styles.hamburger}>
            <title>Close navigation</title>
            <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
          </svg>
        )}
        {isMobileOpen && (
          <svg viewBox="0 0 512 512" className={styles.hamburger}>
            <title>Open navigation</title>
            <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
          </svg>
        )}
      </button>
      <ul
        className={classNames([
          styles.items,
          { [styles.itemsMobileOpen]: isMobileOpen },
        ])}
      >
        {items.map(({ href, title }) => (
          <li key={href}>
            <Link
              href={href}
              className={classNames([
                styles.link,
                { [styles.linkActive]: pathname === href },
              ])}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
