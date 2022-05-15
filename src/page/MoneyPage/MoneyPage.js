import React from 'react';
import './MoneyPage.css'
import Head from '../StockadminPage/Head.js';
import { Card,Col,Row } from 'antd';
import ProTable from '@ant-design/pro-table';
const valueEnum = ['正常','冻结','正常'];
const tableListDataSource = [];
const stockname = ['32434','4344','4324'];
const moneyname=['1121','1222','1334'];
const money=['3333','15456','4324'];
for (let i = 0; i < 3; i += 1) {
    tableListDataSource.push({
        key: i,
        stockname: stockname[i],
        moneyname:moneyname[i],
        moneynumber: money[i],
        status: valueEnum[i],
        memo: '正常账号',
    });
}
const columns = [
    {
        title: '证券账号',
        width: 300,
        dataIndex: 'stockname',
        copyable: true,
    },
    {
        title: '资金账号',
        width: 80,
        dataIndex: 'moneyname',
        copyable: true,
    },
    {
        title: '资金数量',
        dataIndex: 'moneynumber',
        sorter: (a, b) => a.moneynumber - b.moneynumber,
    },
    {
        title: '状态',
        width: 80,
        dataIndex: 'status',
        initialValue: 'all',
    },
    {
        title: '备注',
        dataIndex: 'memo',
        ellipsis: true,
        copyable: true,
    },
    {
        title: '操作',
        width: 180,
        key: 'option',
        valueType: 'option',
        render: () => [
            <a key="link">详情</a>,
        ],
    },
];
function MoneyPage()
{
    return (
        <div>
            <Head keyValue="3"/>
<ProTable columns={columns} request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log(params, sorter, filter);
            return Promise.resolve({
                data: tableListDataSource,
                success: true,
            });
        }} rowKey="key" pagination={{
            showQuickJumper: true,
        }} search={{
            optionRender: false,
            collapsed: false,
        }} dateFormatter="string" headerTitle="资金账户详情" toolBarRender={() => [
            
        ]}/>
  <div className="MoneyPage-site-card-wrapper">
    <Row gutter={16}>
      <Col span={8}>
        <Card title="开设资金账户" bordered={true}hoverable={true}>
          开设一个与证券账户绑定的资金账户
        </Card>
      </Col>
      <Col span={8}>
        <Card title="添加/取出资金" bordered={true}hoverable={true}>
          对选择的资金账户进行取出或资金操作
        </Card>
      </Col>
      <Col span={8}>
        <Card title="修改密码" bordered={true}hoverable={true}>
          对选择的资金账户的密码更改
        </Card>
      </Col>
    </Row>

    <Row gutter={16}>
    <Col span={8}>
        <Card title="挂失资金账户" bordered={true}hoverable={true}>
          将状态为正常的资金账户更改为冻结
        </Card>
      </Col>
      <Col span={8}>
        <Card title="补办资金账户" bordered={true}hoverable={true}>
        对资金账户注销的证券账户重新补办
        </Card>
      </Col>
      <Col span={8}>
        <Card title="销户资金账户" bordered={true}hoverable={true}>
          消除选择的资金账户
        </Card>
      </Col>
    </Row>
  </div>
);
        </div>
        );

};
export default MoneyPage;