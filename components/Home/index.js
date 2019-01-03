import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import PageTitle from '../PageTitle';
import styles from './styles';

const getData = ({ setState }) => {
  const postsPromise = axios.get('/content/blog').then(res => ({
    posts: res.data,
  }));

  Promise.all([postsPromise]).then(([a]) =>
    setState({
      ...a,
      initial: false,
    }),
  );
};

const Home = () => {
  const initialState = {
    initial: true,
    posts: [],
  };
  const [state, setState] = useState(initialState);
  const { initial, posts } = state;

  useEffect(() => {
    if (initial) {
      getData({ setState });
    }
  });

  return (
    <div className="root">
      <PageTitle />
      <style jsx>{styles}</style>
      <div className="markdown">
        <h3>All Posts</h3>
        <ul className="files">
          {posts
            .slice()
            .reverse()
            .map(id => (
              <li key={id}>
                <Link
                  href={{ pathname: '/blog', query: { id } }}
                  as={`/blog/${id}`}
                >
                  <a>{moment(id).format('MMMM Do, YYYY')}</a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
