/**
 *
 * Button
 *
 */

import React, { memo, Children } from 'react';
import { func, string, node } from 'prop-types';
// import styled from 'styled-components';
import { Button as ButtonAntd } from 'antd';

function Button({ handleRoute, href, onClick, children, ...rest }) {
  let button = (
    <ButtonAntd type="link" href={href} onClick={onClick}>
      {Children.toArray(children)}
    </ButtonAntd>
  );

  if (handleRoute) {
    button = (
      <ButtonAntd {...rest} onClick={handleRoute}>
        {Children.toArray(children)}
      </ButtonAntd>
    );
  }

  return <>{button}</>;
}

Button.propTypes = {
  handleRoute: func,
  href: string,
  onClick: func,
  children: node.isRequired,
};

export default memo(Button);
