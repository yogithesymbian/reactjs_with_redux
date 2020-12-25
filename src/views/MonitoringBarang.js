import React from "react";
import { Container, Card, CardBody } from "shards-react";

import {
  Table,
  Row,
  Input,
  Col,
  Typography,
  PageHeader,
  Tag,
  Spin,
  Tabs,
  Button,
  Space
} from "antd";

import Highlighter from "react-highlight-words";
import { SearchOutlined, AppleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../utils/EndPoint";
import axios from "../utils/Axios";
import "./auth/Login";
import PropTypes from "prop-types";
import { TweenOneGroup } from "rc-tween-one";
import store from "../redux/Store";

const TableContext = React.createContext(false);

class MonitorBarang extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: "table-enter-leave-demo"
  };

  constructor(props) {
    super(props);
    this.enterAnim = [
      {
        opacity: 0,
        x: 30,
        backgroundColor: "#fffeee",
        duration: 0
      },
      {
        height: 0,
        duration: 200,
        type: "from",
        delay: 250,
        ease: "easeOutQuad",
        onComplete: this.onEnd
      },
      {
        opacity: 1,
        x: 0,
        duration: 250,
        ease: "easeOutQuad"
      },
      { delay: 1000, backgroundColor: "#fff" }
    ];
    this.pageEnterAnim = [
      {
        opacity: 0,
        duration: 0
      },
      {
        height: 0,
        duration: 150,
        type: "from",
        delay: 150,
        ease: "easeOutQuad",
        onComplete: this.onEnd
      },
      {
        opacity: 1,
        duration: 150,
        ease: "easeOutQuad"
      }
    ];
    this.leaveAnim = [
      { duration: 250, opacity: 0 },
      { height: 0, duration: 200, ease: "easeOutQuad" }
    ];
    this.pageLeaveAnim = [
      { duration: 150, opacity: 0 },
      { height: 0, duration: 150, ease: "easeOutQuad" }
    ];
    // 动画标签，页面切换时改用 context 传递参数；
    this.animTag = $props => {
      return (
        <TableContext.Consumer>
          {isPageTween => {
            return (
              <TweenOneGroup
                component="tbody"
                enter={!isPageTween ? this.enterAnim : this.pageEnterAnim}
                leave={!isPageTween ? this.leaveAnim : this.pageLeaveAnim}
                appear={false}
                exclusive
                {...$props}
              />
            );
          }}
        </TableContext.Consumer>
      );
    };

    this.state = {
      isPageTween: false,
      // localStorage
      user: [],
      loading: false,

      // for search inline table
      nameSearch: "",
      sRT: "",

      // for read
      dtMonitorBarang: []
    };
  }
  // animation

  onEnd = e => {
    const dom = e.target;
    dom.style.height = "auto";
  };

  onAdd = () => {
    const { data } = this.state;
    const i = Math.round(Math.random() * (this.data.length - 1));
    data.unshift({
      key: Date.now(),
      name: this.data[i].name,
      age: this.data[i].age,
      address: this.data[i].address
    });
    this.setState({
      data,
      isPageTween: false
    });
  };

  onDelete = (key, e) => {
    e.preventDefault();
    const data = this.state.dtMonitorBarang.filter(item => item.key !== key);
    this.setState({ data, isPageTween: false });
  };

  pageChange = () => {
    this.setState({
      isPageTween: true
    });
  };
  // end of animation

  // intervalID;

  // search
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Cari ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Cari
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : false,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      text ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.sRT]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : null
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      sRT: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ sRT: "" });
  };
  // end of search table
  componentWillMount() {
    clearTimeout(this.intervalID);
  }
  // componentWillUnmount() {
  //   // fix Warning: Can't perform a React state update on an unmounted component
  //   this.setState = (state, callback) => {
  //     return;
  //   };
  // }
  // _isMounted = false;
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  componentDidMount() {
    // setTimeout(() => {
    this.initBarangLoad();
    // }, 1000);
  }

  initBarangLoad() {
    this.viewLoading();
    this.getDataMonitorBarang();
  }

  viewLoading() {
    this.setState({ loading: true });
  }

  hideLoading() {
    this.setState({ loading: false });
  }

  async getDataMonitorBarang() {
    // this._isMounted = true;

    await axios
      .get(global.config.shMonitorBarang)
      .then(response => {
        // if (this._isMounted) {
        this.setState({
          dtMonitorBarang: response.data.data.monitor
        });
        this.hideLoading();
        // }

        // this.intervalID = setTimeout(
        //   this.getDataMonitorBarang.bind(this),
        //   3000
        // );
      })
      .catch(e => {
        this.setState({
          dtMonitorBarang: []
        });
        this.hideLoading();
        // this.intervalID = setTimeout(
        //   this.getDataMonitorBarang.bind(this),
        //   3000
        // );
      });
  }
  // end of show skripsi

  render() {
    // pageHeader
    const { Paragraph } = Typography;
    const { TabPane } = Tabs;

    const content = (
      <>
        <Paragraph>Barang yang baru Masuk (BELI) dan Keluar (JUAL)</Paragraph>
      </>
    );

    const Content = ({ children, extraContent }) => {
      return (
        <Row>
          <div style={{ flex: 1 }}>{children}</div>
          <div className="image">{extraContent}</div>
        </Row>
      );
    };

    /**
     * for users data from request axios
     */

    const colDtMonitorBarang = [
      // {
      //   title: "No",
      //   width: 40,
      // fixed: "left",
      //   key: "1",
      //   render: (value, item, index) => index + 1
      // },
      {
        title: "KODE BARANG",
        width: 150,
        dataIndex: "KODE_BRG",
        fixed: "left",
        key: "2",
        ...this.getColumnSearchProps("KODE_BRG")
      },
      {
        title: "NAMA BARANG",
        width: 200,
        dataIndex: "NAMA_BARANG",
        fixed: "left",
        key: "3",
        ...this.getColumnSearchProps("NAMA_BARANG")
      },
      {
        title: "STOCK AWAL",
        width: 90,
        key: "2",
        align: "center",
        ...this.getColumnSearchProps("STOCK_AWAL"),
        render: (_, record) => (
          <>
            {Number(record.STOCK_AWAL) <= 10 ? (
              <Tag color="#ff4d4f">{record.STOCK_AWAL}</Tag>
            ) : Number(record.STOCK_AWAL) <= 15 ? (
              <Tag color="#2db7f5">{record.STOCK_AWAL}</Tag>
            ) : Number(record.STOCK_AWAL) <= 20 ? (
              <Tag color="#108ee9">{record.STOCK_AWAL}</Tag>
            ) : (
              <Tag color="#87d068">{record.STOCK_AWAL}</Tag>
            )}
          </>
        )
      },
      {
        title: "MASUK",
        width: 90,
        key: "4",
        align: "center",
        ...this.getColumnSearchProps("MASUK"),
        render: (_, record) => {
          return <Paragraph>{record.MASUK}</Paragraph>;
        }
      },

      {
        title: "JUAL",
        width: 100,
        key: "5",
        dataIndex: "JUAL",
        align: "center",
        ...this.getColumnSearchProps("JUAL")
      },
      {
        title: "Total",
        width: 100,
        key: "8",
        align: "center",
        dataIndex: "TOTAL",
        ...this.getColumnSearchProps("TOTAL")
      },
      {
        title: "TANGGAL",
        children: [
          {
            title: "Barang Masuk",
            children: [
              {
                title: "Diubah",
                align: "center",
                dataIndex: "MASUK_created_at",
                ...this.getColumnSearchProps("MASUK_created_at")
              },
              {
                title: "Dibuat",
                align: "center",
                dataIndex: "MASUK_updated_at",
                ...this.getColumnSearchProps("MASUK_updated_at")
              }
            ]
          },
          {
            title: "Barang Keluar",
            children: [
              {
                title: "Diubah",
                align: "center",
                dataIndex: "JUAL_created_at",
                ...this.getColumnSearchProps("JUAL_created_at")
              },
              {
                title: "Dibuat",
                align: "center",
                dataIndex: "JUAL_updated_at",
                ...this.getColumnSearchProps("JUAL_updated_at")
              }
            ]
          },
          {
            title: "Daftar Barang",
            children: [
              {
                title: "Diubah",
                align: "center",
                dataIndex: "updated_at",
                ...this.getColumnSearchProps("updated_at")
              },
              {
                title: "Dibuat",
                align: "center",
                dataIndex: "created_at",
                ...this.getColumnSearchProps("created_at")
              }
            ]
          }
        ]
      }
    ];

    // state modal | open - close
    let { dtMonitorBarang } = this.state;
    let JUMLAH_MONITORING = "0";
    if (dtMonitorBarang !== undefined) {
      if (dtMonitorBarang[0] !== undefined) {
        JUMLAH_MONITORING = "JUMLAH = " + dtMonitorBarang[0].JUMLAH;
      }
    }

    const user = store.getState().auth;

    if (user.length !== 0) {
      console.log("after login", user);
      // return <Redirect to="/barang-monitor" />;
    }

    return (
      <Container fluid className="main-content-container px-4">
        <Spin spinning={this.state.loading}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <AppleOutlined />
                  Monitoring Barang
                </span>
              }
              key="1"
            >
              {/* Default Light Table */}
              <Row>
                <Col>
                  <PageHeader
                    title="Monitoring "
                    className="site-page-header"
                    subTitle="Semua Barang"
                    tags={<Tag color="blue">Masuk dan Keluar</Tag>}
                    avatar={{
                      src:
                        "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
                    }}
                  >
                    <Content>{content}</Content>
                  </PageHeader>

                  <Card small className="mb-4">
                    <CardBody className="p-0 pb-3">
                      <Row>
                        <TableContext.Provider value={this.state.isPageTween}>
                          <Table
                            // className={`${this.props.className}-table`}
                            components={{ body: { wrapper: this.animTag } }}
                            onChange={this.pageChange}
                            pagination={{
                              pageSizeOptions: [
                                "5",
                                "10",
                                "15",
                                "20",
                                "25",
                                "30"
                              ],
                              showSizeChanger: true,
                              defaultPageSize: 5
                            }}
                            bordered
                            columns={colDtMonitorBarang}
                            dataSource={dtMonitorBarang}
                            scroll={{ x: 2200 }}
                            title={() => <></>}
                            footer={() => JUMLAH_MONITORING}
                          />
                        </TableContext.Provider>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Spin>
      </Container>
    );
  }
}

export default MonitorBarang;
