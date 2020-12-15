import React from "react";
import { Container } from "shards-react";
import { Row, Col } from "antd";

const AuthLayout = ({ children, noNavbar, noFooter }) => (
  <Row>
    <Col span={24}>{children}</Col>
  </Row>
);

export default AuthLayout;
