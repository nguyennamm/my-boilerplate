/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { Redirect } from 'react-router-dom';

import FormLogin from 'components/Form/FormLogin';
import Spinner from 'components/Spinner';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectLoginPage from './selectors';
import { makeSelectError } from '../App/selectors';
import makeSelectLoading from '../Loading/selectors';
import reducer from './reducer';
import saga from './saga';
import { PREFIX_ACTION } from './constants';
import { loginUser } from './actions';
// import messages from './messages';

export function LoginPage({ onLogin, loading }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const handleSubmit = ({ username, password }) => {
    onLogin(username, password);
  };

  return (
    <div>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Spinner show={loading}>
        <FormLogin onSubmit={handleSubmit} />
      </Spinner>
    </div>
  );
}

LoginPage.propTypes = {
  loginPage: PropTypes.shape({
    token: PropTypes.string,
  }),
  onLogin: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  loading: makeSelectLoading(PREFIX_ACTION),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (username, password) => dispatch(loginUser(username, password)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
