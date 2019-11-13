/**
 *
 * MenuColumn
 *
 */

import React, { memo } from 'react';
import { arrayOf, string, func, oneOfType, number } from 'prop-types';
import {
  noop,
  startCase,
  camelCase,
  without,
  intersection,
  difference,
} from 'lodash';
import { Dropdown, Menu, Button } from 'antd';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function MenuColumn({
  actions,
  onSelectItem,
  protectedActions,
  additionalActions,
  excludeActions,
  dataKey,
}) {
  const handleClick = ({ key }) => {
    onSelectItem(key, dataKey);
  };

  const sortActions = actionArr => {
    const protectedA = intersection(actionArr, protectedActions);
    const unprotectedA = without(actionArr, ...protectedA);
    const sumActions = [...unprotectedA];

    if (unprotectedA.length >= 1 && protectedA.length >= 1) {
      sumActions.push('@@divider');
    }

    return [...sumActions, ...protectedA];
  };

  const allActions = difference(
    [...actions, ...additionalActions],
    excludeActions,
  );

  const menu = () => (
    <Menu onClick={handleClick}>
      {sortActions(allActions).map((item, i) =>
        item === '@@divider' ? (
          <Menu.Divider key={`divider${i.toString()}`} />
        ) : (
          <Menu.Item key={item}>{startCase(camelCase(item))}</Menu.Item>
        ),
      )}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button>Actions</Button>
    </Dropdown>
  );
}

MenuColumn.propTypes = {
  actions: arrayOf(string),
  onSelectItem: func,
  protectedActions: arrayOf(string),
  additionalActions: arrayOf(string),
  excludeActions: arrayOf(string),
  dataKey: oneOfType([string, number]),
};

MenuColumn.defaultProps = {
  onSelectItem: noop,
  protectedActions: ['delete'],
  additionalActions: [],
  excludeActions: [],
};

export default memo(MenuColumn);
