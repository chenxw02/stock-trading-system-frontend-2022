import { LockOutlined } from "@ant-design/icons";
import './AdminPage.css';
import { Table, Button, Space, Modal, Descriptions, Switch, Input, InputNumber, message, Menu } from 'antd';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import request from "../../utils/request";
const { Column, ColumnGroup } = Table;


const data = [];

const StockDataBuy = [];

const StockDataSell = [];


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
    const [stockDataSell, setStockDataSell] = useState(StockDataSell);
    const [stockDataBuy, setStockDataBuy] = useState(StockDataBuy);
    const [descStockId, setDescStockId] = useState("");
    const [descStockName, setDescStockName] = useState("");
    const [descNewPrice, setDescNewPrice] = useState(0);
    const [descNewAmount, setDescNewAmount] = useState(0);
    const [riseThreshold, setRiseThreshold] = useState(0);
    const [fallThreshold, setFallThreshold] = useState(0);

    const showDetails = (id, name, rise_threshold, fall_threshold) => {
        console.log(rise_threshold);
        setDescStockId(id);
        setDescStockName(name);
        setRiseThreshold(rise_threshold);
        setFallThreshold(fall_threshold);
        request('/admin/latest_transaction', "POST",
            {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            {
                "stock_id": id,
            }).then((response) => {
                if (response.code == '0') {
                    setStockNewPrice(response.data.latest_price);
                    setStockNewAmount(response.data.latest_amount);
                }
                else {
                    alert(response.message);
                }
            });
        request('/admin/instruction', "POST",
            {

                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            {
                "buy_or_sell": "B",
                "stock_id": id,
            }).then((response) => {
                if (response.code == '0') {
                    setStockDataBuy(response.data);
                }
                else {
                    alert(response.message);
                }
            });
        request('/admin/instruction', "POST",
            {

                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            {
                "buy_or_sell": "S",
                "stock_id": id,
            }).then((response) => {
                if (response.code == '0') {
                    setStockDataSell(response.data);
                }
                else {
                    alert(response.message);
                }
            });

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
            key: "stock_id",
            dataIndex: "stock_id",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "股票名称",
            key: "stock_name",
            dataIndex: "stock_name",
        },
        {
            title: "涨幅阈值",
            key: "rise_threshold",
            dataIndex: "rise_threshold",
        },
        {
            title: "跌幅阈值",
            key: "fall_threshold",
            dataIndex: "fall_threshold",
        },
        {
            title: "Action",
            key: "action",
            render: (_, { status, stock_id, stock_name, rise_threshold, fall_threshold }) => (
                <Space className="admin_space" size="middle">
                    <a className="admin_detail" onClick={() => {
                        showDetails(stock_id, stock_name, rise_threshold, fall_threshold);
                    }} >详情</a>
                    <Switch checkedChildren="开启交易" unCheckedChildren="暂停交易" defaultChecked={status == "T" ? true : false}
                        onClick={(checked) => {
                            request('/admin/stock_status', "PUT",
                                {
                                    'Content-Type': 'application/json',
                                    'Authorization': localStorage.getItem('token')
                                },
                                {
                                    "stock_id": stock_id,
                                    "stock_status": (checked ? "T" : "F")
                                }).then((response) => {
                                    if (response.code == '102') {
                                        window.location.href = "./";
                                    }
                                    else if (response.code != '0') {
                                        alert(response.message + " 请刷新页面！");
                                    }
                                })
                        }} />
                </Space>
            )
        },
    ];

    const detailColumns = [
        {
            title: '股票价格',
            key: 'target_price',
            dataIndex: 'target_price',
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
            key: "target_number",
            dataIndex: "target_number"
        },
    ];
    useEffect(() => {
        //todo: 发请求并判断是否有错误
        request('/admin/permission', "GET",
            {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        ).then((response) => {
            //虽然下面这个If分支毫无意义，但是为了展现代码结构，我还是保留着了
            console.log(localStorage.getItem('token'));
            console.log(response.code);
            if (response.code == '0') {
                setStocks(response.data);
            }
            else if (response.code == '102') {
                window.location.href = "./";
            }
            else {
                alert(response.message);
            }
        })

    }, stocks);
    return (
        <div className='admin_background'>

            <div className='admin_header'>
                <div className='admin_welcome'>Dear {localStorage.getItem('admin_name')}</div>

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
                <Table dataSource={stocks}
                    //等等data可以改成stocks
                    columns={columns} className="admin_table" bordered="true" />

                <Modal title="股票详情" width={800} visible={isDetailsVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}
                    footer={[
                        <Button key="ok" type="primary" onClick={() => handleOk()}>
                            返回
                        </Button>,
                    ]}
                >
                    <Descriptions bordered size="small">
                        <Descriptions.Item label="股票编号">{descStockId}</Descriptions.Item>
                        <Descriptions.Item label="股票名称">{descStockName}</Descriptions.Item>
                        <br />
                        <Descriptions.Item label="最新交易价格">{stockNewPrice}</Descriptions.Item>
                        <Descriptions.Item label="最新交易数量">{stockNewAmount}</Descriptions.Item>
                    </Descriptions>
                    <Menu onClick={(e) => { setMenuCurrentChoose(e.key); setStockSortOrder(e.key); console.log(stockSortOrder) }} selectedKeys={[MenuCurrentChoose]} mode="horizontal"
                        items={
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
                    <Table dataSource={stockSortOrder == "descend" ? stockDataBuy : stockDataSell} columns={detailColumns} className="admin_table" size="small" bordered="true" />
                    <InputNumber addonBefore="最大涨幅"
                        style={{ width: '30%', marginTop: "1.5%" }}
                        value={riseThreshold}
                        min={0} max={100} step="0.01"
                        formatter={value => `${Number(value).toFixed(2)}%`}
                        parser={value => value.replace('%', '')}
                        onChange={(value) => { setRiseThreshold(value) }} />
                    <InputNumber addonBefore="最大跌幅"
                        style={{ width: '30%', marginTop: "1.5%", marginLeft: "5%" }}
                        value={fallThreshold}
                        min={0} max={100} step="0.01"
                        formatter={value => `${Number(value).toFixed(2)}%`}
                        parser={value => value.replace('%', '')}
                        onChange={(value) => { setFallThreshold(value); }} />
                    <Button type="primary" style={{ width: '10%', marginTop: "1.5%", marginLeft: "10%" }}
                        onClick={() => {
                            if (riseThreshold >= 100 || riseThreshold < 0 || fallThreshold >= 100 || fallThreshold < 0) {
                                alert("非法涨跌幅,请重新输入!");
                            }
                            else {
                                request('/admin/stock_threshold', "PUT",
                                    {
                                        'Content-Type': 'application/json',
                                        'Authorization': localStorage.getItem('token')
                                    },
                                    {
                                        "stock_id": descStockId,
                                        "rise_threshold": riseThreshold,
                                        "fall_threshold": fallThreshold
                                    }).then((r) => {

                                        if (r.code == '102') {
                                            window.location.href = "./";
                                        }
                                        else if (r.code == '0') {
                                            request('/admin/permission', "GET",
                                                {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': localStorage.getItem('token')
                                                }
                                            ).then((response) => {
                                                if (response.code == '0') {
                                                    setStocks(response.data);
                                                }
                                                else if (response.code == '102') {
                                                    window.location.href = "./";
                                                }
                                                else {
                                                    alert(response.message);
                                                }
                                            })
                                            alert("涨跌幅更新成功");
                                        }
                                        else {
                                            alert(r.message);
                                        }
                                    })
                            }
                        }}>
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
                            if (newPassword.length == 0 || oldPassword.length == 0 || confirmPassword.length == 0) {
                                alert("输入不可为空!");
                            }
                            else if (newPassword == confirmPassword) {
                                request('/admin', "PUT",
                                    {
                                        'Content-Type': 'application/json',
                                        'Authorization': localStorage.getItem('token')
                                    },
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
                                        else if (response.code == '102') {
                                            window.location.href = "./";
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