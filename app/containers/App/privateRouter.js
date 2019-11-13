import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { checkCookie } from '../../utils/cookies';
import { API_TOKEN } from '../../utils/constants';

export default function PrivateRoute({
  component: Component,
  layout: Layout,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        if (checkCookie(API_TOKEN)) {
          if (Layout) {
            return (
              <Layout>
                <Component {...props} />
              </Layout>
            );
          }

          return <Component {...props} />;
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.node,
  layout: PropTypes.any,
  location: PropTypes.object,
};
