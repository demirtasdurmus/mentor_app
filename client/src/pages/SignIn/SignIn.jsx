import React from 'react';
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import Cookies from 'js-cookie';
import styles from './SignIn.module.css';
import axios from 'axios';


export default function SignIn() {
  const navigate = useNavigate();
  const onFinish = ({ email, password, remember }) => {
    console.log('Success:', email, password, remember);
    axios.post("/api/v1/auth/login", {
      email,
      password,
      remember
    })
      .then((res) => {
        console.log(res.data);
        Cookies.set('__session',
          window.btoa(res.data.token),
          {
            expires: 1,
            secure: true,
            sameSite: 'strict'
          });
        navigate('/skills');
      })
      .catch((err) => Notification('error', err.response.data.message))
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <div className={styles.illustrationWrapper}>
          <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
        </div>
        <Form
          name={styles.loginForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className={styles.formTitle}>Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              placeholder="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginFormButton}>
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
