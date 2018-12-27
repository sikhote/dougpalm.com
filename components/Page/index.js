import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import styles from './styles';

const Page = ({ children }) => (
  <div className="root">
    <style jsx>{styles}</style>
    <Navigation />
    <div className="main">{children}</div>
  </div>
);

Page.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Page;
