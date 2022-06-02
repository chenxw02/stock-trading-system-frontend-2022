import React from 'react';
import './MoneyPage.css'
import Head from '../StockadminPage/Head.js';
import { Card,Col,Row,Modal,Input,Radio,DatePicker, Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import { useState } from 'react';
import { UserOutlined,PhoneOutlined,IdcardOutlined,HomeOutlined,KeyOutlined,MoneyCollectOutlined}from '@ant-design/icons';
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
  const [isDetailsVisible1, setIsDetailsVisible1] = useState(false);
  const showpage1	= () =>
  {
    setIsDetailsVisible1(true);
  }
  const handleOk = () => {
    setIsDetailsVisible1(false);
  };

  const handleCancel = () => {
    setIsDetailsVisible1(false);
  };
  const [isDetailsVisible2, setIsDetailsVisible2] = useState(false);
  const showpage2	= () =>
  {
    setIsDetailsVisible2(true);
  }
  const handleOk2 = () => {
    setIsDetailsVisible2(false);
  };

  const handleCancel2 = () => {
    setIsDetailsVisible2(false);
  };
  const [isDetailsVisible3, setIsDetailsVisible3] = useState(false);
  const showpage3	= () =>
  {
    setIsDetailsVisible3(true);
  }
  const handleOk3 = () => {
    setIsDetailsVisible3(false);
  };

  const handleCancel3 = () => {
    setIsDetailsVisible3(false);
  };
  const [isDetailsVisible4, setIsDetailsVisible4] = useState(false);
  const showpage4	= () =>
  {
    setIsDetailsVisible4(true);
  }
  const handleOk4 = () => {
    setIsDetailsVisible4(false);
  };

  const handleCancel4 = () => {
    setIsDetailsVisible4(false);
  };
  const [isDetailsVisible5, setIsDetailsVisible5] = useState(false);
  const showpage5	= () =>
  {
    setIsDetailsVisible5(true);
  }
  const handleOk5 = () => {
    setIsDetailsVisible5(false);
  };

  const handleCancel5 = () => {
    setIsDetailsVisible5(false);
  };
  const [isDetailsVisible6, setIsDetailsVisible6] = useState(false);
  const showpage6	= () =>
  {
    setIsDetailsVisible6(true);
  }
  const handleOk6 = () => {
    setIsDetailsVisible6(false);
  };

  const handleCancel6 = () => {
    setIsDetailsVisible6(false);
  };
  const [value_money,setValue_money] = useState(false);
  const onChange_money = (e) => {
    console.log( e.target.value);
    setValue_money(e.target.value);
  };
  const [value_password,setValue_password] = useState(false);
  const onChange_password = (e) => {
    console.log( e.target.value);
    setValue_password(e.target.value);
  };
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
        <Card title="开设/补办资金账户" bordered={true}hoverable={true}extra={<a onClick={showpage1}>More</a>}>
          开设一个与证券账户绑定的资金账户
        </Card>
      </Col>
      <Col span={8}>
        <Card title="添加/取出资金" bordered={true}hoverable={true}extra={<a onClick={showpage2}>More</a>}>
          对选择的资金账户进行取出或资金操作
        </Card>
      </Col>
      <Col span={8}>
        <Card title="修改密码" bordered={true}hoverable={true}extra={<a onClick={showpage3}>More</a>}>
          对选择的资金账户的密码更改
        </Card>
      </Col>
    </Row>

    <Row gutter={16}>
    <Col span={8}>
        <Card title="挂失资金账户" bordered={true}hoverable={true}extra={<a onClick={showpage4}>More</a>}>
          将状态为正常的资金账户更改为冻结
        </Card>
      </Col>
      <Col span={8}>
        <Card title="解冻资金账户" bordered={true}hoverable={true}extra={<a onClick={showpage5}>More</a>}>
        对资金账户注销的证券账户重新补办
        </Card>
      </Col>
      <Col span={8}>
        <Card title="销户资金账户" bordered={true}hoverable={true}extra={<a onClick={showpage6}>More</a>}>
          消除选择的资金账户
        </Card>
      </Col>
    </Row>
  </div>
  <Modal title="开设资金账户" width={800} visible={isDetailsVisible1} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="证券账户号码" prefix={<UserOutlined />} maxLength={18}/>
        <br/>
        <br/>
        <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}/>
        <br/>
        <br/>
        <Input placeholder="资金账户交易密码" prefix={<KeyOutlined />} maxLength={18}/>
        <br/>
        <br/>
        <Input placeholder="资金账户登录密码" prefix={<KeyOutlined />} maxLength={18}/>
        <br/>
        <br/>
        </Modal>
        <Modal title="添加/取出资金" width={800} visible={isDetailsVisible2} onOk={handleOk2} onCancel={handleCancel2}>
        <Radio.Group onChange={onChange_money} >
      <Radio value={0}>存款</Radio>
      <Radio value={1}>取款</Radio>
      </Radio.Group>
      <br/>
        <br/>
        <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}/>
        <br/>
        <br/>
        <Input placeholder="资金账户交易密码" prefix={<KeyOutlined />} maxLength={18}/>
        <br/>
        <br/>
        <Input placeholder="金额" prefix={<MoneyCollectOutlined />} />
        <br/>
        <br/>
        </Modal>
        <Modal title="修改密码" width={800} visible={isDetailsVisible3} onOk={handleOk3} onCancel={handleCancel3}>
        <Radio.Group onChange={onChange_password} >
      <Radio value={0}>资金账户交易密码</Radio>
      <Radio value={1}>资金账户登录密码</Radio>
      </Radio.Group>
      <br/>
        <br/>
        <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}/>
        <br/>
        <br/>
        <Input placeholder="旧密码" prefix={<KeyOutlined />} maxLength={6}/>
        <br/>
        <br/>
        <Input placeholder="新密码" prefix={<KeyOutlined />} maxLength={6}/>
        <br/>
        <br/>
        </Modal>
        <Modal title="挂失资金账户" width={800} visible={isDetailsVisible4} onOk={handleOk4} onCancel={handleCancel4}>
      <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined/>}maxLength={18} />
      <br/>
        <br/>
        <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}/>
        <br/>
        <br/>
        </Modal>
        <Modal title="解冻资金账户" width={800} visible={isDetailsVisible5} onOk={handleOk5} onCancel={handleCancel5}>
        <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined/>}maxLength={18} />
      <br/>
        <br/>
        <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}/>
        <br/>
        <br/>
        </Modal>
        <Modal title="销户资金账户" width={800} visible={isDetailsVisible6} onOk={handleOk6} onCancel={handleCancel6}>
        <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined/>}maxLength={18} />
      <br/>
        <br/>
        <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}/>
        <br/>
        <br/>
        </Modal>
        </div>
        );
      

};
export default MoneyPage;