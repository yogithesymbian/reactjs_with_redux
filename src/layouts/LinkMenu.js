import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { HomeFilled, FileFilled, MonitorOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;

const Linkmenu = withRouter(props => {
  const { location } = props;
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      // defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
    >
      <Menu.Item key="/dashboard" icon={<HomeFilled />}>
        <Link to="dashboard">Dashboard </Link>
      </Menu.Item>

      <SubMenu
        key="sub1"
        title={
          <span>
            <span>Barang</span>
          </span>
        }
        icon={<FileFilled />}
      >
        <Menu.Item key="/barang-monitor" icon={<MonitorOutlined />}>
          <Link to="barang-monitor">Monitoring</Link>
        </Menu.Item>
      </SubMenu>
      {/* <Menu.Item key="/malang-free-coffee" icon={<CoffeeOutlined />}>
        <Link to="malang-free-coffee">Free Coffee </Link>
      </Menu.Item> */}
    </Menu>
  );
});

export default Linkmenu;
