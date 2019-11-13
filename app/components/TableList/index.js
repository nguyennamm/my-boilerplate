/**
 *
 * TableList
 *
 */

import React, { memo } from 'react';
import {
  array,
  arrayOf,
  shape,
  number,
  oneOfType,
  func,
  object,
  oneOf,
} from 'prop-types';
// import styled from 'styled-components';
import { isFunction, startCase, kebabCase, isBoolean, find } from 'lodash';

import { Table, Tag } from 'antd';
import MenuColumn from '../MenuColumn';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
function TableList({ columns, data, onActionClick, ...rest }) {
  let configColumn = [];

  const handleSelectItem = (action, key) => {
    const dataItem = find(data, el => el.id === key);
    onActionClick(action, key, dataItem);
  };

  if (columns.length > 0) {
    configColumn = columns.map(
      ({ key, renderType, renderData, ...restColumn }) => {
        const column = {
          key,
          title: startCase(key),
          dataIndex: key,
          ...restColumn,
        };

        if (isFunction(renderType)) {
          column.render = renderType;
        } else {
          switch (renderType) {
            case 'link':
              column.render = text => (
                <a href={renderData.href || '#'}>{text}</a>
              );
              break;
            case 'tags':
              column.render = tags => (
                <span>
                  {tags.map((tag, index) => {
                    const color = tag.color || 'red';
                    const text = tag.text || 'False';

                    return (
                      <span key={index.toString()}>
                        <Tag color={color}>{text}</Tag>
                      </span>
                    );
                  })}
                </span>
              );
              break;
            case 'tagBoolean':
              column.render = tag => {
                const index = isBoolean(tag) ? +tag : tag;
                const color = renderData[index]
                  ? renderData[index].color
                  : 'red';
                const text = renderData[index]
                  ? renderData[index].text
                  : 'False';
                const keyString = kebabCase(text);

                return (
                  <span key={keyString}>
                    <Tag color={color}>{text}</Tag>
                  </span>
                );
              };
              break;
            default:
              column.render = text => text;
              break;
          }
        }
        return column;
      },
    );
  }

  return (
    <>
      <Table rowKey={record => record.id} dataSource={data} {...rest}>
        {configColumn.length > 0 &&
          configColumn.map(column => <Table.Column {...column} />)}
        <Table.Column
          title="Actions"
          key="action"
          render={({ id }) => (
            <MenuColumn
              actions={['View', 'Edit', 'Delete']}
              onSelectItem={handleSelectItem}
              protectedActions={['Delete']}
              dataKey={id}
            />
          )}
        />
      </Table>
    </>
  );
}

TableList.propTypes = {
  columns: arrayOf(
    shape({
      key: number.isRequired,
      renderType: oneOfType([
        oneOf(['link', 'tagBoolean', 'tags', 'normal']),
        func,
      ]),
      renderData: oneOfType([array, object]),
    }),
  ).isRequired,
  data: array.isRequired,
  onActionClick: func,
};

TableList.defaultProps = {
  onActionClick: () => {},
};

export default memo(TableList);
