/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import HeaderBox from 'components/HeaderBox';
import { push } from 'connected-react-router';
import { checkCookie } from 'utils/cookies';
import { API_TOKEN } from 'utils/constants';
import makeSelectHeader from './selectors';
import reducer from './reducer';
import saga from './saga';
import { logoutUser } from '../LoginPage/actions';

export function Header({ onLogout, onLogin, onHomePage, ...rest }) {
  useInjectReducer({ key: 'header', reducer });
  useInjectSaga({ key: 'header', saga });

  const handleLogout = () => {
    onLogout();
  };

  const handleLogin = () => {
    onLogin();
  };

  const handleHomePage = () => {
    onHomePage();
  };

  const isAuth = checkCookie(API_TOKEN);

  return (
    <HeaderBox
      isAuthenticated={isAuth}
      onLogin={handleLogin}
      onLogout={handleLogout}
      onHomePage={handleHomePage}
      {...rest}
    />
  );
}

Header.propTypes = {
  onLogout: PropTypes.func,
  onHomePage: PropTypes.func,
  onLogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
});

function mapDispatchToProps(dispatch, { homePagePath }) {
  return {
    onLogout: () => dispatch(logoutUser()),
    onLogin: () => dispatch(push('/login')),
    onHomePage: () => dispatch(push(homePagePath)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Header);
