import React from "react";
import axios from "axios";
import "antd/dist/antd.css";

import "./index.css";
import { Spin, Form, Input, Typography } from "antd";
import { Button } from "shards-react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { msgSuccess, msgError } from "../../utils/Helper";
import Paragraph from "antd/lib/typography/Paragraph";

import "../../utils/EndPoint";
import "../../utils/Axios";
import { Redirect, Router } from "react-router-dom";

import { connect } from "react-redux";
import { addAuthAction } from "../../redux/AuthAction";
import store from "../../redux/Store";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "logIn",
      email: "",
      password: "",
      remember_token: "",
      loading: false,
      user: [],
      register: []
    };
  }

  viewLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  changeView = view => {
    this.setState({
      currentView: view
    });
  };

  currentView = () => {
    const { Title } = Typography;
    // login the user
    const handleSubmit = async values => {
      this.viewLoading();
      // send the username and password to the server
      axios
        .post(global.config.authLogin, values)
        .then(response => {
          this.setState({
            user: response.data.data
          });
          this.props.user(response.data.data); // store to redux
          this.hideLoading();
          msgSuccess("Berhasil Login");
        })
        .catch(e => {
          const { response } = e;
          const { request, ...errorObject } = response;

          this.hideLoading();
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

    switch (this.state.currentView) {
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

  render() {
    // let { user } = this.state;

    // if (user.length !== 0) {
    //   console.log("after login", user);
    // if there's a user show the message below
    // return <Redirect to="/barang-monitor" />;
    // }

    // Redirect to login if no user
    const user = store.getState().auth;

    if (user.length !== 0) {
      console.log("after login", user);
      // return <Redirect to="/barang-monitor" />;
    }
    return (
      <Spin spinning={this.state.loading}>
        <section id="entry-page">{this.currentView()}</section>
      </Spin>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    user: res => {
      dispatch(addAuthAction(res));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;
