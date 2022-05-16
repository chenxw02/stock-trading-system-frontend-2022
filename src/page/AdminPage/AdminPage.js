import {LockOutlined} from "@ant-design/icons";
import './AdminPage.css';
import { Table, Button, Space, Modal, Descriptions, Switch, Input, InputNumber, message, Menu } from 'antd';
import { useState } from 'react';
const { Column, ColumnGroup } = Table;


const data = [
    {
        id : '00000',
        name : 'SZS DataBase Co. Ltd',
        price: 10,
        number: 20098,
    },
    {
        id : '00001',
        name : 'ADS QSC Co. Ltd',
        price: 5,
        number: 12742,
    },
    {
        id : '00002',
        name : 'SEF Squad Co. Ltd',
        price: 2,
        number: 109832,
    },
]

const StockDataBuy = [
    {
        price: 2.00,
        time: "2022-5-12 20:38:31",
        number: 10000,
    },
    {
        price: 2.31,
        time: "2022-5-11 19:08:11",
        number: 13400,
    },
    {
        price: 1.98,
        time: "2022-5-10 07:08:25",
        number: 9820,
    },
    {
        price: 2.03,
        time: "2022-5-11 17:54:01",
        number: 6823,
    },
]

const StockDataSell = [
    {
        price: 2.11,
        time: "2022-5-10 20:38:31",
        number: 10800,
    },
    {
        price: 3.01,
        time: "2022-5-11 17:28:11",
        number: 13400,
    },
    {
        price: 1.99,
        time: "2022-5-11 17:08:25",
        number: 9820,
    },
    {
        price: 2.03,
        time: "2022-5-12 19:54:01",
        number: 6823,
    },
]

// const columns = [
//     {
//         title:"股票编号",
//         key:"id",
//         dataIndex:"id",
//         defaultSortOrder:"descend", 
//         sorter:"(a, b) => a.id - b.id",
//     },
//     {
//         title:"股票名称",
//         key:"name",
//         dataIndex:"name",
//         defaultSortOrder:"descend",
//         sorter:"(a, b) => a.name - b.name",
//     },
//     {
//         title:"股票信息",
//         children:[
//             {
//                 title:"最新成交价格",
//                 key:"price",
//                 dataIndex:"price",
//                 defaultSortOrder:"descend",
//                 sorter:"(a, b) => a.price - b.price",
//             },
//             {
//                 title:"最新成交数量",
//                 key:"number",
//                 dataIndex:"number",
//                 defaultSortOrder:"descend",
//                 sorter:"(a, b) => a.number - b.number",
//             },
//         ]
//     },
//     {
//         title:"Action",
//         key:"action",
//         render:() => (
//             <Space size="middle">
//             <a onClick={()=>{
//                 showDetails();
//             }} >详情</a>
//             </Space>
//         )
//     },
//   ];

function AdminPage() {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [isPwdChangeVisible, setIsPwdChangeVisible] = useState(false);
    const [stockSortOrder, setStockSortOrder] = useState("descend");
    const [MenuCurrentChoose, setMenuCurrentChoose] = useState("descend");
    
    const showDetails = () => {
        setIsDetailsVisible(true);
    };

    const handleOk = () => {
        setIsDetailsVisible(false);
    };

    const handleCancel = () => {
        setIsDetailsVisible(false);
    };

    const showPwdChange = () => {
        setIsPwdChangeVisible(true);
    }

    const handlePwdOk = () => {
        setIsPwdChangeVisible(false);
    };

    const handlePwdCancel = () => {
        setIsPwdChangeVisible(false);
    };

    const changeSortOrder = (e) =>{
        setStockSortOrder(e);
    }

    console.log(stockSortOrder);
    return(
        <div className='admin_background'>

        <div className='admin_header'>
            <div className='admin_welcome'>Hi,Admin</div>

            <div id="datetime" className="admin_datetime">  
                {setInterval("document.getElementById('datetime').innerHTML=new Date();", 1000)}  
            </div>

            <div className='admin_button_box'>
               <Button type="primary" danger className="admin_button"
                    onClick={()=>{
                        window.location.href="./";
                    }}
                >退出登录</Button>
                <Button type="primary" className="admin_button" onClick={()=>{showPwdChange();}}>修改密码</Button> 
            </div>
            
        </div>

        <div className='admin_table_back'>
            <Table  dataSource={data} className="admin_table" bordered="true">
                <Column title="股票编号"  dataIndex="id" defaultSortOrder="descend" sorter={(a, b) => a.id - b.id} />
                <Column title="股票名称"  dataIndex="name" defaultSortOrder="descend" sorter={(a, b) => a.name - b.name} />
                <ColumnGroup title="股票信息">
                    <Column title="最新成交价格"  dataIndex="price" defaultSortOrder="descend" sorter={(a, b) => a.price - b.price} />
                    <Column title="最新成交数量"  dataIndex="number" defaultSortOrder="descend" sorter={(a, b) => a.number - b.number} />
                </ColumnGroup>
                <Column title="操作" key="action" width={200}
                    render={() => (
                        <Space size="middle">
                            <a onClick={()=>{
                                showDetails();
                            }} >详情</a>
                            <Switch checkedChildren="开启交易" unCheckedChildren="暂停交易" defaultChecked />
                        </Space>
                    )}
                    />
            </Table> 
            <Modal title="股票详情" width={800} visible={isDetailsVisible} onOk={()=>handleOk()} onCancel={()=>handleCancel()}
                footer={[
                    <Button key="ok" type="primary" onClick={()=>handleOk()}>
                      返回
                    </Button>,
                  ]}
            >
                <Descriptions bordered size="small">
                    <Descriptions.Item label="股票名称">SEF Squad Co. Ltd</Descriptions.Item>
                    <Descriptions.Item label="最新交易价格">2</Descriptions.Item>
                    <Descriptions.Item label="最新交易数量">109832</Descriptions.Item>
                </Descriptions>
                <Menu onClick={(e)=>{setMenuCurrentChoose(e.key);changeSortOrder(e.key);}} selectedKeys={[MenuCurrentChoose]} mode="horizontal"
                items={[{label: (
                                <a onClick={()=>changeSortOrder()}>
                                    买指令
                                </a>
                                ),
                        key: "descend",
                        },
                        {label: (
                                <a onClick={()=>changeSortOrder()}>
                                    卖指令
                                </a>
                                ),
                        key: "ascend",
                        }
                        ]} />
                <Table  dataSource={stockSortOrder=="descend"?StockDataBuy:StockDataSell} sortDirections={stockSortOrder} className="admin_table" size="small" bordered="true">
                    <Column title="股票价格"  dataIndex="price" sortOrder={stockSortOrder} sorter={(a, b) => a.price - b.price} />
                    <Column title="进入系统时间"  dataIndex="time" />
                    <Column title="股数"  dataIndex="number" />
                </Table> 
                <InputNumber addonBefore="最大涨幅"
                    style={{ width: '30%', marginTop:"1.5%" }} 
                    defaultValue={0} 
                    min={0} max={100} step="0.01"
                    formatter={value => `${Number(value).toFixed(2)}%`}
                    parser={value => value.replace('%', '')} />
                <InputNumber addonBefore="最大跌幅" 
                    style={{ width: '30%' , marginTop:"1.5%" , marginLeft:"5%"}} 
                    defaultValue={0} 
                    min={0} max={100} step="0.01"
                    formatter={value => `${Number(value).toFixed(2)}%`}
                    parser={value => value.replace('%', '')} />
                <Button type="primary" style={{ width: '10%' , marginTop:"1.5%" , marginLeft:"10%"}}
                    onClick={()=>{message.success("设置成功");}}>
                    设置
                </Button>,
            </Modal> 
            <Modal title="修改密码" visible={isPwdChangeVisible} onOk={()=>handlePwdOk()} onCancel={()=>handlePwdCancel()}
            footer={null}>
            <Input.Password
                className="admin_pwd_inputbox"
                placeholder="原密码"
                prefix={<LockOutlined />}
            />
            <Input.Password
                className="admin_pwd_inputbox"
                placeholder="新密码"
                prefix={<LockOutlined />}
            />
            <Input.Password
                className="admin_pwd_inputbox"
                placeholder="重新输入新密码"
                prefix={<LockOutlined />}
            />  
            <Button type="primary" style={{ width: '20%' , marginTop:"3%" , marginLeft:"75%"}}
                    onClick={()=>{message.success("密码修改成功");}}>
                    更改密码
            </Button>,
            </Modal> 
        </div>
        
        
        </div>
        
    )
}

export default AdminPage;