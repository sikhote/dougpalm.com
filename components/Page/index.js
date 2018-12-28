import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import PageTitle from '../PageTitle';
import styles from './styles';

const Page = ({ children, title }) => (
  <div className="root">
    <style jsx>{styles}</style>
    <PageTitle title={title} />
    <Navigation />
    <div className="main">{children}</div>
  </div>
);

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Page.defaultProps = {
  title: '',
};

export default Page;
