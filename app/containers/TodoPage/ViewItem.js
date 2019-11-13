/**
 *
 * TodoPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { goBack } from 'connected-react-router';
import makeSelectTodoPage, { makeSelectListItem } from './selectors';
import reducer from './reducer';
import saga from './saga';
import FormTodo from '../../components/Form/FormTodo';

export function ViewItem({ onGoBack, location: { state } }) {
  useInjectReducer({ key: 'todoPage', reducer });
  useInjectSaga({ key: 'todoPage', saga });

  return (
    <div>
      <FormTodo onGoBack={onGoBack} defaultValue={state} isView />
    </div>
  );
}

ViewItem.propTypes = {
  onGoBack: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  todoPage: makeSelectTodoPage(),
  listItem: makeSelectListItem(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGoBack: () => dispatch(goBack()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ViewItem);
