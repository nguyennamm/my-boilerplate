/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import TodoPage from 'containers/TodoPage';
import AddItemTodoPage from 'containers/TodoPage/AddItem';
import ViewItemTodoPage from 'containers/TodoPage/ViewItem';
import EditItemTodoPage from 'containers/TodoPage/EditItem';

import Header from 'containers/Header';
import PrivateRoute from './privateRouter';
import GlobalStyle from '../../global-styles';
const { Content } = Layout;

const AppRoute = ({
  component: Component,
  layout: LayoutCustom,
  privateRoute,
  ...rest
}) => {
  if (privateRoute) {
    return (
      <PrivateRoute {...rest} component={Component} layout={LayoutCustom} />
    );
  }

  return (
    <Route
      {...rest}
      render={props => (
        <LayoutCustom>
          <Component {...props} />
        </LayoutCustom>
      )}
    />
  );
};

AppRoute.propTypes = {
  component: PropTypes.any,
  privateRoute: PropTypes.bool,
  layout: PropTypes.any,
};

const LayoutDefault = ({ children }) => (
  <Layout style={{ backgroundColor: 'white' }}>
    <Header title="My react boilerplate" homePagePath="/" />
    <Content>{children}</Content>
  </Layout>
);

LayoutDefault.propTypes = {
  children: PropTypes.any,
};

const LayoutAdmin = ({ children }) => (
  <Layout style={{ backgroundColor: 'white' }}>
    <Header title="Admin" homePagePath="/dashboard" />
    <Content>{children}</Content>
  </Layout>
);

LayoutAdmin.propTypes = {
  children: PropTypes.any,
};

export default function App() {
  return (
    <div>
      <Switch>
        <AppRoute exact path="/" layout={LayoutDefault} component={HomePage} />
        <AppRoute
          exact
          path="/login"
          layout={LayoutDefault}
          component={LoginPage}
        />
        <AppRoute
          exact
          path="/dashboard"
          layout={LayoutAdmin}
          component={Dashboard}
          privateRoute
        />
        <AppRoute
          exact
          path="/todos"
          layout={LayoutAdmin}
          component={TodoPage}
          privateRoute
        />
        <AppRoute
          exact
          path="/todos/add"
          layout={LayoutAdmin}
          component={AddItemTodoPage}
          privateRoute
        />
        <AppRoute
          exact
          path="/todos/view/:id"
          layout={LayoutAdmin}
          component={ViewItemTodoPage}
          privateRoute
        />
        <AppRoute
          exact
          path="/todos/edit/:id"
          layout={LayoutAdmin}
          component={EditItemTodoPage}
          privateRoute
        />
        <AppRoute path="" layout={LayoutDefault} component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
