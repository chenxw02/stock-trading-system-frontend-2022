import React from 'react';
import './StockPage.css'
import Head from '../StockadminPage/Head.js';
import { Card, Col, Modal, Row, Input, Radio, DatePicker, Space, Tabs } from 'antd';
import ProTable from '@ant-design/pro-table';
import { useState } from 'react';
import { UserOutlined, PhoneOutlined, IdcardOutlined, HomeOutlined, KeyOutlined } from '@ant-design/icons';
import request from "../../utils/request";
let datasoruce=[];
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
    title: '用户住址',
    dataIndex: 'address',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '是否代办',
    dataIndex: 'ifagency',
  },
];
function StockPage() {
  const [Individual_stack_account, setAccount] = useState("");
  const [Individual_stack_pass, setIndipass] = useState("");
  const [Individual_Name, setIndiname] = useState("");
  const [Individual_ID, setIndiID] = useState("");
  const [Individual_Address, setIndiAddress] = useState("");
  const [Individual_Profession, setIndiProfession] = useState("");
  const [Individual_EB, setIndiEB] = useState("");
  const [Individual_WorkPlace, setIndiWP] = useState("");
  const [Individual_Phone, setIndiPhone] = useState("");
  const [DateString, setDateString] = useState("");
  const [isDetailsVisible1, setIsDetailsVisible1] = useState(false);
  const [Daiban, setIndiDaiBan] = useState("");
  const [LePerson_account, setLeaccount] = useState("");
  const [LePerson_pass, setLepass] = useState("");
  const [Le_ID, setLeID] = useState("");
  const [Bussiness_ID, setBussID] = useState("");
  const [LePerson_idaccount, setLeidaccount] = useState("");
  const [LePerson_name, setLename] = useState("");
  const [LePerson_phone, setLePhone] = useState("");
  const [LePerson_address, setLeaddress] = useState("");
  const [LePerson_aurotity_name, setLeAuname] = useState("");
  const [aurotity_ID, setAuID] = useState("");
  const [aurotity_phone, setAuPhone] = useState("");
  const [aurotity_address, setAuaddress] = useState("");

  const [code,setcode] = useState("");
  const [newaccount, setnewaccount] = useState("");
  const [newpass, setnewpass] = useState("");
  const [oldaccount, setoldaccount] = useState("");
  const [oldpass, setoldpass] = useState("");

  const showpage1 = () => {
    setIsDetailsVisible1(true);
  }
  const handleOk = () => {
    request('/account_admin/add_personal_securities_account', "POST", { 'Content-Type': 'application/json' },
      {
        "p_account_number": Individual_stack_account,
        "password": Individual_stack_pass,
        "user_name": Individual_Name,
        "user_gender" : sex,
        "registration_date" : DateString,
        "user_id_number" : Individual_ID,
        "user_address" : Individual_Address,
        "user_job" : Individual_Profession,
        "user_education" : Individual_EB,
        "user_work_unit" : Individual_WorkPlace,
        "telephone" : Individual_Phone,
        "agent" : value_tab,
        "agent_id" : Daiban,
        "authority" : "N",
      }).then((response) => {
        console.log(response);
        if (response.code == '0') {
          alert("注册成功！");
        }
        else {
          alert(response.message);
        }
  })
    setIsDetailsVisible1(false);
  };

  const handleCancel = () => {
    setIsDetailsVisible1(false);
  };
  const [isDetailsVisible2, setIsDetailsVisible2] = useState(false);
  const showpage2 = () => {
    setIsDetailsVisible2(true);
  }
  const handleOk2 = () => {
    request('/account_admin/add_legal_person_securities_account', "POST", { 'Content-Type': 'application/json' },
    {
      "l_account_number": LePerson_account,
      "password": LePerson_pass,
      "legal_person_registration_number": Le_ID,
      "business_license_number" : Bussiness_ID,
      "legal_person_id_number" : LePerson_idaccount,
      "legal_person_name" : LePerson_name,
      "legal_person_telephone" : LePerson_phone,
      "legal_person_address" : LePerson_address,
      "excutor" : LePerson_aurotity_name,
      "authorized_person_id_number" : aurotity_ID,
      "authorized_person_telephone" : aurotity_phone,
      "authorized_person_address" : aurotity_address,
      "authority" : "N",
    }).then((response) => {
      console.log(response);
      if (response.code == '0') {
        alert("注册成功！");
      }
      else {
        alert(response.message);
      }
})
    setIsDetailsVisible2(false);
  };

  const handleCancel2 = () => {
    setIsDetailsVisible2(false);
  };
  const [isDetailsVisible3, setIsDetailsVisible3] = useState(false);
  const showpage3 = () => {
    setIsDetailsVisible3(true);
  }
  const handleOk3 = () => {
    if(key == "1")
    {
      console.log("!!!!");
      if(value_tab)
      {
        console.log(value_tab,"!!");
        request('/account_admin/personal_security_freeze', "POST", { 'Content-Type': 'application/json' },
        {
          "id_num" : code
        }).then((response) => {
          console.log(response);
          if (response.code === '0') {
            alert("挂失成功！");
          }
          else {
            alert(response.message);
          }
    })
    }
    else
    { 
      request('/account_admin/legal_person_security_freeze', "POST", { 'Content-Type': 'application/json' },
        {
          "legal_register_num" : code
        }).then((response) => {
          console.log(response);
          if (response.code === '0') {
            alert("挂失成功！");
          }
          else {
            alert(response.message);
          }
    })
    }
  }
  else
  {
    if(value_tab)
      {
       
        request('/account_admin/re_add_personal_securities_account', "POST", { 'Content-Type': 'application/json' },
        {
          "user_id_number" : code,
          "p_account_number" : newaccount,
          "password" : newpass
        }).then((response) => {
          console.log(response);
          if (response.code == '0') {
            alert("办理成功！");
          }
          else {
            alert(response.message);
          }
    })
    }
    else
    {
      request('/account_admin/re_add_legal_person_securities_account', "POST", { 'Content-Type': 'application/json' },
        {
          "legal_person_registration_number" : code,
          "l_account_number" : newaccount,
          "password" : newpass
        }).then((response) => {
          console.log(response);
          if (response.code == '0') {
            alert("办理成功！");
          }
          else {
            alert(response.message);
          }
    })
    }
  }
    setIsDetailsVisible3(false);
  };

  const handleCancel3 = () => {
    setIsDetailsVisible3(false);
  };
  const [isDetailsVisible4, setIsDetailsVisible4] = useState(false);
  const showpage4 = () => {
    setIsDetailsVisible4(true);
  }
  const handleOk4 = () => {
    request('/account_admin/securities_account_delete', "POST", { 'Content-Type': 'application/json' },
        {
          "label" : value_xiaohu,
          "id_num/legal_register_num" : oldpass,
          "security_num" : oldaccount
        }).then((response) => {
          console.log(response);
          if (response.code == '0') {
            alert("销户成功！");
          }
          else {
            alert(response.message);
          }
    })
    setIsDetailsVisible4(false);
  };

  const handleCancel4 = () => {
    setIsDetailsVisible4(false);
  };
  const [sex, setValue] = useState("");

  const onChange1 = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const [value2, setValue2] = useState(false);
  const onChange2 = (e) => {
    console.log(e.target.value);
    setValue2(e.target.value);
  };
  const onChange3 = (date, dateString) => {
    setDateString(dateString);
  };
  const { TabPane } = Tabs;
  const [key,setkey]=useState(1);
  const onChange_Tab = (key) => {
    console.log(key);
    setkey(key);
  };
  const [value_tab, setValue_tab] = useState(0);
  const onChange_Tab_guashi = (e) => {
    setValue_tab(e.target.value);
  };
  const [value_xiaohu, setValue_xiaohu] = useState(0);
  const onChange_Tab_xiaohu = (e) => {
    setValue_xiaohu(e.target.value);
  };
  return (

    <div>
      <Head keyValue="2" />
      <ProTable columns={columns} request={(params) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params);
        return Promise.resolve({
          data: datasoruce,
          success: true,
        });
      }} rowKey="key" pagination={{
        showQuickJumper: true,
      }} search={{
        labelWidth: 'auto',
    }} dateFormatter="string" headerTitle="证券账户详情" toolBarRender={() => [

      ]} />
      <div className="StockPage-site-card-wrapper">
        <Row gutter={16}>
          <Col span={10}>
            <Card title="开设个人账户" bordered={true} hoverable={true} extra={<a onClick={showpage1}>More</a>}>
              自然人开立的证券帐户为个人帐户。
            </Card>
          </Col>
          <Col span={10}>
            <Card title="开设法人账户" bordered={true} hoverable={true} extra={<a onClick={showpage2}>More</a>}>
              法人开立股票帐户称为法人帐户
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Card title="挂失、补办证券账户" bordered={true} hoverable={true} extra={<a onClick={showpage3}>More</a>}>
              若之前证券账户状态为冻结则更改为正常，若状态正常则变为冻结
            </Card>
          </Col>
          <Col span={10}>
            <Card title="销户证券账户" bordered={true} hoverable={true} extra={<a onClick={showpage4}>More</a>}>
              销户选中的证券账户
            </Card>
          </Col>
        </Row>
      </div>
      <Modal title="开设个人账户" width={800} visible={isDetailsVisible1} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="个人证券账户号码" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setAccount(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="个人证券账户密码" prefix={<KeyOutlined />} maxLength={6}
          onChange={(event) => {
            setIndipass(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="用户姓名" prefix={<UserOutlined />}
          onChange={(event) => {
            setIndiname(event.target.value);
          }} />
        <br />
        <br />
        <Radio.Group onChange={onChange1} >
          <Radio value={'M'}>男</Radio>
          <Radio value={'F'}>女</Radio>
        </Radio.Group>
        <br />
        <br />
        <Space direction="vertical">
          <DatePicker onChange={onChange3} placeholder={"登记日期"} />
        </Space>
        <br />
        <br />
        <Input placeholder="用户身份证号" prefix={<IdcardOutlined />} maxLength={18}
          onChange={(event) => {
            setIndiID(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="用户家庭住址" prefix={<HomeOutlined />}
          onChange={(event) => {
            setIndiAddress(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="用户职业" prefix={<UserOutlined />}
          onChange={(event) => {
            setIndiProfession(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="用户学历" prefix={<UserOutlined />}
          onChange={(event) => {
            setIndiEB(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="用户工作单位" prefix={<UserOutlined />}
          onChange={(event) => {
            setIndiWP(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="用户联系电话" prefix={<PhoneOutlined />}
          onChange={(event) => {
            setIndiPhone(event.target.value);
          }} />
        <br />
        <br />

        <Radio.Group onChange={onChange2} >
          <Radio value={true}>自己办理</Radio>
          <Radio value={false}>代办</Radio>
        </Radio.Group>
        <br />
        <br />

        <Input placeholder="代办人身份证" prefix={<IdcardOutlined />} disabled={value2}
        onChange={(event) => {
          setIndiDaiBan(event.target.value);
        }}  />
      </Modal>
      <Modal title="开设法人账户" width={800} visible={isDetailsVisible2} onOk={handleOk2} onCancel={handleCancel2}>
        <Input placeholder="法人证券账户号码" prefix={<KeyOutlined />} maxLength={18}
        onChange={(event) => {
          setLeaccount(event.target.value);
        }} />
        <br />
        <br />
        <Input placeholder="法人证券账户密码" prefix={<UserOutlined />} maxLength={6} 
        onChange={(event) => {
          setLepass(event.target.value);
        }}/>
        <br />
        <br />
        <Input placeholder="法人注册登记号码" prefix={<UserOutlined />} maxLength={18}
        onChange={(event) => {
          setLeID(event.target.value);
        }} />
        <br />
        <br />
        <Input placeholder="营业执照号码" prefix={<IdcardOutlined />} maxLength={15}
        onChange={(event) => {
          setBussID(event.target.value);
        }} />
        <br />
        <br />
        <Input placeholder="法定代表人身份证号码" prefix={<IdcardOutlined />} maxLength={18}
        onChange={(event) => {
          setLeidaccount(event.target.value);
        }} />
        <br />
        <br />
        <Input placeholder="法人姓名" prefix={<UserOutlined />} 
        onChange={(event) => {
          setLename(event.target.value);
        }} />
        <br />
        <br />
        <Input placeholder="法人联系电话" prefix={<PhoneOutlined />} 
        onChange={(event) => {
          setLePhone(event.target.value);
        }} />
        <br />
        <br />
        <Input placeholder="法人联系地址" prefix={<HomeOutlined />}
        onChange={(event) => {
          setLeaddress(event.target.value);
        }}  />
        <br />
        <br />
        <Input placeholder="法定代表人授予证券交易执行人姓名" prefix={<UserOutlined />} 
        onChange={(event) => {
          setLeAuname(event.target.value);
        }} />
        <br />
        <br />
        <Input placeholder="授权人身份证号码" prefix={<IdcardOutlined />} maxLength={15}
        onChange={(event) => {
          setAuID(event.target.value);
        }} />
        <br />
        <br />
        <Input placeholder="授权人联系电话" prefix={<PhoneOutlined />}
        onChange={(event) => {
          setAuPhone(event.target.value);
        }} />
        <br />
        <br />
        <Input placeholder="授权地址" prefix={<HomeOutlined />}
        onChange={(event) => {
          setAuaddress(event.target.value);
        }} />
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
            <br />
            <br />
            <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined />} maxLength={18} 
            onChange={(event) => {
              setcode(event.target.value);
            }}/>

          </TabPane>
          <TabPane tab="补办证券账户" key="2">
            <Radio.Group onChange={onChange_Tab_guashi} >
              <Radio value={0}>法人账户</Radio>
              <Radio value={1}>个人账户</Radio>
            </Radio.Group>
            <br />
            <br />
            <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined />} maxLength={18} 
            onChange={(event) => {
              setcode(event.target.value);
            }}/>
            <br />
            <br />
            <Input placeholder="新证券账户号码" prefix={< UserOutlined/>} maxLength={18} 
            onChange={(event) => {
              setnewaccount(event.target.value);
            }}/>
            <br />
            <br />
            <Input placeholder="新证券账户密码" prefix={<KeyOutlined />} maxLength={6} 
            onChange={(event) => {
              setnewpass(event.target.value);
            }}/>
          </TabPane>
        </Tabs>
      </Modal>
      <Modal title="销户证券账户" width={800} visible={isDetailsVisible4} onOk={handleOk4} onCancel={handleCancel4}>
      <Radio.Group onChange={onChange_Tab_xiaohu} >
              <Radio value={0}>法人账户</Radio>
              <Radio value={1}>个人账户</Radio>
            </Radio.Group>
            <br/>
            <br/>
        <Input placeholder="证券账户号码" prefix={<UserOutlined />} maxLength={18} 
        onChange={(event) => {
          setoldaccount(event.target.value);
        }}/>
        <br />
        <br />
        <Input placeholder="法人注册登记号码或个人身份证号" prefix={<UserOutlined />} maxLength={18} 
        onChange={(event) => {
          setoldpass(event.target.value);
        }}/>
        <br />
        <br />
      </Modal>

    </div>

  )
}


export default StockPage;