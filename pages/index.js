import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import PageTitle from '../components/PageTitle';
import { converter } from '../lib/content';

const getData = ({ setState }) => {
  const getMarkdownPromise = posts =>
    axios.get(`/content/blog/${posts[0]}/index.md`).then(res => {
      const html = converter.makeHtml(res.data);
      return { html, posts };
    });

  const postsPromise = axios.get('/content/blog').then(res => {
    const posts = res.data.reverse();
    return posts.length === 0 ? { posts } : getMarkdownPromise(posts);
  });

  Promise.all([postsPromise]).then(([a]) => setState(a));
};

const Home = () => {
  const initialState = {
    html: '',
    posts: [],
  };
  const [state, setState] = useState(initialState);
  const { posts, html } = state;

  useEffect(() => getData({ setState }), []);

  return (
    <div>
      <PageTitle />
      {html && (
        <React.Fragment>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div className="markdown">
            <p>Posted {moment(posts[0]).format('MMMM Do, YYYY')}.</p>
          </div>
        </React.Fragment>
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
};

export default Home;
