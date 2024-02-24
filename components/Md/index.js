'use server';

import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './styles.module.scss';
import Picture from 'components/Picture';
import classNames from 'classnames';

const components = {
  img: Picture,
};

export default async function Md({ children, source, isHome }) {
  return (
    <div
      className={classNames({
        [styles.md]: true,
        [styles.mdHome]: isHome,
      })}
    >
      {source && <MDXRemote source={source} components={components} />}
      {children}
    </div>
  );
}
