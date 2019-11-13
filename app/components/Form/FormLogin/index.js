import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
const { Password } = Input;

function FormLogin({ form: { getFieldDecorator, validateFields }, onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) onSubmit(values);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(<Password prefix={<Icon type="lock" />} placeholder="Password" />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

FormLogin.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
};

const WrappedLoginForm = Form.create({ name: 'normal_login' })(FormLogin);
export default WrappedLoginForm;
