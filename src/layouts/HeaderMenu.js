import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Menu, Dropdown, message } from "antd";

import {
  DownCircleOutlined,
  LogoutOutlined,
  AccountBookFilled
} from "@ant-design/icons";

const { SubMenu } = Menu;

const HeaderMenu = withRouter(props => {
  // const { location } = props;
  // const { datauser } = props;

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [user, setUser] = useState();

  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  // logout the user
  const handleLogout = () => {
    // setUser({});
    // setEmail("");
    // setPassword("");
    // localStorage.clear();
    // window.location.reload();
    // return <Redirect to="/login" />;
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1" onClick={handleLogout}>
        <LogoutOutlined
          style={{ display: "inline-block", verticalAlign: "middle" }}
        />
        <span>Logout</span>
      </Menu.Item>
      {/* <Menu.Item key="2">2nd memu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item> */}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <AccountBookFilled /> <span>Hello , {datauser.name}</span>
        <DownCircleOutlined />
      </a> */}
    </Dropdown>
  );
});

export default HeaderMenu;
