import { promises as fs } from 'fs';
import path from 'path';
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import PropTypes from 'prop-types';
import PageTitle from '../components/PageTitle';
import { converter } from '../lib/content';

const Home = ({ posts, html }) => (
  <div>
    <PageTitle />
    {html && (
      <>
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="markdown">
          <p>Posted {moment(posts[0]).format('MMMM Do, YYYY')}.</p>
        </div>
      </>
    )}
    {posts.length > 0 && (
      <div className="markdown">
        <hr />
        <h3>All Posts</h3>
        <ul className="files">
          {posts.map(id => (
            <li key={id}>
              <Link
                href={{ pathname: '/pages', query: { id, type: 'blog' } }}
                as={`/blog/${id}`}
              >
                <a>{moment(id).format('MMMM Do, YYYY')}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), 'public', 'content', 'blog');
  const posts = await fs.readdir(blogDirectory);
  const mdPath = path.join(blogDirectory, posts[0], 'content.md');
  const md = await fs.readFile(mdPath, 'utf8');
  const html = converter.makeHtml(md);
  return { props: { html, posts } };
}

Home.propTypes = {
  posts: PropTypes.array,
  html: PropTypes.string,
};

Home.defaultProps = {
  posts: [],
  html: '',
};

export default Home;
