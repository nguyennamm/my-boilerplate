/**
 *
 * HeaderBox
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Layout, Row, Col } from 'antd';
import Button from '../Button';
const { Header } = Layout;

const StyleHeader = styled(Header)`
  background: #f12711; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f12711,
    #f5af19
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f12711,
    #f5af19
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const TextLogo = styled.h2`
  color: white;
  text-transform: uppercase;
`;

const ButtonCustom = styled(Button)`
  &:hover,
  &:active,
  &:focus {
    color: inherit;
    border-color: inherit;
  }
`;

const RightCol = styled(Col)`
  text-align: right;
`;

function HeaderBox({ isAuthenticated, onLogout, onLogin, onHomePage, title }) {
  const handleLogout = e => {
    e.persist();
    onLogout();
  };

  const handleLogin = e => {
    e.persist();
    onLogin();
  };

  const handleClick = e => {
    e.preventDefault();
    onHomePage();
  };

  return (
    <StyleHeader>
      <Row>
        <Col span={12}>
          <Button type="link" onClick={handleClick}>
            <TextLogo>{title}</TextLogo>
          </Button>
        </Col>
        <RightCol span={12}>
          {isAuthenticated ? (
            <ButtonCustom handleRoute={handleLogout} ghost>
              Logout
            </ButtonCustom>
          ) : (
            <ButtonCustom handleRoute={handleLogin} ghost>
              Login
            </ButtonCustom>
          )}
        </RightCol>
      </Row>
    </StyleHeader>
  );
}

HeaderBox.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLogout: PropTypes.func,
  onLogin: PropTypes.func,
  onHomePage: PropTypes.func,
  title: PropTypes.string,
};

export default memo(HeaderBox);
