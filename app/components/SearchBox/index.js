import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function SearchBox({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsError,
    isFieldTouched,
    getFieldError,
    resetFields,
  },
  onSubmit,
  onReset,
}) {
  const handleSubmitForm = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) onSubmit(values);
    });
  };

  const titleError = isFieldTouched('title') && getFieldError('title');

  useEffect(() => {
    validateFields();
  }, []);

  const handleReset = () => {
    resetFields();
    validateFields();
    onReset();
  };

  return (
    <Form layout="inline" onSubmit={handleSubmitForm}>
      <Form.Item
        validateStatus={titleError ? 'error' : ''}
        help={titleError || ''}
      >
        {getFieldDecorator('keyword', {
          rules: [{ required: true, message: 'Please enter keyword!' }],
        })(<Input placeholder="Keyword" />)}
      </Form.Item>
      <Form.Item>
        <Button
          type="default"
          htmlType="submit"
          icon="search"
          disabled={hasErrors(getFieldsError())}
        >
          Search
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="default" icon="retweet" onClick={handleReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}

SearchBox.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};
const WrappedForm = Form.create({ name: 'normal_search' })(SearchBox);
export default WrappedForm;
