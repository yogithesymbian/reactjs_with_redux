import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormTextarea,
  FormGroup
} from "shards-react";

import { Form, Input, Select, Button, List, Tag } from "antd";
import { DatabaseFilled } from "@ant-design/icons";
import { msgLoading, msgSuccess } from "../../utils/Helper";
import axios from "../../utils/Axios";
import { Redirect } from "react-router-dom";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    offset: -8,
    span: -16
  }
};

const data = ["Kosongkan new password, jika tidak ingin mengubah password"];

const onFinish = values => {
  /**
   * 0 update password - stateUpdate
   * 1 no update password - stateUpdate
   */
  if (values.password === "") {
    values.state_update = "1";
    msgLoading("sedang update data tanpa new password");
    console.log("object : ", values);
    axios
      .post(global.config.authUpdateUser, values)
      .then(response => {
        console.log(response.data);
        msgSuccess("Update Berhasil, anda akan dialihkan ke halaman login");
        setTimeout(() => {
          localStorage.clear();
          window.location.reload();
          return <Redirect to="/login" />;
        }, 3000);
      })
      .catch(e => {
        console.log("error", e);
      });
  } else {
    values.state_update = "0";
    msgLoading("sedang update data dengan new password");
    console.log("object : ", values);
    axios
      .post(global.config.authUpdateUser, values)
      .then(response => {
        msgSuccess("Update Berhasil, anda akan dialihkan ke halaman login");
        console.log(response.data);
        setTimeout(() => {
          localStorage.clear();
          window.location.reload();
          return <Redirect to="/login" />;
        }, 3000);
      })
      .catch(e => {
        console.log("error", e);
      });
  }
};

const onFinishFailed = errorInfo => {
  console.log("Failed:", errorInfo);
};
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70
      }}
    >
      <Option value="62">+62</Option>
    </Select>
  </Form.Item>
);

const UserAccountDetails = ({ user }) => (
  <ListGroup flush>
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">Form Update Profile</h6>
      </CardHeader>

      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                id: user.id,
                npm_nip: user.npm_nip,
                name: user.name,
                location: user.location,
                username: user.username,
                phone: user.phone,
                email: user.email,
                password: "",
                state_update: "1",
                role_users_id: user.role_users_id
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <FormGroup></FormGroup>
              <Form.Item {...tailLayout} hidden label="id" name="id">
                <Input hidden />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                label={user.role_users_id === 1 ? "NIDN/NIDK" : "NPM"}
                name="npm_nip"
                rules={[
                  {
                    required: true,
                    message: "Please input your data"
                  }
                ]}
              >
                <Input placeholder="NPM atau NIDN atau NIDK" />
              </Form.Item>

              <FormGroup>
                <Row form>
                  <Col className="form-group">
                    <Form.Item
                      label="Fullname"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Nama Lengkap"
                        }
                      ]}
                    >
                      <Input placeholder="Muhammad Yogi Arif Widodo" />
                    </Form.Item>
                  </Col>
                  <Col className="form-group">
                    <Form.Item label="Alamat" name="location">
                      <Input placeholder="JL. Gerbang Dayaku No 1" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row form>
                  <Col className="form-group">
                    <Form.Item
                      label="Username "
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col className="form-group">
                    <Form.Item
                      name="phone"
                      label="Nomor HP"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!"
                        }
                      ]}
                    >
                      <Input
                        addonBefore={prefixSelector}
                        style={{
                          width: "100%"
                        }}
                        placeholder="81588888888"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row form>
                  <Col className="form-group">
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email"
                        }
                      ]}
                    >
                      <Input placeholder="arifwidodo@gmail.com" />
                    </Form.Item>
                  </Col>
                  <Col className="form-group">
                    <Form.Item label="New Password" name="password">
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>
                <Row form>
                  {/* Description */}
                  <Col className="form-group">
                    <List
                      {...tailLayout}
                      htmlFor="state_setuju"
                      size="small"
                      header={<Tag color="red">Catatan</Tag>}
                      bordered
                      dataSource={data}
                      renderItem={item => <List.Item>{item}</List.Item>}
                    />
                  </Col>
                </Row>
                <Button type="primary" block htmlType="submit">
                  <DatabaseFilled /> Update Akun
                </Button>
              </FormGroup>
              <Form.Item
                {...tailLayout}
                hidden
                label="state_update"
                name="state_update"
              >
                <Input hidden />
              </Form.Item>
              <Form.Item
                {...tailLayout}
                hidden
                label="role_users_id"
                name="role_users_id"
              >
                <Input hidden />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </Card>
  </ListGroup>
);

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  user: PropTypes.object
};

// UserAccountDetails.defaultProps = {
//   title: "Detail Akun"
// };

export default UserAccountDetails;
