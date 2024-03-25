import { promises as fs } from 'fs';
import { Noto_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Nav from 'components/Nav';
import './global.css';
import styles from './styles.module.scss';
import getMetadata from 'lib/getMetadata';

const fontNotoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--fontNotoSans',
});

export const metadata = getMetadata();

export default async function Layout({ children }) {
  const navItems = [{ title: 'Blog', href: '/' }];
  const pageFolders = await fs.readdir('public/content/pages', {
    withFileTypes: true,
  });
  pageFolders
    .filter((dirent) => dirent.isDirectory())
    .forEach((dirent) => {
      const titleLower = dirent.name.split('-').join(' ');
      const title = titleLower.charAt(0).toUpperCase() + titleLower.slice(1);
      navItems.push({ title, href: `/pages/${dirent.name}` });
    });

  return (
    <html lang="en">
      <body className={fontNotoSans.className}>
        <Nav items={navItems} />
        <main className={styles.main}>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
