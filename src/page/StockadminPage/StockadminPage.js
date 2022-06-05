import { Layout, Descriptions,Badge, Table,Tabs,Space,Tag, Button} from 'antd';
import React,{useState,useEffect}from 'react';
import Head from './Head';
import request from "../../utils/request";
const {Footer,Content} = Layout;
  const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

let mydata = [];

function MoneyPage() {
  const [data1,setdata1]=useState([]);
    const [ifapproval,setapproval]=useState("");
    const shenpi1=(r)=>
     {
      console.log(r["id_1"]);
       setapproval(1);
     };
     const shenpi2=(r)=>
     {
       setapproval(0);
     };
     const columns = [
      {
        title: '编号',
          dataIndex: 'id_1',
          key: 'id_1',
      },
        {
          title: '证券账号',
          dataIndex: 'stock',
          key: 'stock',
        },
        {
          title: '用户身份证号',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',

        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a  onClick={() =>{shenpi1(record)
              request('/account_admin/handle_deal', "POST", { 'Content-Type': 'application/json' },
              {
                "deal_id": record["id_1"],
                "ifapproval": 1
              }).then((response) => {
                console.log(response);
                if (response.code === '0') {
                  alert("审批成功！");
                }
                else {
                  alert(response.message);
                }
              });
              }}>通过</a>
              <a onClick={() =>{shenpi2(record)
              request('/account_admin/handle_deal', "POST", { 'Content-Type': 'application/json' },
              {
                "deal_id": record["id_1"],
                "ifapproval": 0
              }).then((response) => {
                console.log(response);
                if (response.code === '0') {
                  alert("审批成功！");
                }
                else {
                  alert(response.message);
                }
              });
              }}>不通过</a>
            </Space>
          ),
        },
      ];
      const select_click=()=>{
        mydata = [];
        request(
          '/account_admin/show_deal',"POST", {'Content-Type': 'application/json'},{}
        ).then((response) => {
          console.log(response);
          for(var i=0; i<response.data.length; i++){
            mydata.push({ //一条记录
              "id_1": response.data[i]["deal_id"],
              "stock": response.data[i]["securities_account_number"],
              "id": response.data[i]["person_id"],
              "tags": response.data[i]["status"]
            });
          }
          console.log("that",mydata); 
          setdata1(mydata);   
        }
        );
        console.log("this",mydata);  
      }
      
    return(

        <div>
            <Head keyValue="2"/>
      <div className="Stockadmin_site-layout-content">
      <Descriptions title="欢迎"layout="horizontal" bordered>
      <Descriptions.Item label="创建人">管理员</Descriptions.Item>
      <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="运行" />
    </Descriptions.Item>
      <Descriptions.Item label="联系方式">
        3200105336@zju.edu.cn
      </Descriptions.Item>
      <Descriptions.Item label="创建时间">2022-05-12</Descriptions.Item>
      <Descriptions.Item label="更新时间">2022-5-15</Descriptions.Item>
      <Descriptions.Item label="备注">中国浙江省杭州市西湖区</Descriptions.Item>
    </Descriptions>
    <Content>
    <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="审批" key="1">
    </TabPane>
    </Tabs>
    <Button onClick={()=>select_click()}>查询</Button>
    <Table columns={columns} dataSource={data1} />
    </Content>
       </div>
    <Footer style={{ textAlign: 'center' }}>管理员界面</Footer>
    <script>
        setInterval(showTime, 1000);
    </script>
        </div>
      
    )
    
}



export default MoneyPage;