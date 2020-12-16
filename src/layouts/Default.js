import React from "react";

import { Layout, Menu, Spin, Typography } from "antd";

import { Store } from "../flux";
import Linkmenu from "./LinkMenu";
import HeaderMenu from "./HeaderMenu";

import "./index.css";
import IdleTimer from "react-idle-timer";
import { Redirect } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navItems: Store.getSidebarItems()
    };

    this.onChange = this.onChange.bind(this);

    this.idleTimer = null;
    this.handleOnAction = this.handleOnAction.bind(this);
    this.handleOnActive = this.handleOnActive.bind(this);
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }

  state = {
    collapsed: false,
    theme: "dark",
    current: "0",
    user: [],
    statusRendering: true
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  changeTheme = value => {
    this.setState({
      theme: value ? "dark" : "light"
    });
  };

  handleElement() {
    this.setState((state, props) => {
      return { statusRendering: !state.statusRendering };
    });
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  componentDidMount() {
    // const userGet = localStorage.getItem("user");
    // const user = JSON.parse(userGet);
    // if (user) {
    //   this.setState({
    //     user: user.data.user
    //   });
    this.handleElement();
    // } else window.location.reload();
  }
  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    // const { navItems: items } = this.state;
    // const { current } = this.state;
    const { Title } = Typography;

    return (
      <div>
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          timeout={1000 * 60 * 15}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
        {this.state.statusRendering === true ? (
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo">
                <Title level={2} style={{ color: "white" }}>
                  Mebel Apps
                </Title>
                {/* <Image
                  width={150}
                  height={40}
                  src="https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png"
                /> */}
              </div>
              <Linkmenu />
            </Sider>

            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }}>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  style={{ float: "right", marginRight: "32px" }}
                >
                  <HeaderMenu datauser={this.state.user} />
                </Menu>
              </Header>
              <Content style={{ margin: "0 16px" }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  {this.props.children}
                </div>
              </Content>

              <Footer style={{ textAlign: "center" }}>
                {" "}
                Mebel Apps ©2020 Scodeid - Yogi Arif Widodo
              </Footer>
            </Layout>
          </Layout>
        ) : (
          <Footer style={{ textAlign: "center" }}>
            <Spin spinning="true"></Spin>
          </Footer>
        )}
      </div>
    );
  }

  handleOnAction(event) {
    // console.log("user did something", event);
  }

  handleOnActive(event) {
    // console.log("user is active", event);
    // console.log("time remaining", this.idleTimer.getRemainingTime());
  }

  handleOnIdle(event) {
    // console.log("user is idle", event);
    // console.log("last active", this.idleTimer.getLastActiveTime());
    // localStorage.clear();
    // window.location.reload();
    // return <Redirect to="/login" />;
  }
}

export default DefaultLayout;
