import React from 'react';
import Page from '../components/Page';
import { spacing, bps } from '../lib/styling';

const Home = () => {
  return (
    <Page>
      <div className="root">
        <style jsx>{`
          .root {
            padding: ${spacing.page}px;
            padding-top: ${spacing.a5}px;
          }
          @media (max-width: ${bps.a2}px) {
            .root {
              padding: ${spacing.pageA2}px;
              padding-top: ${spacing.a4}px;
            }
          }
        `}</style>
        Other sections work, but this is a work in progress.
      </div>
    </Page>
  );
};

export default Home;
