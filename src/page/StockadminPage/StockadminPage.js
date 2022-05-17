import { Layout, Descriptions,Badge, Table,Tabs,Space,Tag} from 'antd';
import React from 'react';
import Head from './Head';
const {Footer,Content} = Layout;
  const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

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
      title:'事件',
      dataIndex: 'event',
      key: 'event',
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
          <a>通过</a>
          <a>不通过</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      id_1:'1',
      stock: '43124',
      id: 32455436,
      event:'销户',
      tags: ['pass'],
    },
    {
        key: '2',
        id_1:'2',
        stock: '35423',
        id: 532453434,
        event:'开户',
        tags: ['fail'],
    },
    {
        key: '3',
        id_1:'3',
        stock: '34324',
        id: 23413244,
        event:'开户',
        tags: ['provisional'],
    },
  ];
  
function MoneyPage() {
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
    <Table columns={columns} dataSource={data} />
    </Content>
       </div>
    <Footer style={{ textAlign: 'center' }}>管理员界面</Footer>
        </div>
    )
}


export default MoneyPage;