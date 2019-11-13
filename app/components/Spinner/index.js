/**
 *
 * Spinner
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Spin } from 'antd';

function Spinner({ children, show }) {
  return <Spin spinning={show}>{children}</Spin>;
}

Spinner.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
};

Spinner.defaultProps = {
  show: false,
};

export default memo(Spinner);
