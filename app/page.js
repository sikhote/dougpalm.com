import { promises as fs } from 'fs';
import Md from 'components/Md';
import Image from 'next/image';
import styles from './styles.module.scss';

export default async function Page() {
  const source = await fs.readFile('public/content/blog.md', 'utf8');
  return (
    <div>
      <div className={styles.image}>
        <Image
          src="/img/about/P9030648.jpg"
          fill
          alt="Forest with mountain backdrop"
          priority
        />
      </div>
      <Md source={source} isHome />
    </div>
  );
}
