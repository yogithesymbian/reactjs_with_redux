// eslint-disable-next-line no-use-before-define
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect, Router } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";

import "./index.css";
import {Form, Button, Input, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import "../../utils/EndPoint";
import "../../utils/Axios";


const Login = props => {
    const [state, setState] = useState({
        currentView: "logIn",
        email: "moderator@gmail.com",
        password: "secret",
        remember_token: "",
        loading: false,
        user: [],
        register: [],
        isLogin: false,
    });
    const stateRedux     = useSelector(state => state);
    const dispatch  = useDispatch();
    const { Title } = Typography;


    useEffect(() => {
      console.log('length'+ stateRedux.auth.length);
    }, [stateRedux]);

    const handleSubmit = async values => {
      console.log('submit login');
        axios
          .post(global.config.authLogin, {email: state.email, password: state.password})
          .then(response => {
            const data = response.data.data;

            const sendData = {
              ...data, 
              isLogin: true,
            }

            setState({
                ...state,
                user: data.user,
                isLogin: true,
            });
            
            dispatch({type: 'ADD', payload: sendData});

            console.log(stateRedux.auth);
          })
          .catch(e => {
              console.log(e);
          });
      };
      const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
      };
      
      if(stateRedux.auth.length != 0) {
        return <Redirect to="/barang" />;
      }

    return (
        <Form
          name="normal_login"
          className="login-form"
          initialValue={{
            remember: true
          }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Title level={3}>Login</Title>
          <Paragraph>Selamat Datang di Mebel Apps</Paragraph>
          <Form.Item
            name="email"
          >
            <Input
                defaultValue={state.email}
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
          >
            <Input.Password
                defaultValue={state.password}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmltype="submit"
              className="login-form-button"
              block
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      );
}

export default Login;