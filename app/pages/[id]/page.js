import { promises as fs } from 'fs';
import Md from 'components/Md';
import getMetadata from 'lib/getMetadata';

export function generateMetadata({ params }) {
  return getMetadata('pages', params);
}

export default async function Page({ params }) {
  const { id } = params;
  const source = await fs.readFile(
    `public/content/pages/${id}/index.md`,
    'utf8',
  );
  const pageFiles = await fs.readdir(`public/content/pages/${id}`, {
    withFileTypes: true,
  });
  const files = pageFiles
    .filter((dirent) => !dirent.isDirectory() && dirent.name !== 'index.md')
    .map((dirent) => dirent.name);

  return (
    <div>
      <Md source={source}>
        <ul>
          {files.map((name) => (
            <li key={name}>
              <a href={`/content/pages/${id}/${name}`}>{name}</a>
            </li>
          ))}
        </ul>
      </Md>
    </div>
  );
}

export async function generateStaticParams() {
  const pageFolders = await fs.readdir('public/content/pages', {
    withFileTypes: true,
  });
  return pageFolders
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      id: dirent.name,
    }));
}
