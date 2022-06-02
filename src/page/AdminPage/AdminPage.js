import { LockOutlined } from "@ant-design/icons";
import './AdminPage.css';
import { Table, Button, Space, Modal, Descriptions, Switch, Input, InputNumber, message, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import request from "../../utils/request";
const { Column, ColumnGroup } = Table;


const data = [
    {
        id: '00000',
        name: 'SZS DataBase Co. Ltd',
        status: false
    },
    {
        id: '00001',
        name: 'ADS QSC Co. Ltd',
        status: true
    },
    {
        id: '00002',
        name: 'SEF Squad Co. Ltd',
        status: true
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



function AdminPage() {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [isPwdChangeVisible, setIsPwdChangeVisible] = useState(false);
    const [stockSortOrder, setStockSortOrder] = useState("descend");
    const [MenuCurrentChoose, setMenuCurrentChoose] = useState("descend");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [stocks, setStocks] = useState([]);
    const [stockName, setStockName] = useState("");
    const [stockNewPrice, setStockNewPrice] = useState(0);
    const [stockNewAmount, setStockNewAmount] = useState(0);
    const [stockDataSell, setStockDataSell] = useState([]);
    const [stckDataBuy, setStckDataBuy] = useState([]);
    const [descStockId, setDescStockId] = useState("");
    const [descStockName, setDescStockName] = useState("");
    const [descNewPrice, setDescNewPrice] = useState(0);
    const [descNewAmount, setDescNewAmount] = useState(0);
    const showDetails = (id, name) => {
        setDescStockId(id);
        setDescStockName(name);
        // request('/admin', "PUT", { 'Content-Type': 'application/json' },
        //     {
        //         "password": oldPassword,
        //         "new_password": newPassword
        //     }).then((response) => {
        //         console.log(response);
        //         if (response.code == '0') {
        //             message.success("修改成功！");
        //             //去掉token让他重新登录
        //             localStorage.removeItem("token");

        //             window.location.href = "./"
        //         }
        //         else {
        //             alert(response.message);
        //         }
        //     })
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
    const columns = [
        {
            title: "股票编号",
            key: "id",
            dataIndex: "id",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "股票名称",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Action",
            key: "action",
            render: (_, { status, id }) => (
                <Space className="admin_space" size="middle">
                    <a className="admin_detail" onClick={(id, name) => {
                        showDetails(id, name);
                    }} >详情</a>
                    <Switch checkedChildren="开启交易" unCheckedChildren="暂停交易" defaultChecked={status}
                        onChange={(newStatus) => {
                            //todo 
                            //     request('/admin', "PUT", { 'Content-Type': 'application/json' },
                            // {
                            //     "password": oldPassword,
                            //     "new_password": newPassword
                            // }).then((response) => {
                            //     console.log(response);
                            //     if (response.code == '0') {
                            //         message.success("修改成功！");
                            //         //去掉token让他重新登录
                            //         localStorage.removeItem("token");

                            //         window.location.href = "./"
                            //     }
                            //     else {
                            //         alert(response.message);
                            //     }
                            // })

                        }} />
                </Space>
            )
        },
    ];

    const detailColumns = [
        {
            title: '股票价格',
            key: 'price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            defaultSortOrder: { stockSortOrder },
        },
        {
            title: "进入系统时间",
            key: "time",
            dataIndex: "time",
        },
        {
            title: "股数",
            key: "number",
            dataIndex: "number"
        },
    ];
    useEffect(() => {
        //todo: 发请求并判断是否有错误

    });
    return (
        <div className='admin_background'>

            <div className='admin_header'>
                <div className='admin_welcome'>Hi,Admin</div>

                <div id="datetime" className="admin_datetime">
                    {setInterval("document.getElementById('datetime').innerHTML=new Date();", 1000)}
                </div>

                <div className='admin_button_box'>
                    <Button type="primary" danger className="admin_button"
                        onClick={() => {
                            window.location.href = "./";
                        }}
                    >退出登录</Button>
                    <Button type="primary" className="admin_button" onClick={() => { showPwdChange(); }}>修改密码</Button>
                </div>

            </div>

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/admin">股票管理员</Link>
                </Menu.Item>
            </Menu>

            <div className='admin_table_back'>
                <Table dataSource={data} columns={columns} className="admin_table" bordered="true" />;

                <Modal title="股票详情" width={800} visible={isDetailsVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}
                    footer={[
                        <Button key="ok" type="primary" onClick={() => handleOk()}>
                            返回
                        </Button>,
                    ]}
                >
                    <Descriptions bordered size="small">
                        <Descriptions.Item label="股票编号">00001</Descriptions.Item>
                        <Descriptions.Item label="股票名称">SEF Squad Ctdo. L</Descriptions.Item>
                        <br />
                        <Descriptions.Item label="最新交易价格">2</Descriptions.Item>
                        <Descriptions.Item label="最新交易数量">109832</Descriptions.Item>
                    </Descriptions>
                    <Menu onClick={(e) => { setMenuCurrentChoose(e.key); setStockSortOrder(e.key); console.log(stockSortOrder) }} selectedKeys={[MenuCurrentChoose]} mode="horizontal"
                        items={
                            //     [{
                            //     label: (
                            //         <a onClick={(e) => changeSortOrder(e.key)}>
                            //             买指令
                            //         </a>
                            //     ),
                            //     key: "descend",
                            // },
                            // {
                            //     label: (
                            //         <a onClick={(e) => changeSortOrder(e.key)}>
                            //             卖指令
                            //         </a>
                            //     ),
                            //     key: "ascend",
                            // }
                            // ]
                            [
                                {
                                    label: '买指令',
                                    key: "descend"
                                },
                                {
                                    label: '卖指令',
                                    key: "ascend"
                                }
                            ]
                        } />
                    {/* <Table dataSource={stockSortOrder == "descend" ? StockDataBuy : StockDataSell} sortDirections={stockSortOrder} className="admin_table" size="small" bordered="true">
                        <Column title="股票价格" dataIndex="price" sortOrder={stockSortOrder} sorter={(a, b) => a.price - b.price} />
                        <Column title="进入系统时间" dataIndex="time" />
                        <Column title="股数" dataIndex="number" />
                    </Table> */}
                    <Table dataSource={stockSortOrder == "descend" ? StockDataBuy : StockDataSell} columns={detailColumns} className="admin_table" size="small" bordered="true" />;
                    <InputNumber addonBefore="最大涨幅"
                        style={{ width: '30%', marginTop: "1.5%" }}
                        defaultValue={0}
                        min={0} max={100} step="0.01"
                        formatter={value => `${Number(value).toFixed(2)}%`}
                        parser={value => value.replace('%', '')} />
                    <InputNumber addonBefore="最大跌幅"
                        style={{ width: '30%', marginTop: "1.5%", marginLeft: "5%" }}
                        defaultValue={0}
                        min={0} max={100} step="0.01"
                        formatter={value => `${Number(value).toFixed(2)}%`}
                        parser={value => value.replace('%', '')} />
                    <Button type="primary" style={{ width: '10%', marginTop: "1.5%", marginLeft: "10%" }}
                        onClick={() => { message.success("设置成功"); }}>
                        设置
                    </Button>,
                </Modal>
                <Modal title="修改密码" visible={isPwdChangeVisible} onOk={() => handlePwdOk()} onCancel={() => handlePwdCancel()}
                    footer={null}>
                    <Input.Password
                        className="admin_pwd_inputbox"
                        placeholder="原密码"
                        prefix={<LockOutlined />}
                        onChange={(event) => {
                            setOldPassword(event.target.value);
                        }}
                    />
                    <Input.Password
                        className="admin_pwd_inputbox"
                        placeholder="新密码"
                        prefix={<LockOutlined />}
                        onChange={(event) => {
                            setNewPassword(event.target.value);
                        }}
                    />
                    <Input.Password
                        className="admin_pwd_inputbox"
                        placeholder="重新输入新密码"
                        prefix={<LockOutlined />}
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                    />
                    <Button type="primary" style={{ width: '20%', marginTop: "3%", marginLeft: "75%" }}
                        onClick={() => {
                            if (newPassword == confirmPassword) {
                                request('/admin', "PUT", { 'Content-Type': 'application/json' },
                                    {
                                        "password": oldPassword,
                                        "new_password": newPassword
                                    }).then((response) => {
                                        console.log(response);
                                        if (response.code == '0') {
                                            message.success("修改成功！");
                                            //去掉token让他重新登录
                                            localStorage.removeItem("token");

                                            window.location.href = "./"
                                        }
                                        else {
                                            alert(response.message);
                                        }
                                    })
                            }
                            else {
                                message.error("两次密码不一致！请检查后重新输入");
                            }
                        }}>
                        更改密码
                    </Button>,
                </Modal>
            </div>


        </div >

    )
}

export default AdminPage;