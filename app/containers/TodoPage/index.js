/**
 *
 * TodoPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TableList from 'components/TableList';
import Button from 'components/Button';
import { push } from 'connected-react-router';
import Spinner from 'components/Spinner';
import SearchBox from 'components/SearchBox';
import makeSelectTodoPage, { makeSelectListItem } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getList, requestDeleteItem } from './actions';
import { PREFIX_ACTION, PREFIX_ACTION_DELETE } from './constants';
import makeSelectLoading from '../Loading/selectors';

export function TodoPage({
  listItem,
  getListItem,
  onGoAddItem,
  deleteItem,
  deleteLoading,
  loading,
}) {
  useInjectReducer({ key: 'todoPage', reducer });
  useInjectSaga({ key: 'todoPage', saga });

  useEffect(() => {
    getListItem('');
  }, []);

  const columns = [
    {
      key: 'title',
      renderType: 'normal',
      renderData: [],
    },
    {
      key: 'completed',
      renderType: 'tagBoolean',
      renderData: {
        0: {
          text: 'Uncompleted',
          color: 'red',
        },
        1: {
          text: 'Completed',
          color: 'green',
        },
      },
    },
  ];

  const handleClick = () => {
    onGoAddItem({ pathname: 'add' });
  };

  const handleActionClick = (action, key, data) => {
    const actionText = action.toLowerCase();
    if (actionText === 'delete') {
      deleteItem(key);
    } else {
      onGoAddItem({ pathname: `${actionText}/${key}`, state: data });
    }
  };

  const handleSubmit = ({ keyword }) => {
    const url = `?title_like=^${keyword}`;
    getListItem(url);
  };

  const handleReset = () => {
    getListItem('');
  };

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <SearchBox onSubmit={handleSubmit} onReset={handleReset} />
      <Spinner show={loading || deleteLoading}>
        <Button handleRoute={handleClick} icon="plus">
          <span>Add</span>
        </Button>
        <TableList
          columns={columns}
          data={listItem}
          onActionClick={handleActionClick}
        />
      </Spinner>
    </div>
  );
}

TodoPage.propTypes = {
  listItem: PropTypes.array,
  getListItem: PropTypes.func,
  onGoAddItem: PropTypes.func,
  deleteItem: PropTypes.func,
  deleteLoading: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  todoPage: makeSelectTodoPage(),
  listItem: makeSelectListItem(),
  loading: makeSelectLoading(PREFIX_ACTION),
  deleteLoading: makeSelectLoading(PREFIX_ACTION_DELETE),
});

function mapDispatchToProps(dispatch, { match: { path } }) {
  return {
    getListItem: url => dispatch(getList(url)),
    onGoAddItem: ({ pathname, ...rest }) =>
      dispatch(push({ pathname: `${path}/${pathname}`, ...rest })),
    deleteItem: idItem => dispatch(requestDeleteItem(idItem)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TodoPage);
