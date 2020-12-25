import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import { Menu, Dropdown } from "antd";

import {
  DownCircleOutlined,
  LogoutOutlined,
  AccountBookFilled
} from "@ant-design/icons";

// const { SubMenu } = Menu;

const HeaderMenu = withRouter(props => {
  const state = useSelector(state => state);

  useEffect(() => {
    // console.log("length " + state.auth.length);
  }, [state]);

  // logout the user
  const handleLogout = () => {
    window.location.reload();
    // return <Redirect to="/login" />;
  };

  const menu = (
    <Menu>
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
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <AccountBookFilled /> <span>Hello , </span>
        {/* {state.auth[0].user.name} */}
        <DownCircleOutlined />
      </a>
    </Dropdown>
  );
});

export default HeaderMenu;
