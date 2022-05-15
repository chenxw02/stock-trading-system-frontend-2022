import React from 'react';
import './StockPage.css'
import Head from '../StockadminPage/Head.js';
import { Card,Col,Row } from 'antd';
import ProTable from '@ant-design/pro-table';
const tableListDataSource = [];
const state=['正常','冻结','正常'];
const stockname = ['32434','4344','4324'];
const id=['31233','21313','54355'];
const name=['ddc','fdf','fde'];
const shares=['3332','3213','5436'];
const ifagency=['yes','no','yes'];
for (let i = 0; i < 3; i += 1) {
  tableListDataSource.push({
      key: i,
      stockname: stockname[i],
      id:id[i],
      name: name[i],
      state: state[i],
      shares:shares[i],
      ifagency:ifagency[i],
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
      title: '身份账号',
      width: 80,
      dataIndex: 'id',
  },
  {
      title: '用户',
      width: 80,
      dataIndex: 'name',
      align: 'right',
  },
  {
      title: '状态',
      width: 80,
      dataIndex: 'state',
  },
  {
      title: '股票',
      dataIndex: 'shares',
      ellipsis: true,
      copyable: true,
  },
  {
    title: '是否代办',
    dataIndex: 'ifagency',
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
function StockPage() {
    return(

        <div>
          <Head keyValue="2"/>
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
        }} dateFormatter="string" headerTitle="证券账户详情" toolBarRender={() => [
            
        ]}/>
  <div className="StockPage-site-card-wrapper">
    <Row gutter={16}>
      <Col span={10}>
        <Card title="开设个人账户" bordered={true}hoverable={true}>
        自然人开立的证券帐户为个人帐户。
        </Card>
      </Col>
      <Col span={10}>
        <Card title="开设法人账户" bordered={true}hoverable={true}>
        法人开立股票帐户称为法人帐户
        </Card>
      </Col>
    </Row>
    <Row gutter={16}>
    <Col span={10}>
        <Card title="挂失、补办证券账户" bordered={true}hoverable={true}>
        若之前证券账户状态为冻结则更改为正常，若状态正常则变为冻结
        </Card>
      </Col>
      <Col span={10}>
        <Card title="销户证券账户" bordered={true}hoverable={true}>
       销户选中的证券账户
        </Card>
      </Col>
    </Row>
  </div>
);
        </div>
    )
}


export default StockPage;