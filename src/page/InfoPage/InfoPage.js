//待处理问题：普通查询延迟、K线图绘制延迟
//正式发布时删除测试用输出

import { InfoHead } from './InfoHead.js';
import { Input, Button, Menu, Row, Col, Table, Space } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import request from "../../utils/request";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import React from "react";
import * as echarts from "echarts";




/*处理交易时间*/
function handledate(time) {
    if (time == "")
        return "";
    var res;
    var test = time.toString();
    res = test[0] + test[1] + test[2] + test[3] + "/" + test[4] + test[5] + "/" + test[6] + test[7];
    return res;
}
function handletime(time) {
    if (time == "")
        return "";
    var res;
    var test = time.toString();
    while (test.length < 6) {
        test = "0" + test;
    }
    res = test[0] + test[1] + ": " + test[2] + test[3] + ": " + test[4] + test[5];
    return res;
}

var data = [];
function QueryTable() {
    const navigate = useNavigate();
    let location = useLocation();
    return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
            <br />
            <br />
            <br />
            <Table
                size='small'
                columns={[//change
                    {
                        title: '股票名称',
                        width: 300,
                        dataIndex: 'stockname',
                        key: 'stockname',
                    },
                    {
                        title: '股票代码',
                        width: 200,
                        dataIndex: 'stockid',
                        key: 'stockid',
                        sorter: (a, b) => a.stockid - b.stockid,
                        sortDirections: ['ascend'],
                    },
                    {
                        title: '开盘价',
                        width: 200,
                        dataIndex: 'pricestart',
                        key: 'pricestart',
                        align: 'left',
                    },
                    {
                        title: '当前价格',
                        width: 200,
                        dataIndex: 'priceend',
                        key: 'priceend',
                        align: 'left',
                    },
                    {
                        title: '最高价',
                        width: 200,
                        dataIndex: 'pricehigh',
                        key: 'pricehigh',
                        align: 'left',
                    },
                    {
                        title: '最低价',
                        width: 200,
                        dataIndex: 'pricelow',
                        key: 'pricelow',
                        align: 'left',
                    },
                    {
                        title: 'Action',
                        width: 200,
                        key: 'action',
                        render: (text, record) => (
                            <Space size="middle" >
                                <a onClick={() => {
                                    if (location.state.Authority == '高级') {
                                        navigate('/highqueryresult', { state: { ID: location.state.ID, stock_id: record.stockid, ktype: 1 } });
                                    }
                                    else {
                                        alert("无权限，请升级为高级用户");
                                    }
                                }}>K线图</a>
                            </Space>
                        ),
                    },

                ]}
                dataSource={data}
                bordered title={() => '查询结果'}
                expandable={{
                    expandedRowRender: (record) => (
                        <p style={{ margin: 0, }}>{record.description}</p>
                    ),
                }}
            />
        </div>
    )
}


/*登陆页面*/
function InfoPage() {
    const [ID, setID] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <InfoHead ID="游客" />
            <Input
                className="login_inputbox_user"
                placeholder="账户"
                prefix={<UserOutlined />}
                onChange={(event) => {
                    setID(event.target.value);
                }}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="密码"
                prefix={<LockOutlined />}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            {/*修改于2022/6/3，增加边界值判断*/}
            <Button type="primary" size="large" className="login_button"
                onClick={() => {
                    if (ID.length > 20) {
                        alert("账户不能超过20位！")
                    } else if (ID.length == 0) {
                        alert("账户不能为空！")
                    } else if (Password.length > 20) {
                        alert("密码不能超过20位！")
                    } else if (Password.length == 0) {
                        alert("密码不能为空！")
                    } else if (/.*[\u4e00-\u9fa5]+.*$/.test(Password)) {
                        alert("密码含有中文！")
                    } else {
                        request('/query_user/login', "POST", { 'Content-Type': 'application/json' },
                            {
                                "ID": ID,
                                "password": Password
                            }).then((response) => {
                                console.log(response);
                                if (response.code == '0') {
                                    /*console.log(response.data.type);*/
                                    if (response.data.type == "H")
                                        navigate('/queryresult', { state: { ID: response.data.user_id, Authority: "高级" } })
                                    else
                                        navigate('/queryresult', { state: { ID: response.data.user_id, Authority: "普通" } })
                                }
                                else {
                                    alert(response.message);
                                }
                            })
                    }

                }}
            > 登录</Button>

            <Button type="primary" size="large" className="login_button"
                onClick={() => { window.location.href = "./register"; }}
            > 注册</Button>
        </div>
    )
}

/*初始查询页面*/
/*不再使用*/
function QueryLogin() {
    let location = useLocation();
    const ID = location.state.ID;
    const Authority = location.state.Authority;
    const navigate = useNavigate();

    const [Stock, setStock] = useState("");//查询股票
    return (
        <div>
            <InfoHead ID={ID} />
            {/*导航栏*/}
            <Row>
                <Col span={3}>
                    <Menu>
                        <Menu.SubMenu title="用户信息">
                            <Menu.Item>当前账户：{ID}</Menu.Item>
                            <Menu.Item>权限：{Authority}</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item onClick={() => {
                            navigate('/upgrade', { state: { ID: ID, Authority: Authority } });
                        }}>账户升级</Menu.Item>
                        <Menu.Item onClick={() => {
                            navigate('/change', { state: { ID: ID, Authority: Authority } });
                        }}>修改密码</Menu.Item>
                        <Menu.Item onClick={() => {
                            window.location.href = "./info";
                        }}>退出登录</Menu.Item>
                    </Menu>;
                </Col>
            </Row>
            <Row>
                <Col span={15} push={3}>
                    <Input placeholder="请输入股票代码或股票名称"
                        onChange={(event) => {
                            setStock(event.target.value);
                        }}
                    />
                </Col>
                <Col push={4}>
                    <Button type="primary" size="primary"
                        onClick={() => {
                            navigate('/queryresult', { state: { ID: ID, Authority: Authority, Stock: Stock } });
                        }}
                    >查询</Button>

                </Col>
            </Row>
        </div>
    )
}
/*查询结果*/
function QueryResult() {
    let location = useLocation();
    const ID = location.state.ID;
    const Authority = location.state.Authority;

    const navigate = useNavigate();
    const [Stock, setStock] = useState(location.state.Stock);
    return (
        <div>
            <InfoHead ID={ID} />
            {/*导航栏*/}
            <div>
                <Row>
                    <Col span={3}>
                        <Menu>
                            <Menu.SubMenu title="用户信息">
                                <Menu.Item>当前账户：{ID}</Menu.Item>
                                <Menu.Item>权限：{Authority}</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item onClick={() => {
                                navigate('/upgrade', { state: { ID: ID, Authority: Authority } });
                            }}>账户升级</Menu.Item>
                            <Menu.Item onClick={() => {
                                navigate('/change', { state: { ID: ID, Authority: Authority } });
                            }}>修改密码</Menu.Item>
                            <Menu.Item onClick={() => {
                                window.location.href = "./info";
                            }}>退出登录</Menu.Item>
                        </Menu>;
                    </Col>
                    <Col span={15}>
                        <Input size="large"
                            placeholder={Stock}
                            onChange={(event) => {
                                setStock(event.target.value);
                            }}
                        />
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                                {/*修改于2022/6/3，增加边界值判断*/ }
                                {/*中文、英文、数字为合法输入*/ }
                                if (!/.*[\u4e00-\u9fa50-9a-zA-Z]+.*$/.test(Stock)) {
                                    alert("查询输入含有非法字符！")
                                } else {
                                    data.length = 0;
                                    request('/release_search', "POST", { 'Content-Type': 'application/json' },
                                        {
                                            "content": Stock,
                                        }).then((response) => {
                                            console.log(response);
                                            if (response.code == '0') {
                                                var descrip = '';
                                                var n = 0;
                                                for (let i = 0; i <= response.data.length; i++) {                                                       
                                                    if (response.data[i].buy_sell_flag != "") {
                                                        descrip = "交易类型:" + response.data[i].buy_sell_flag + " 交易日期:" + handledate(response.data[i].transaction_date) + " 交易时间:" + handletime(response.data[i].transaction_time) + " 交易数量:"
                                                            + response.data[i].transaction_number + " 交易单价:" + response.data[i].transaction_price + " 交易总额:" + response.data[i].transaction_amount;
                                                    }
                                                    else {
                                                        descrip = "";
                                                    }
                                                    data.push({
                                                        key: i,
                                                        stockname: response.data[i].stock_name,
                                                        stockid: response.data[i].stock_id,
                                                        pricestart: response.data[i].start_price,
                                                        priceend: response.data[i].end_price,
                                                        pricehigh: response.data[i].highest_price,
                                                        pricelow: response.data[i].lowest_price,
                                                    })
                                                    while (response.data[i + 1].stock_id == response.data[i].stock_id) {
                                                        i++;
                                                        descrip += '\n'+"交易类型:" + response.data[i].buy_sell_flag + " 交易日期:" + handledate(response.data[i].transaction_date) + " 交易时间:" + handletime(response.data[i].transaction_time) + " 交易数量:"
                                                            + response.data[i].transaction_number + " 交易单价:" + response.data[i].transaction_price + " 交易总额:" + response.data[i].transaction_amount;
                                                        if (i == response.data.length - 1) {
                                                            break;
                                                        }
                                                    }
                                                    data[n].description = descrip;
                                                    n++;
                                                    console.log(descrip);
                                                }
                                            }
                                            else {
                                                alert(response.message);
                                            }
                                        })
                                    navigate('/queryresult', { state: { ID: ID, Authority: Authority, Stock: Stock } });
                                }
                            }}
                        >查询</Button>
                    </Col>
                    <Col push={1}>
                        {/*传递到新查询页面,测试用*/}
                        {/*<h1>{location.state.Stock}</h1>*/}
                    </Col>
                    {/*股票信息组件*/}
                    <Col push={3}>
                        <QueryTable></QueryTable>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

/*账户注册界面*/
function Register() {
    const [ID, setID] = useState("");
    const [Password, setPassword] = useState("");
    const [RePassword, setRePassword] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <InfoHead ID="新用户" />
            <Input
                className="login_inputbox_user"
                placeholder="账户"
                prefix={<UserOutlined />}
                onChange={(event) => {
                    setID(event.target.value);
                }}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="密码"
                prefix={<LockOutlined />}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="确认密码"
                prefix={<LockOutlined />}
                onChange={(event) => {
                    setRePassword(event.target.value);
                }}
            />
            {/*修改于2022/6/3，增加边界值判断*/}
            <Button type="primary" size="large" className="login_button"
                onClick={() => {
                    if (ID.length > 20) {
                        alert("账户不能超过20位！")
                    } else if (ID.length == 0) {
                        alert("账户不能为空！")
                    } else if (Password != RePassword) {
                        alert("两次输入密码不同！")
                    } else if (Password.length > 20) {
                        alert("密码不能超过20位！")
                    } else if (Password.length == 0) {
                        alert("密码不能为空")
                    } else if (/.*[\u4e00-\u9fa5]+.*$/.test(Password)) {
                        alert("密码含有中文！")
                    }
                    else {
                        request('/query_user/register', "POST", { 'Content-Type': 'application/json' },
                            {
                                "ID": ID,
                                "password": Password
                            }).then((response) => {
                                if (response.code == '0') {
                                    alert("注册成功");
                                    navigate('/info')
                                }
                                else {
                                    alert(response.message);
                                }
                            })
                    }

                }}
            > 注册账户</Button>
        </div>
    )
}
/*账户升级界面*/
function Upgrade() {
    let location = useLocation();
    const ID = location.state.ID;
    const [pay_account_id, setpay_account_id] = useState("");
    const [pay_account_psw, setpay_account_psw] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <InfoHead ID={ID} />
            <Input
                className="login_inputbox_user"
                placeholder={ID}
                prefix={<UserOutlined />}
                disabled="true"
            />
            <Input
                className="login_inputbox_user"
                placeholder="支付账户"
                prefix={<UserOutlined />}
                onChange={(event) => {
                    setpay_account_id(event.target.value);
                }}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="支付密码"
                prefix={<LockOutlined />}
                onChange={(event) => {
                    setpay_account_psw(event.target.value);
                }}
            />
            <Button type="primary" size="large" className="login_button"
                onClick={() => {
                    request('/query_user/upgrade', "POST", { 'Content-Type': 'application/json' },
                        {
                            "ID": ID,
                            "pay_account_id": pay_account_id,
                            "pay_account_psw": pay_account_psw
                        }).then((response) => {
                            if (response.code == '0') {
                                alert("升级成功");
                                navigate('/querylogin', { state: { "ID": ID, "Authority": "高级" } })
                            }
                            else {
                                alert(response.message);
                            }
                        })
                }}
            > 升级账户</Button>

        </div>
    )
}
/*修改密码界面*/
function Change() {
    let location = useLocation();
    const ID = location.state.ID;
    const [Password, setPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <InfoHead ID={ID} />
            <Input
                className="login_inputbox_user"
                placeholder={ID}
                prefix={<UserOutlined />}
                disabled="true"
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="新密码"
                prefix={<LockOutlined />}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="确认密码"
                prefix={<LockOutlined />}
                onChange={(event) => {
                    setNewPassword(event.target.value);
                }}
            />
            {/*修改于2022/6/3，增加边界值判断*/}
            <Button type="primary" size="large" className="login_button"
                onClick={() => {
                    if (Password != NewPassword) {
                        alert("两次输入密码不同！")
                    } else if (Password.length > 20) {
                        alert("密码不能超过20位！")
                    } else if (Password.length == 0) {
                        alert("密码不能为空！")
                    } else if (/.*[\u4e00-\u9fa5]+.*$/.test(Password)) {
                        alert("密码含有中文！")
                    } else {
                        request('/query_user/modify', "POST", { 'Content-Type': 'application/json' },
                            {
                                "ID": ID,
                                "password": Password,
                                "re_password": NewPassword
                            }).then((response) => {
                                if (response.code == '0') {
                                    alert("修改成功");
                                    navigate('/info')
                                }
                                else {
                                    alert(response.message);
                                }
                            })
                    }
                }}
            > 确认</Button>
        </div>
    )
}

let Id_;
var orgifo = [
    [20130124, 2320.26, 2320.40, 2287.3, 2362.94],
    [20130125, 2300.00, 2291.3, 2288.26, 2308.38],
    [20130126, 2295.35, 2346.5, 2295.35, 2346.92],
    [20130127, 2347.22, 2358.98, 2337.35, 2363.8],
    [20130128, 2360.75, 2382.48, 2347.89, 2383.76],
    [20130129, 2383.43, 2385.42, 2371.23, 2391.82],
    [20130130, 2377.41, 2419.02, 2369.57, 2421.15],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130131, 2425.92, 2428.15, 2417.58, 2440.38],
    [20130201, 2411.11, 2433.13, 2403.3, 2437.42]
]//date,开，收，低，高
var ifotaple = [];


function HighQueryResult() {
    var location = useLocation();
    const navigate = useNavigate();
    var ktype = 1;
    ktype = location.state.ktype;
    var stock_id = "a111";
    stock_id = location.state.stock_id;
    Id_ = stock_id;
    const ID = location.state.ID;
    request('/release_search_advanced', "POST", { 'Content-Type': 'application/json' },
        {
            "content": stock_id
        }).then((response) => {
            console.log(response);
            if (response.code == '0') {
                var i;
                orgifo = [];
                for (i = 0; i < response.data.length; i++) {
                    ifotaple = [];
                    ifotaple.push(response.data[i].date);
                    ifotaple.push(response.data[i].start_price);
                    ifotaple.push(response.data[i].end_price);
                    ifotaple.push(response.data[i].lowest_price);
                    ifotaple.push(response.data[i].highest_price);

                    orgifo.push(ifotaple);
                }
            }
            else {
                alert(response.message);
            }
        })

    if (ktype == 1) {
        return (
            <div>
                <InfoHead ID={ID} />
                {/*测试用*/}
                <h1>股票ID：{location.state.stock_id}</h1>
                <Kline1></Kline1>
                <Col push={11}>
                    <Button type="primary" size="large"
                        onClick={() => {
                            navigate('/highqueryresult', { state: { stock_id: stock_id, ktype: 1 } });
                        }}
                    >日K</Button>
                    <Button type="primary" size="large"
                        onClick={() => {
                            navigate('/highqueryresult', { state: { stock_id: stock_id, ktype: 2 } });
                        }}
                    >周K</Button>
                    <Button type="primary" size="large"
                        onClick={() => {
                            navigate('/highqueryresult', { state: { stock_id: stock_id, ktype: 3 } });
                        }}
                    >月K</Button>
                </Col>
            </div>
        )
    }
    else if (ktype == 2) {
        return (
            <div>
                <InfoHead ID={ID} />
                <Kline2></Kline2>
                <Col push={11}>
                    <Button type="primary" size="large"
                        onClick={() => {
                            navigate('/highqueryresult', { state: { stock_id: stock_id, ktype: 1 } });
                        }}
                    >日K</Button>
                    <Button type="primary" size="large"
                        onClick={() => {
                            navigate('/highqueryresult', { state: { stock_id: stock_id, ktype: 2 } });
                        }}
                    >周K</Button>
                    <Button type="primary" size="large"
                        onClick={() => {
                            navigate('/highqueryresult', { state: { stock_id: stock_id, ktype: 3 } });
                        }}
                    >月K</Button>
                </Col>
            </div>
        )
    }
    else if (ktype == 3) {
        return (
            <div>
                <InfoHead ID={ID} />
                <Kline3></Kline3>
                <Col push={11}>
                    <Button type="primary" size="large"
                        onClick={() => {
                            navigate('/highqueryresult', { state: { stock_id: stock_id, ktype: 1 } });
                        }}
                    >日K</Button>
                    <Button type="primary" size="large"
                        onClick={() => {
                            navigate('/highqueryresult', { state: { stock_id: stock_id, ktype: 2 } });
                        }}
                    >周K</Button>
                    <Button type="primary" size="large"
                        onClick={() => {
                            navigate('/highqueryresult', { state: { stock_id: stock_id, ktype: 3 } });
                        }}
                    >月K</Button>
                </Col>
            </div>
        )
    }
}

function Kline1() {
    return (
        <div>
            <Kkline1></Kkline1>
        </div>
    )
}

function Kline2() {
    return (
        <div>
            <Kkline2></Kkline2>
        </div>
    )
}
function Kline3() {
    return (
        <div>
            <Kkline3></Kkline3>
        </div>
    )
}

class Kkline1 extends React.Component {
    componentDidMount() {
        {
            var chartDom = document.getElementById('main1');
            var myChart = echarts.init(chartDom);
            var option;
            var date = [];
            var ifo = [];
            var i, j = 49;
            var temparr1 = [];
            var temparr = [];
            for (i = 0; i < orgifo.length && j >= 0; i++, j--) {
                temparr = [];
                temparr1 = orgifo[i];
                date.push(temparr1[0]);
                temparr.push(temparr1[1]);
                temparr.push(temparr1[2]);
                temparr.push(temparr1[3]);
                temparr.push(temparr1[4]);
                ifo.push(temparr);
            }
            option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross"
                    }
                },
                legend: {
                    data: "日K"
                },
                grid: {
                    left: "10%",
                    right: "10%",
                    bottom: "15%"
                },
                xAxis: {
                    type: "category",
                    data: date,
                    scale: true,
                },
                yAxis: {
                    scale: true,

                },
                dataZoom: [{
                    type: "inside",
                    start: 50,
                    end: 100
                }, {
                    show: true,
                    type: "slider",
                    top: "90%",
                    start: 50,
                    end: 100
                }],
                series: [{
                    name: "日K",
                    type: "candlestick",
                    data: ifo,
                    colorBy: "series",
                    legendHoverLink: true,
                    layout: "horizontal",
                    barWidth: "69%",
                    itemStyle: {
                        opacity: 1
                    }
                }]
            }
            myChart.setOption(option);
        }

    }
    render() {
        return (
            <div id="main1" style={{ width: "1600px", height: "800px", margin: "auto" }}></div>
        )
    }
}





class Kkline2 extends React.Component {
    componentDidMount() {
        var chartDom = document.getElementById('main2');
        var myChart = echarts.init(chartDom);
        var option;
        var date = [];
        var ifo = [];
        var i;
        var j = 49;
        var temparr = [];
        var temparr1 = [];
        var tempdate = [];
        var tempifo = [];
        for (i = orgifo.length - 1; j >= 0 && i > 7; j--) {
            var z;
            var max, min, open, close;
            max = -1;
            min = 99999;
            for (z = -7; z <= 0; z++) {
                temparr1 = orgifo[i + z];
                if (max < temparr1[1]) {
                    max = temparr1[1];
                }
                if (min > temparr1[2]) {
                    min = temparr1[2];
                }
            }
            temparr1 = orgifo[i];
            close = temparr1[4];
            temparr1 = orgifo[i - 7];
            open = temparr1[3];
            temparr = [];
            temparr.push(max);
            temparr.push(min);
            temparr.push(open);
            temparr.push(close);
            tempifo.push(temparr);
            temparr1 = orgifo[i];
            tempdate.push(temparr1[0]);
            i = i - 7;
        }
        //reverse
        for (i = tempdate.length - 1; i >= 0; i--) {
            ifo.push(tempifo[i]);
            date.push(tempdate[i]);
        }


        option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross"
                }
            },
            legend: {
                data: "周K" //need to
            },
            grid: {
                left: "10%",
                right: "10%",
                bottom: "15%"
            },
            xAxis: {
                type: "category",
                data: date,
                scale: true,
            },
            yAxis: {
                scale: true,

            },
            dataZoom: [{
                type: "inside",
                start: 50,
                end: 100
            }, {
                show: true,
                type: "slider",
                top: "90%",
                start: 50,
                end: 100
            }],
            series: [{
                name: "周K",
                type: "candlestick",
                data: ifo,
                colorBy: "series",
                legendHoverLink: true,
                layout: "horizontal",
                barWidth: "69%",
                itemStyle: {
                    opacity: 1
                }
            }]
        }
        myChart.setOption(option);
    }

    render() {
        return (
            <div id="main2" style={{ width: "1600px", height: "800px", margin: "auto" }}></div>
        )
    }
}


class Kkline3 extends React.Component {
    componentDidMount() {
        {
            var Stock_id = Id_;
            var chartDom = document.getElementById('main3');
            var myChart = echarts.init(chartDom);
            var option;
            var date = [];
            var ifo = [];
            var i;
            var j = 49;
            var temparr = [];
            var temparr1 = [];
            var tempdate = [];
            var tempifo = [];
            for (i = orgifo.length - 1; j >= 0 && i > 30; j--) {
                var z;
                var max, min, open, close;
                max = -1;
                min = 99999;
                for (z = -30; z <= 0; z++) {
                    temparr1 = orgifo[i + z];
                    if (max < temparr1[1]) {
                        max = temparr1[1];
                    }
                    if (min > temparr1[2]) {
                        min = temparr1[2];
                    }
                }
                temparr1 = orgifo[i];
                close = temparr1[4];
                temparr1 = orgifo[i - 30];
                open = temparr1[3];
                temparr = [];
                temparr.push(max);
                temparr.push(min);
                temparr.push(open);
                temparr.push(close);
                tempifo.push(temparr);
                temparr1 = orgifo[i];
                tempdate.push(temparr1[0]);
                i = i - 30;
            }
            //reverse
            for (i = tempdate.length - 1; i >= 0; i--) {
                ifo.push(tempifo[i]);
                date.push(tempdate[i]);
            }

            option = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross"
                    }
                },
                legend: {
                    data: "月K" //need to
                },
                grid: {
                    left: "10%",
                    right: "10%",
                    bottom: "15%"
                },
                xAxis: {
                    type: "category",
                    data: date,
                    scale: true,
                },
                yAxis: {
                    scale: true,

                },
                dataZoom: [{
                    type: "inside",
                    start: 50,
                    end: 100
                }, {
                    show: true,
                    type: "slider",
                    top: "90%",
                    start: 50,
                    end: 100
                }],
                series: [{
                    name: "月K",
                    type: "candlestick",
                    data: ifo,
                    colorBy: "series",
                    legendHoverLink: true,
                    layout: "horizontal",
                    barWidth: "69%",
                    itemStyle: {
                        opacity: 1
                    }
                }]
            }
            myChart.setOption(option);
        }

    }
    render() {
        return (
            <div id="main3" style={{ width: "1600px", height: "800px", margin: "auto" }}></div>
        )
    }
}


export { InfoPage, QueryLogin, Register, QueryResult, Upgrade, Change, HighQueryResult };