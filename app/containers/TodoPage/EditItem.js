/**
 *
 * TodoPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { isEmpty } from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { goBack } from 'connected-react-router';
import FormTodo from 'components/Form/FormTodo';
import Spinner from 'components/Spinner';
import reducer from './reducer';
import saga from './saga';
import { requestEditItem } from './actions';
import request from '../../utils/request';
import makeSelectLoading from '../Loading/selectors';
import { PREFIX_ACTION_EDIT } from './constants';

export function EditItem({ onGoBack, editItem, loading, location: { state } }) {
  useInjectReducer({ key: 'todoPage', reducer });
  useInjectSaga({ key: 'todoPage', saga });

  const [item, setItem] = useState({});
  const { id: idItem } = state;

  const handleSubmit = el => {
    editItem(idItem, el);
  };

  const getItem = async () => {
    const data = await request(
      `https://jsonplaceholder.typicode.com/todos/${idItem}`,
    );
    if (!isEmpty(data)) {
      setItem(data);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      <Spinner show={loading}>
        <FormTodo
          onGoBack={onGoBack}
          onSubmit={handleSubmit}
          defaultValue={item}
        />
      </Spinner>
    </div>
  );
}

EditItem.propTypes = {
  onGoBack: PropTypes.func,
  editItem: PropTypes.func,
  loading: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(PREFIX_ACTION_EDIT),
});

function mapDispatchToProps(dispatch) {
  return {
    onGoBack: () => dispatch(goBack()),
    editItem: (id, data) => dispatch(requestEditItem(id, data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditItem);
