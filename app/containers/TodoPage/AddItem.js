import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { goBack } from 'connected-react-router';
import Spinner from 'components/Spinner';
import makeSelectTodoPage, { makeSelectListItem } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { requestAddItem } from './actions';
import FormTodo from '../../components/Form/FormTodo';
import makeSelectLoading from '../Loading/selectors';
import { PREFIX_ACTION_ADD } from './constants';

export function AddItem({ onGoBack, addItem, loading }) {
  useInjectReducer({ key: 'todoPage', reducer });
  useInjectSaga({ key: 'todoPage', saga });

  const handleSubmit = item => {
    addItem(item);
  };

  return (
    <div>
      <Spinner show={loading}>
        <FormTodo onGoBack={onGoBack} onSubmit={handleSubmit} />
      </Spinner>
    </div>
  );
}

AddItem.propTypes = {
  addItem: PropTypes.func,
  loading: PropTypes.bool,
  onGoBack: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  todoPage: makeSelectTodoPage(),
  listItem: makeSelectListItem(),
  loading: makeSelectLoading(PREFIX_ACTION_ADD),
});

function mapDispatchToProps(dispatch) {
  return {
    onGoBack: () => dispatch(goBack()),
    addItem: item => dispatch(requestAddItem(item)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddItem);
