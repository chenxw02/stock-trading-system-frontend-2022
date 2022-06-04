import React from 'react';
import './MoneyPage.css'
import Head from '../StockadminPage/Head.js';
import request from "../../utils/request";
import { Card, Col, Row, Modal, Input, Radio, Tabs,Select } from 'antd';
import ProTable from '@ant-design/pro-table';
import { useState } from 'react';
import { UserOutlined, KeyOutlined, MoneyCollectOutlined } from '@ant-design/icons';
let datasoruce = [];
const { Option } = Select;
const columns = [
  {
    title: '证券账号',
    width: 80,
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
    width: 80,
    dataIndex: 'moneynumber',
    sorter: (a, b) => a.moneynumber - b.moneynumber,
  },
  {
    title: '状态',
    width: 80,
    dataIndex: 'status',
  },
];
function MoneyPage() {

  const [securities_account_number, setsecurities_account_number] = useState("");
  const [fund_account_number, setfund_account_number] = useState("");
  const [trade_password, settrade_password] = useState("");
  const [login_password, setlogin_password] = useState("");
  const [money, setmoney] = useState("");
  const [oldpass, setoldpass] = useState("");
  const [newpass, setnewpass] = useState("");
  const [id_num_legal_register_num, setid_num_legal_register_num] = useState("");
  const [isDetailsVisible1, setIsDetailsVisible1] = useState(false);
  const { TabPane } = Tabs;
  const [key, setkey] = useState(1);
  const onChange_Tab = (key) => {
    console.log(key);
    setkey(key);
  };
  const [value_buban, setValue_buban] = useState(0);
  const onChange_money_account_buban = (e) => {
    setValue_buban(e.target.value);
  };
  const showpage1 = () => {
    setIsDetailsVisible1(true);
  }
  const handleOk = () => {
    if (key == 1) {
      request('/account_admin/add_fund_account', "POST", { 'Content-Type': 'application/json' },
        {
          "label": value_money_account,
          "securities_account_number": securities_account_number,
          "fund_account_number": fund_account_number,
          "trade_password": trade_password,
          "login_password": login_password
        }).then((response) => {
          console.log(response);
          if (response.code == '0') {
            alert("注册成功！");
          }
          else {
            alert(response.message);
          }
        })
    }
    else {
      request('/account_admin/add_fund_account', "POST", { 'Content-Type': 'application/json' },
        {
          "label": value_money_account,
          "id_num/legal_register_num": securities_account_number,
          "account_number": fund_account_number,
          "trade_password": trade_password,
          "login_password": login_password
        }).then((response) => {
          console.log(response);
          if (response.code == '0') {
            alert("补办成功！");
          }
          else {
            alert(response.message);
          }
        })
    }
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
    request('/account_admin/modify_money', "POST", { 'Content-Type': 'application/json' },
      {
        "add_withdraw": value_money,
        "fund_account_number": fund_account_number,
        "trade_password": trade_password,
        "operating_num": money
      }).then((response) => {
        console.log(response);
        if (response.code === '0') {
          alert("操作成功！");
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
    request('/account_admin/fund_change_password', "POST", { 'Content-Type': 'application/json' },
      {
        "trade_withdraw": value_password,
        "fund_account_number": fund_account_number,
        "old_password": oldpass,
        "new_password": newpass
      }).then((response) => {
        console.log(response);
        if (response.code === '0') {
          alert("操作成功！");
        }
        else {
          alert(response.message);
        }
        setIsDetailsVisible3(false);
      });
  }

  const handleCancel3 = () => {
    setIsDetailsVisible3(false);
  };
  const [isDetailsVisible4, setIsDetailsVisible4] = useState(false);
  const showpage4 = () => {
    setIsDetailsVisible4(true);
  }
  const handleOk4 = () => {
    request('/account_admin/fund_freeze', "POST", { 'Content-Type': 'application/json' },
      {
        "id_num/legal_register_num": id_num_legal_register_num,
        "security_num": fund_account_number,
        "label": value_money_account_guashi
      }).then((response) => {
        console.log(response);
        if (response.code === '0') {
          alert("操作成功！");
        }
        else {
          alert(response.message);
        }
      });
    setIsDetailsVisible4(false);
  }

  const handleCancel4 = () => {
    setIsDetailsVisible4(false);
  };
  const [isDetailsVisible5, setIsDetailsVisible5] = useState(false);
  const showpage5 = () => {
    setIsDetailsVisible5(true);
  }
  const handleOk5 = () => {
    request('/account_admin/fund_thaw', "POST", { 'Content-Type': 'application/json' },
      {
        "id_num/legal_register_num": id_num_legal_register_num,
        "security_num": fund_account_number,
        "label": value_money_account_jiedong
      }).then((response) => {
        console.log(response);
        if (response.code === '0') {
          alert("操作成功！");
        }
        else {
          alert(response.message);
        }
      });
    setIsDetailsVisible5(false);
  }

  const handleCancel5 = () => {
    setIsDetailsVisible5(false);
  };
  const [isDetailsVisible6, setIsDetailsVisible6] = useState(false);
  const showpage6 = () => {
    setIsDetailsVisible6(true);
  }
  const handleOk6 = () => {
    request('/account_admin/fund_delete', "POST", { 'Content-Type': 'application/json' },
      {
        "id_num/legal_register_num": id_num_legal_register_num,
        "security_num": fund_account_number,
        "label": value_money_account_xiaohu
      }).then((response) => {
        console.log(response);
        if (response.code === '0') {
          alert("销户成功！");
        }
        else {
          alert(response.message);
        }
      });
    setIsDetailsVisible6(false);
  };

  const handleCancel6 = () => {
    setIsDetailsVisible6(false);
  };
  const [value_money, setValue_money] = useState(false);
  const onChange_money = (e) => {
    console.log(e.target.value);
    setValue_money(e.target.value);
  };
  const [value_password, setValue_password] = useState(false);
  const onChange_password = (e) => {
    console.log(e.target.value);
    setValue_password(e.target.value);
  };
  const [value_money_account, setValue_money_account] = useState(0);
  const onChange_money_account = (e) => {
    console.log(e.target.value);
    setValue_money_account(e.target.value);
  };
  const [value_money_account_guashi, setValue_money_account_guashi] = useState(0);
  const onChange_money_account_guashi = (e) => {
    console.log(e.target.value);
    setValue_money_account_guashi(e.target.value);
  };
  const [value_money_account_jiedong, setValue_money_account_jiedong] = useState(0);
  const onChange_money_account_jiedong = (e) => {
    console.log(e.target.value);
    setValue_money_account_jiedong(e.target.value);
  };
  const [value_money_account_xiaohu, setValue_money_account_xiaohu] = useState(0);
  const onChange_money_account_xiaohu = (e) => {
    console.log(e.target.value);
    setValue_money_account_xiaohu(e.target.value);
  };
  const [value_query,setvalue_query]=useState("");
  const onChange_query = (value) => {
    setvalue_query(value);
  };
  return (
    <div>
      <Head keyValue="3" />
      <ProTable columns={columns} request={(params) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log("");
        request('/account_admin/get_fund_account_information_by_query', "POST", { 'Content-Type': 'application/json' },
      {
        "securities_account_number": params["stockname"]?params["stockname"]:"",
        "fund_account_number": params["moneyname"]?params["moneyname"]:"",
        "balance": params["moneynumber"]?params["moneynumber"]:"",
        "status": params["status"]?params["status"]:"",
        "label" : value_query
      }).then((response) => {
        console.log(response);
        datasoruce = []
        for(var i=0; i<response.data.length; i++)
        {
          datasoruce.push(
            {
              "stockname" : response.data[i]["securities_account_number"],
              "moneyname" : response.data[i]["fund_account_number"],
              "moneynumber" : response.data[i]["balance"],
              "status" : response.data[i]["account_status"]
            }
          )
        }
      });
        return Promise.resolve({
          data: datasoruce,
          success: true,
        });
      }} rowKey="key" pagination={{
        showQuickJumper: true,
      }} search={{
        labelWidth: 'auto',
      }} toolBarRender={() => [
        <Select defaultValue="0" style={{ width: 120 }} onChange={onChange_query}>
        <Option value="0">法人证券账户</Option>
        <Option value="1">个人证券账户</Option>
        </Select>
      ]} />
      <div >
        <Row gutter={16}>
          <Col span={8}>
            <Card title="开设/补办资金账户" bordered={true} hoverable={true} extra={<a onClick={showpage1}>More</a>}>
              开设一个与证券账户绑定的资金账户
            </Card>
          </Col>
          <Col span={8}>
            <Card title="添加/取出资金" bordered={true} hoverable={true} extra={<a onClick={showpage2}>More</a>}>
              对选择的资金账户进行取出或资金操作
            </Card>
          </Col>
          <Col span={8}>
            <Card title="修改密码" bordered={true} hoverable={true} extra={<a onClick={showpage3}>More</a>}>
              对选择的资金账户的密码更改
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Card title="挂失资金账户" bordered={true} hoverable={true} extra={<a onClick={showpage4}>More</a>}>
              将状态为正常的资金账户更改为冻结
            </Card>
          </Col>
          <Col span={8}>
            <Card title="解冻资金账户" bordered={true} hoverable={true} extra={<a onClick={showpage5}>More</a>}>
              对资金账户注销的证券账户重新补办
            </Card>
          </Col>
          <Col span={8}>
            <Card title="销户资金账户" bordered={true} hoverable={true} extra={<a onClick={showpage6}>More</a>}>
              消除选择的资金账户
            </Card>
          </Col>
        </Row>
      </div>
      <Modal title="开设/补办资金账户" width={800} visible={isDetailsVisible1} onOk={handleOk} onCancel={handleCancel}>
        <Tabs defaultActiveKey="1" onChange={onChange_Tab}>
          <TabPane tab="开设资金账户" key="1">
            <Radio.Group onChange={onChange_money_account} >
              <Radio value={0}>法人账户</Radio>
              <Radio value={1}>个人账户</Radio>
            </Radio.Group>
            <br />
            <br />
            <Input placeholder="证券账户号码" prefix={<UserOutlined />} maxLength={18}
              onChange={(event) => {
                setsecurities_account_number(event.target.value);
              }} />
            <br />
            <br />
            <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}
              onChange={(event) => {
                setfund_account_number(event.target.value);
              }} />
            <br />
            <br />
            <Input placeholder="资金账户交易密码" prefix={<KeyOutlined />} maxLength={18}
              onChange={(event) => {
                settrade_password(event.target.value);
              }} />
            <br />
            <br />
            <Input placeholder="资金账户登录密码" prefix={<KeyOutlined />} maxLength={18}
              onChange={(event) => {
                setlogin_password(event.target.value);
              }} />
            <br />
            <br />
          </TabPane>
          <TabPane tab="补办资金账户" key="2">
            <Radio.Group onChange={onChange_money_account_buban} >
              <Radio value={0}>法人账户</Radio>
              <Radio value={1}>个人账户</Radio>
            </Radio.Group>
            <br />
            <br />
            <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined />} maxLength={18}
              onChange={(event) => {
                setsecurities_account_number(event.target.value);
              }} />
            <br />
            <br />
            <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}
              onChange={(event) => {
                setfund_account_number(event.target.value);
              }} />
            <br />
            <br />
            <Input placeholder="资金账户交易密码" prefix={<KeyOutlined />} maxLength={18}
              onChange={(event) => {
                settrade_password(event.target.value);
              }} />
            <br />
            <br />
            <Input placeholder="资金账户登录密码" prefix={<KeyOutlined />} maxLength={18}
              onChange={(event) => {
                setlogin_password(event.target.value);
              }} />
            <br />
            <br />
          </TabPane>
        </Tabs>
      </Modal>
      <Modal title="添加/取出资金" width={800} visible={isDetailsVisible2} onOk={handleOk2} onCancel={handleCancel2}>
        <Radio.Group onChange={onChange_money} >
          <Radio value={0}>存款</Radio>
          <Radio value={1}>取款</Radio>
        </Radio.Group>
        <br />
        <br />
        <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setfund_account_number(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="资金账户交易密码" prefix={<KeyOutlined />} maxLength={18}
          onChange={(event) => {
            settrade_password(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="金额" prefix={<MoneyCollectOutlined />}
          onChange={(event) => {
            setmoney(event.target.value);
          }} />
        <br />
        <br />
      </Modal>
      <Modal title="修改密码" width={800} visible={isDetailsVisible3} onOk={handleOk3} onCancel={handleCancel3}>
        <Radio.Group onChange={onChange_password} >
          <Radio value={0}>资金账户交易密码</Radio>
          <Radio value={1}>资金账户登录密码</Radio>
        </Radio.Group>
        <br />
        <br />
        <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setfund_account_number(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="旧密码" prefix={<KeyOutlined />} maxLength={6}
          onChange={(event) => {
            setoldpass(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="新密码" prefix={<KeyOutlined />} maxLength={6}
          onChange={(event) => {
            setnewpass(event.target.value);
          }} />
        <br />
        <br />
      </Modal>
      <Modal title="挂失资金账户" width={800} visible={isDetailsVisible4} onOk={handleOk4} onCancel={handleCancel4}>
        <Radio.Group onChange={onChange_money_account_guashi} >
          <Radio value={0}>法人账户</Radio>
          <Radio value={1}>个人账户</Radio>
        </Radio.Group>
        <br />
        <br />
        <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setid_num_legal_register_num(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="证券账户号码" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setfund_account_number(event.target.value);
          }} />
        <br />
        <br />
      </Modal>
      <Modal title="解冻资金账户" width={800} visible={isDetailsVisible5} onOk={handleOk5} onCancel={handleCancel5}>
        <Radio.Group onChange={onChange_money_account_jiedong} >
          <Radio value={0}>法人账户</Radio>
          <Radio value={1}>个人账户</Radio>
        </Radio.Group>
        <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setid_num_legal_register_num(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="证券账户号码" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setfund_account_number(event.target.value);
          }} />
        <br />
        <br />
      </Modal>
      <Modal title="销户资金账户" width={800} visible={isDetailsVisible6} onOk={handleOk6} onCancel={handleCancel6}>
        <Radio.Group onChange={onChange_money_account_xiaohu} >
          <Radio value={0}>法人账户</Radio>
          <Radio value={1}>个人账户</Radio>
        </Radio.Group>
        <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setid_num_legal_register_num(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="证券账户号码" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setfund_account_number(event.target.value);
          }} />
        <br />
        <br />
      </Modal>
    </div>
  );


};
export default MoneyPage;