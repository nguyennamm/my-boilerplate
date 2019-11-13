import React, { useEffect } from 'react';
import { Form, Input, Button, Switch, Row, Col } from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

function FormTodo({
  form: { getFieldDecorator, validateFields, setFieldsValue },
  onSubmit,
  onGoBack,
  defaultValue,
  isView = false,
}) {
  const handleSubmitForm = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) onSubmit(values);
    });
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const handleGoBack = () => {
    onGoBack();
  };

  useEffect(() => {
    if (!isEmpty(defaultValue)) {
      const { title, completed } = defaultValue;
      setFieldsValue({ title, completed });
    }
  }, [defaultValue]);

  return (
    <Form {...formItemLayout} onSubmit={handleSubmitForm}>
      <Form.Item label="Title">
        {getFieldDecorator('title', {
          rules: [{ required: true, message: 'Please title!' }],
        })(<Input placeholder="title" disabled={isView} />)}
      </Form.Item>
      <Form.Item label="Completed">
        {getFieldDecorator('completed', {
          valuePropName: 'checked',
        })(<Switch disabled={isView} />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Row type="flex" justify={isView ? 'end' : 'space-between'}>
          {!isView && (
            <Col span={4}>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Col>
          )}
          {onGoBack ? (
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button type="default" onClick={handleGoBack} icon="arrow-left">
                Back
              </Button>
            </Col>
          ) : (
            ''
          )}
        </Row>
      </Form.Item>
    </Form>
  );
}

FormTodo.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onGoBack: PropTypes.func,
  defaultValue: PropTypes.object,
  isView: PropTypes.bool,
};
const WrappedForm = Form.create({ name: 'normal_add' })(FormTodo);
export default WrappedForm;
