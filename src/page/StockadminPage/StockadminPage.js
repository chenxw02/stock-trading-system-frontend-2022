import { Layout, Descriptions,Badge, Table,Tabs,Space,Tag, Button} from 'antd';
import React,{useState,useEffect}from 'react';
import Head from './Head';
import request from "../../utils/request";
const {Footer,Content} = Layout;
  const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

function MoneyPage() {
    const[mydata,setdata]=useState();
    const[data1,setdata1]=useState();

    useEffect(() => { //查询审批
      request(
          '/account_admin/show_deal',
          "GET",
          {'Content-Type': 'application/json',
			'Authorization': localStorage.getItem("token")}
        ).then((response) => {
          console.log(response);
           setdata1([]);
          for(var i=0; i<response.data.length; i++){
           var temp = { //一条记录
              "id_1": response.data[i]["deal_id"],
              "stock": response.data[i]["securities_account_number"],
              "id": response.data[i]["person_id"],
              "tags": response.data[i]["status"]
            };
            data1.push(temp);
          }
          console.log("this",data1);         
        }
        )
      }, );
    const [ifapproval,setapproval]=useState("1");
    const shenpi1=(e,r)=>
     {
      console.log(r["id_1"]);
       setapproval(e);
     };
     const shenpi2=(e,r)=>
     {
      console.log(e);
       setapproval(e);
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
          render: tags => (
            <>
              {tags.map(tag => {
                let color ;
                if (tag === 'pass') {
                  color = 'green';
                }
                else if(tag==='fail')
                {
                    color='red';
                }
                else if(tag==='provisional')
                {
                    color='yellow';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a  onClick={() =>{shenpi1(1,record)
              request('/account_admin/handle_deal', "POST", { 'Content-Type': 'application/json' },
              {
                "deal_id": record["id_1"],
                "ifapproval": ifapproval
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
              <a onClick={() =>{shenpi2(0,record)
              request('/account_admin/handle_deal', "POST", { 'Content-Type': 'application/json' },
              {
                "deal_id": record["id_1"],
                "ifapproval": ifapproval
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
    <Button>查询</Button>
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