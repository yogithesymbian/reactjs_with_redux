// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Router } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";

import "./index.css";
import { Form, Button, Input, Typography, Spin } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import "../../utils/dist/EndPoint.dev";
import "../../utils/Axios";
import { msgError, msgSuccess } from "../../utils/Helper";

const Login = props => {
  const [state, setState] = useState({
    currentView: "logIn",
    email: "moderator@gmail.com",
    password: "secret",
    remember_token: "",
    loading: false,
    user: [],
    register: [],
    isLogin: false
  });

  const changeView = view => {
    setState({
      currentView: view
    });
  };
  const viewLoading = () => {
    setState({
      loading: true
    });
  };
  const hideLoading = () => {
    setState({
      loading: false
    });
  };
  const stateRedux = useSelector(state => state);
  const dispatch = useDispatch();
  const { Title } = Typography;

  useEffect(() => {
    console.log("length" + stateRedux.auth.length);
  }, [stateRedux]);

  if (stateRedux.auth.length != 0) {
    return <Redirect to="/barang-monitor" />;
  }

  const currentView = () => {
    const handleSubmit = async values => {
      viewLoading();
      console.log("submit login");
      axios
        .post(global.config.authLogin, {
          email: state.email,
          password: state.password
        })
        .then(response => {
          const data = response.data.data;

          const sendData = {
            ...data,
            isLogin: true
          };

          setState({
            ...state,
            user: data.user,
            isLogin: true
          });

          dispatch({ type: "ADD", payload: sendData });

          console.log(stateRedux.auth);
          this.hideLoading();
          msgSuccess("Berhasil Login");
        })
        .catch(e => {
          const { response } = e;
          const { request, ...errorObject } = response;

          hideLoading();
          console.log("error", response);
          console.log("errorObject", errorObject);

          if (response.data.isActive === "FALSE") {
            msgError("Error Login user is not active", e);
          } else {
            msgError("Error Login ", e);
          }
        });
    };

    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };

    switch (state.currentView) {
      case "logIn":
        return (
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Title level={3}>Login</Title>
            <Paragraph>Selamat Datang di Mebel Apps</Paragraph>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!"
                }
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]}
            >
              <Input.Password
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
      default:
        break;
    }
  };

  return (
    <Spin spinning={state.loading}>
      <section id="entry-page">{currentView()}</section>
    </Spin>
  );
};

export default Login;
