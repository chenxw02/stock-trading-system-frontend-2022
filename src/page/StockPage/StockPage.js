import React from 'react';
import './StockPage.css'
import Head from '../StockadminPage/Head.js';
import { Card,Col,Modal,Row, Input,Radio,DatePicker, Space,Tabs} from 'antd';
import ProTable from '@ant-design/pro-table';
import { useState } from 'react';
import { UserOutlined,PhoneOutlined,IdcardOutlined,HomeOutlined,KeyOutlined}from '@ant-design/icons';
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
  const [value, setValue] = useState(1);

  const onChange1 = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const [value2, setValue2] = useState(false);
  const onChange2 = (e) => {
    console.log( e.target.value);
    setValue2(e.target.value);
  };
  const onChange3 = (date, dateString) => {
    console.log(date, dateString);
  };
  const { TabPane } = Tabs;
  const onChange_Tab = (key) => {
    console.log(key);
  };
  const [value_tab,setValue_tab] = useState(0);
  const onChange_Tab_guashi = (e) => {
    console.log( e.target.value);
    setValue_tab(e.target.value);
  };
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
        <Card title="开设个人账户" bordered={true}hoverable={true} extra={<a onClick={showpage1}>More</a>}>
        自然人开立的证券帐户为个人帐户。
        </Card>
      </Col>
      <Col span={10}>
        <Card title="开设法人账户" bordered={true}hoverable={true} extra={<a onClick={showpage2}>More</a>}>
        法人开立股票帐户称为法人帐户
        </Card>
      </Col>
    </Row>
    <Row gutter={16}>
    <Col span={10}>
        <Card title="挂失、补办证券账户" bordered={true}hoverable={true} extra={<a onClick={showpage3}>More</a>}>
        若之前证券账户状态为冻结则更改为正常，若状态正常则变为冻结
        </Card>
      </Col>
      <Col span={10}>
        <Card title="销户证券账户" bordered={true}hoverable={true} extra={<a onClick={showpage4}>More</a>}>
       销户选中的证券账户
        </Card>
      </Col>
    </Row>
  </div>
<Modal title="开设个人账户" width={800} visible={isDetailsVisible1} onOk={handleOk} onCancel={handleCancel}>
<Input placeholder="个人证券账户号码" prefix={<UserOutlined/>}maxLength={18} />
<br />
    <br />
    <Input placeholder="个人证券账户密码" prefix={<KeyOutlined />}maxLength={6} />
<br />
    <br />
    <Input placeholder="用户姓名" prefix={<UserOutlined/>} />
<br />
    <br />
    <Radio.Group onChange={onChange1} value={value}>
      <Radio value={'M'}>男</Radio>
      <Radio value={'F'}>女</Radio>
    </Radio.Group>
    <br />
    <br /> 
    <Space direction="vertical">
    <DatePicker onChange={onChange3}  placeholder={"登记日期"}/>
    </Space>
<br />
    <br />  
<Input placeholder="用户身份证号" prefix={<IdcardOutlined />} maxLength={18}/>
<br />
    <br />
<Input placeholder="用户家庭住址" prefix={<HomeOutlined />} />
<br />
    <br />
<Input placeholder="用户职业" prefix={<UserOutlined />} />
<br />
    <br />
<Input placeholder="用户学历" prefix={<UserOutlined />} />
<br />
    <br />
<Input placeholder="用户工作单位" prefix={<UserOutlined />} />
<br />
    <br />
<Input placeholder="用户联系电话" prefix={<PhoneOutlined />} />
<br />
    <br />
    
    <Radio.Group onChange={onChange2} >
      <Radio value={true}>自己办理</Radio>
      <Radio value={false}>代办</Radio>
    </Radio.Group>
    <br />
    <br />
 
<Input placeholder="代办人身份证" prefix={<IdcardOutlined />} disabled={value2}/>
       </Modal>
       <Modal title="开设法人账户" width={800} visible={isDetailsVisible2} onOk={handleOk2} onCancel={handleCancel2}>
       <Input placeholder="法人证券账户号码" prefix={<KeyOutlined />}maxLength={18} />
<br />
    <br />
    <Input placeholder="法人证券账户密码" prefix={<UserOutlined/>}maxLength={6} />
<br />
    <br />
<Input placeholder="法人注册登记号码" prefix={<UserOutlined/>} maxLength={18}/>
<br />
    <br />  
<Input placeholder="营业执照号码" prefix={<IdcardOutlined />}maxLength={15} />
<br />
    <br />
    <Input placeholder="法定代表人身份证号码" prefix={<IdcardOutlined />}maxLength={18} />
<br />
    <br />
    <Input placeholder="法人姓名" prefix={<UserOutlined />} />
<br />
    <br />
    <Input placeholder="法人联系电话" prefix={<PhoneOutlined />} />
<br />
    <br />
<Input placeholder="法人联系地址" prefix={<HomeOutlined />} />
<br />
    <br />
<Input placeholder="法定代表人授予证券交易执行人姓名" prefix={<UserOutlined />} />
<br />
    <br />
<Input placeholder="用户学历" prefix={<UserOutlined />} />
<br />
    <br />
    <Input placeholder="授权人身份证号码" prefix={<IdcardOutlined />}maxLength={15} />
<br />
    <br />
    <Input placeholder="授权人联系电话" prefix={<PhoneOutlined />} />
<br />
    <br />
    <Input placeholder="授权地址" prefix={<HomeOutlined />} />
<br />
    <br />
       </Modal>
       <Modal title="挂失、补办证券账户" width={800} visible={isDetailsVisible3} onOk={handleOk3} onCancel={handleCancel3}>
       <Tabs defaultActiveKey="1" onChange={onChange_Tab}>
    <TabPane tab="挂失证券账户" key="1">
    <Radio.Group onChange={onChange_Tab_guashi} >
      <Radio value={0}>法人账户</Radio>
      <Radio value={1}>个人账户</Radio>
      </Radio.Group>
      <br/>
      <br/>
      <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined/>}maxLength={18} />
    
    </TabPane>
    <TabPane tab="补办证券账户" key="2">
    <Radio.Group onChange={onChange_Tab_guashi} >
      <Radio value={0}>法人账户</Radio>
      <Radio value={1}>个人账户</Radio>
      </Radio.Group>
      <br/>
      <br/>
      <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined/>}maxLength={18} />
      <br/>
      <br/>
      <Input placeholder="新证券账户号码" prefix={<KeyOutlined />}maxLength={18} />
<br />
    <br />
    <Input placeholder="新证券账户密码" prefix={<UserOutlined/>}maxLength={6} />
    </TabPane>
    </Tabs>
       </Modal>
       <Modal title="销户证券账户" width={800} visible={isDetailsVisible4} onOk={handleOk4} onCancel={handleCancel4}>
       <Input placeholder="证券账户号码" prefix={<UserOutlined/>}maxLength={18} />
<br />
    <br />
    <Input placeholder="法人注册登记号码或个人身份证号" prefix={<UserOutlined/>} maxLength={18}/>
<br />
    <br />  
       </Modal>
       
        </div>
      
    )
}


export default StockPage;