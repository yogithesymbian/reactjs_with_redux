// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Router } from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";

import "./index.css";
import { Button, Form, Input, Typography, Spin } from "antd";
import {} from "shards-react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import "../../utils/dist/EndPoint.dev";
import "../../utils/Axios";
import { addAuthAction } from "../../redux/AuthAction";
import { msgError, msgSuccess } from "../../utils/Helper";

const Login = props => {
  const [state, setState] = useState({
    currentView: "logIn",
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
    // console.log("length" + stateRedux.auth.length);
  }, [stateRedux]);

  if (stateRedux.auth.length != 0) {
    return <Redirect to="/barang-monitor" />;
  }

  const currentView = () => {
    const handleSubmit = async values => {
      viewLoading();
      console.log("submit login");
      axios
        .post(global.config.authLogin, values)
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

          dispatch(addAuthAction(sendData));
          // dispatch({ type: "ADD", payload: sendData });
          console.log(stateRedux.auth);
          hideLoading();
          msgSuccess("Berhasil Login");
        })
        .catch(e => {
          hideLoading();
          msgError("Error Login ", e);
          console.log(e);
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
              {/* <Button
                type="primary"
                htmltype="submit"
                className="login-form-button"
                block
              >
                Log in
              </Button> */}
              <Button type="primary" htmlType="submit" block>
                Log in
                {""}
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
