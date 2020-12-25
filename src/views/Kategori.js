import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Button,
  Col,
  PageHeader,
  Row,
  Typography,
  message,
  Image,
  Upload,
  Space
} from "antd";
import { Card } from "shards-react";
import {
  SearchOutlined,
  DeleteOutlined,
  SaveOutlined,
  EditOutlined
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "../utils/Axios";
import "../utils/EndPoint";
import { msgSuccess, msgError } from "../utils/Helper";
import Modal from "antd/lib/modal/Modal";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// pageHeader
const { Paragraph } = Typography;
const content = (
  <>
    <Paragraph>
      TIP : Tekan shift kemudian scroll pada mouse untuk mengeser tabel secara
      horizontal
    </Paragraph>
  </>
);

const Content = ({ children, extraContent }) => {
  return (
    <>
      <Row>
        <div key={0} style={{ flex: 1 }}>
          {children}
        </div>
        <div key={1} className="image">
          {extraContent}
        </div>
      </Row>
    </>
  );
};
// end of pageheader

const Kategori = () => {
  const [state, setState] = useState({
    categoryData: []
    // sRT: ""
  });

  // search
  const [sRT, Srt] = useState("");
  // const [searchInput, SearchInput] = useState("");

  // table
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  // image
  const [fileList, setFileList] = useState([]);
  const [previewImage, spreviewImage] = useState("");
  const [previewVisible, spreviewVisible] = useState(Boolean);
  const [previewTitle, spreviewTitle] = useState("");

  // search tables
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }} key={3}>
        <Input
          ref={node => {
            // SearchInput(node);
          }}
          placeholder={`Cari ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Cari
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
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
      // if (visible) {
      //   setTimeout(() => searchInput.select(), 100);
      // }
    },
    render: text =>
      text ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[sRT]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : null
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    Srt(selectedKeys[0]);
    // setState({
    //   sRT : selectedKeys[0]
    // })
    // searchedColumn: dataIndex;
  };

  const handleReset = clearFilters => {
    clearFilters();
    Srt("");
    // setState({
    //   sRT : ""
    // })
  };
  // end of search tables

  // handle get categoryData
  const getCategory = () => {
    axios
      .get(global.config.shCategory) // home
      .then(response => {
        setState({
          categoryData: response.data.data.show_kategori
        });
      })
      .catch(e => {
        console.log("error", e);
      });
  };
  // end of handle get categoryData

  // table columns
  const columns = [
    {
      key: "1",
      title: "Nama Kategori",
      width: "4%",
      editable: true,
      dataIndex: "name_kategori",
      textWrap: "ellipsis" | "word-break",
      ...getColumnSearchProps("name_kategori")
    },
    {
      key: "2",
      title: "URL Gambar",
      dataIndex: "img",
      width: "8%",
      editable: true,
      render: (text, record) => (
        <>
          <Image
            width={100}
            src={record.img || undefined}
            alt={record.img || undefined}
            fallback="data:image/png;base64,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"
          />
        </>
      )
    },
    {
      key: "3",
      title: "Icon",
      dataIndex: "icon",
      width: "8%",
      editable: true,
      ...getColumnSearchProps("icon")
    },
    {
      key: "4",
      title: "Operasi",
      dataIndex: "operation",
      width: 40,
      fixed: "right",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button
              // href="javascript:;"
              type="primary"
              onClick={() => save(record.id)}
              style={{
                marginBottom: 8
              }}
              icon={<SaveOutlined />}
              block
            >
              Save
            </Button>
            <Popconfirm title="Yakin ingin membatalkan?" onConfirm={cancel}>
              <Button type="dashed" icon={<DeleteOutlined />} block>
                Cancel
              </Button>
            </Popconfirm>
          </>
        ) : (
          <>
            <Button
              type="default"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              icon={<EditOutlined />}
              style={{
                marginBottom: 8
              }}
              block
            >
              Edit
            </Button>
          </>
        );
      }
    }
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        // key: "id",
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      dataIndex === "img" ? (
        <>
          <Upload
            {...props}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </>
      ) : (
        <Input />
      );
    return (
      <>
        <td {...restProps} editable="true">
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0
              }}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      </>
    );
  };

  // table action
  const isEditing = record => record.id === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name_kategori: "",
      img: "",
      icon: "",
      ...record
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...state.categoryData];
      const index = newData.findIndex(item => key === item.id);

      if (index > -1) {
        const item = newData[index];
        if (fileList.length !== 0) {
          row.img = fileList[0].response.url_img;
        }
        newData.splice(index, 1, { ...item, ...row });

        axios
          .post(global.config.actCategory, { ...item, ...row })
          .then(res => {
            newData.splice(index, 1, { ...item, ...row });
            setState({
              categoryData: newData
            });

            setEditingKey("");
            setFileList([]);
            msgSuccess("Berhasil ubah data");
          })
          .catch(e => {
            msgError("Tidak berhasil ubah data");
            setFileList([]);
            console.log(e);
          });
      } else {
        newData.push(row);
        setState({
          categoryData: newData
        });
        console.log("else", newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // image action
  const onPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    spreviewImage(file.url || file.preview);
    spreviewVisible(true);
    spreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => spreviewVisible(false);

  const onChange = ({ fileList: newFileList }) => {
    console.log("onChange");
    setFileList(newFileList);
    if (newFileList.length >= 1) {
      if (newFileList[0].status === "done") {
        message.success(`${newFileList[0].name} file uploaded successfully`);
      }
    }
  };

  // image uploading
  const props = {
    name: "image",
    action: global.config.actSliderImg,
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068"
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`
    }
  };
  // end of image uploading

  // const mounted = useRef(false);
  useEffect(() => {
    console.log("length", fileList);
    getCategory();
    return () => {
      setState({
        ...state
      });
    };
  }, [fileList]);

  // end of table
  return (
    <Row>
      <Col>
        <PageHeader
          title="Kategori [~Category]"
          className="site-page-header"
          //   subTitle="Jumlah yang "
          //   tags={<Tag color="blue">dibimbing</Tag>}
          avatar={{
            src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
          }}
        >
          <Content>{content}</Content>
        </PageHeader>
        <Card key={0}>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          <Form form={form} component={false} key={0}>
            <Table
              rowKey="id"
              key={4}
              components={{
                key: 5,
                body: {
                  cell: EditableCell,
                  key: 6
                }
              }}
              bordered
              dataSource={state.categoryData}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                pageSizeOptions: ["5", "10", "15", "20", "25", "30", "1000"],
                showSizeChanger: true,
                defaultPageSize: 5
              }}
              scroll={{ x: 1500 }}
            />
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Kategori;
