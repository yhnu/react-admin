import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from "antd";
import { Table, Divider, Tag } from "antd";
import { getAllCase } from "../../axios";

// https://3x.ant.design/components/table/

const columns = [
  {
    title: "游戏ID",
    dataIndex: "GameID",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "UUID",
    dataIndex: "UUID",
    key: "UUID",
  },
  {
    title: "DataURL",
    dataIndex: "DataUrl",
    key: "DataUrl",
    render: (DataUrl) => {
      return <a href={DataUrl}>{DataUrl}</a>;
    },
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    render: (Status) => {
      let complete = Status == 1 ? "完成" : "错误";
      return <span>{complete}</span>;
    },
  },
];

export class CaseList extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    getAllCase().then((r) => {
      this.setState({ data: r.data });
    });
  }
  render() {
    return (
      <div className="gutter-example">
        <Row gutter={16}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="案例列表" bordered={false}>
                <Table columns={columns} dataSource={this.state.data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default CaseList;

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(CaseList)
