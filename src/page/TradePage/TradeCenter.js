import Head from './Head.js';
import React, { useState, useRef, useEffect } from 'react';
import { Drawer, ConfigProvider, Button } from 'antd';
import './TradeCenter.css';
import { Card, Descriptions, Badge, Table, Tabs, Space, Tag, Statistic, Row, Col, Input, AutoComplete, Select, Cascader, InputNumber, Divider, Popover, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, AudioOutlined } from '@ant-design/icons';
import { hrHRIntl } from '@ant-design/pro-provider';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import request from "../../utils/request";
import $ from 'jquery'

const { Option } = Select;



//popovers
const totalamount = (
    <div>
        <p id="totalnumber">无数据</p>
    </div>
);

const pricerange = (
    <div>
        <p id="minprice">跌停：无数据</p>
        <p id="maxprice">涨停：无数据</p>
    </div>
)

const maxnumber = (
    <div>
        <p id="maxnumber">可买：无数据</p>
    </div>
)


function getMinMax(sID) {
    return request(
        '/trade/getMinMax',
        "POST",
        { 'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token") },
        { "stock_ID": sID })
}

function checkTransaction(sID, tType, price, amount, uID) {
    return request(
        '/trade/checkTransaction',
        "POST",
        { 'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token") },
        {
            "stock_ID": sID,
            "tType": tType,
            "price": price,
            "amount": amount,
            "uID": uID
        }
    )
}

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

var state = {
    transactionType: "buy",
    stockID: "",
    price: "10.0",
    amount: "100"
};

async function trade(e) {
    console.log(e);
    console.log(state);

    var transactionType = state.transactionType;
    var stockID = state.stockID
    var price = state.price
    var amount = state.amount
    var userID = "000000001";//localStorage.getItem("token");; //TODO: get actual user ID
    var res = await checkTransaction(stockID, transactionType, price, amount, userID);


    console.log(res);
    if (res.code == 0) {
        message.success("交易已委托");
    }
    else {
        message.error(res.message);
    }

}

async function priceRange() {
    var topLimit = "无数据";
    var lowLimit = "无数据";
    var transactionType = state.transactionType;
    var stockID = state.stockID;

    var res = await getMinMax(stockID, transactionType);
    if (res.code == 0) {
        topLimit = res.data[0].toFixed(2);
        lowLimit = res.data[1].toFixed(2);
    }
    //message.success("lowlimit: "+ lowLimit + " toplimit: " + topLimit);
    document.getElementById("minprice").innerHTML = "跌停：" + lowLimit;
    document.getElementById("maxprice").innerHTML = "涨停：" + topLimit;

}

function getMaxAmount(sID, tType, uID, price) {
    return request(
        '/trade/getMaxAmount',
        "POST",
        {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        {
            "stock_ID": sID,
            "tType": tType,
            "uID": uID,
            "price": price
        })
}

var prev_stock_ID_amount = "";
var prev_transaction_type = "buy";
var prev_price = 0;
async function maxAmount() {
    var limit = "无数据";
    var transactionType = state.transactionType;
    var stockID = state.stockID;
    var userID = "00000001";//localStorage.getItem("token");
    var price = state.price;

    prev_stock_ID_amount = stockID;
    prev_transaction_type = transactionType;
    prev_price = price;
    var res = await getMaxAmount(stockID, transactionType, userID, price);
    if (res.code == 0) {
        limit = res.data;
    }
    //message.success("max amount of stock:" + limit);
    if (transactionType == "buy") {
        document.getElementById("maxnumber").innerHTML = "可买：" + limit;
    }
    else {
        document.getElementById("maxnumber").innerHTML = "可卖：" + limit;
    }
}

async function totalPrice() {
    var price = state.price;
    var amount = state.amount;
    var res = price * amount;
    console.log(amount);
    document.getElementById("totalnumber").innerHTML = res.toFixed(2);

}

function buyupdate() {
    request(
        '/update/buy',
        "POST",
        { 'Content-Type': 'application/json' },
        { "transaction_id": "0000000001" })
        .then((response) => {
            console.log(response);
        })
}

function sellupdate() {
    request(
        '/update/sell',
        "POST",
        { 'Content-Type': 'application/json' },
        { "transaction_id": "0000000001" })
        .then((response) => {
            console.log(response);
        })
}

function showStockInfo() {
    var stock_id = state.stockID;
    if (stock_id.length == 6) {
        request(
            '/stock/info',
            "POST",
            {
                'Content-Type': 'application/json',
                'stock_id': stock_id
            })
            .then((response) => {
                console.log('stock info', response);
                if (response.code == 1) {
                    message.error(response.message);
                }
                else {
                    message.success("查询成功");
                    var name = response.data.name;
                    var point = (response.data.price).toFixed(2);
                    var float = ((response.data.price) - (response.data.end)).toFixed(2);
                    var ratio = ((float / response.data.end) * 100).toFixed(2);
                    var Dlow = response.data.Dlow;
                    var Dhigh = response.data.Dhigh;

                    document.getElementById("Dlow").innerHTML = response.data.Dlow.toFixed(2);
                    document.getElementById("Dhigh").innerHTML = response.data.Dhigh.toFixed(2);
                    document.getElementById("Wlow").innerHTML = response.data.Wlow.toFixed(2);
                    document.getElementById("Whigh").innerHTML = response.data.Whigh.toFixed(2);
                    document.getElementById("Mlow").innerHTML = response.data.Mlow.toFixed(2);
                    document.getElementById("Mhigh").innerHTML = response.data.Mhigh.toFixed(2);
                    document.getElementById("name").innerHTML = name;

                    if (float < 0) {
                        document.getElementById("point").innerHTML = point;
                        document.getElementById("float").innerHTML =  float;
                        document.getElementById("ratio").innerHTML =  ratio + '%';
                        var obj1 = document.getElementById("point");
                        obj1.setAttribute('style', 'color: green;');
                        var obj2 = document.getElementById("float");
                        obj2.setAttribute('style', 'color: green;');
                        var obj3 = document.getElementById("ratio");
                        obj3.setAttribute('style', 'color: green;');
                    }
                    else {
                        document.getElementById("point").innerHTML = point;
                        document.getElementById("float").innerHTML = '+' + float;
                        document.getElementById("ratio").innerHTML = '+' + ratio + '%';
                    }
                }


            })
    }

}

const own_columns = [
    {
        title: '名称',
        dataIndex: 'name',
        width: '15%',
    },
    {
        title: '成本',
        dataIndex: 'cost',
    },
    {
        title: '现价',
        dataIndex: 'price',
    },
    {
        title: '持仓',
        dataIndex: 'num',
    },
    {
        title: '可用',
        dataIndex: 'ava',
    },
    {
        title: '总市值',
        dataIndex: 'amount',
    },
];

const own = [
    {
        key: '1',
        name: 'John Brown',
        cost: 100,
        price: 100,
        num: 100,
        ava: 100,
        amount: 100,
    },
    {
        key: '2',
        name: 'Jim Green',
        cost: 100,
        price: 100,
        num: 100,
        ava: 100,
        amount: 100,
    },
    {
        key: '3',
        name: 'hh',
        cost: 100,
        price: 100,
        num: 100,
        ava: 100,
        amount: 100,
    },
    {
        key: '4',
        name: 'Jim Red',
        cost: 100,
        price: 100,
        num: 100,
        ava: 100,
        amount: 100,
    },
    {
        key: '5',
        name: 'Jim Red',
        cost: 100,
        price: 100,
        num: 100,
        ava: 100,
        amount: 100,
    },

];


function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
}

function TradePage() {
    const [own, setOwn] = useState([]) //持仓股票：信息
    useEffect(() => { //查询股票持仓
        request(
            '/ownstock/info',
            "GET",
            {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            })
            .then((response) => {
                console.log('own stock info', response);
                var list = [];
                for (var i = 0; i < response.data.length; i++) {
                    var c = response.data[i].own_amount / response.data[i].own_number; //成本
                    var g = (response.data[i].price - c) * response.data[i].own_number; //盈亏金额
                    var gr = g / (c * response.data[i].own_number); //盈亏比例
                    var temp = { //一条记录
                        key: response.data[i].stock_id,
                        name: response.data[i].stock_name,
                        cost: c.toFixed(2),
                        price: response.data[i].price.toFixed(2),
                        num: response.data[i].own_number,
                        ava: response.data[i].own_number - response.data[i].frozen,
                        gnl: g.toFixed(2),
                        gnlratio: gr.toFixed(2),
                        amount: (response.data[i].own_number * response.data[i].price).toFixed(2),
                    };
                    list.push(temp);
                }
                setOwn(list);
            })
    }, []);



    return (
        <div>
            <Head keyValue="1" />

            <div class="app">
                <div class="app-body">
                    <div class="app-body-main-content">
                        <section class="service-section">
                            <div className='thiscard'>
                                <Card>
                                    <p id="name" className='thisname'><a>无数据</a></p>
                                    <p id="point" className='thisinfo'>0.00</p>
                                    <p id="float" className='thisinfo'>0.00</p>
                                    <p id="ratio" className='thisinfo'>0.00%</p>
                                </Card>
                            </div>

                        </section>
                        <section class="info-section">
                            <div class='stock-info'>
                                <Descriptions
                                    bordered
                                    column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3, xm: 3 }}
                                >
                                    <Descriptions.Item label="今低"><a id="Dlow">null</a></Descriptions.Item>
                                    <Descriptions.Item label="周低"><a id="Wlow">null</a></Descriptions.Item>
                                    <Descriptions.Item label="月低"><a id="Mlow">null</a></Descriptions.Item>
                                    <Descriptions.Item label="今高"><a id="Dhigh">null</a></Descriptions.Item>
                                    <Descriptions.Item label="周高"><a id="Whigh">null</a></Descriptions.Item>
                                    <Descriptions.Item label="月高"><a id="Mhigh">null</a></Descriptions.Item>


                                </Descriptions>
                            </div>
                        </section>

                        <section class="stock-section">
                            <div class="stock">
                                <Table columns={own_columns} dataSource={own} onChange={onChange} pagination={false} showSorterTooltip={false} />
                            </div>
                        </section>



                    </div>

                    <div class="functions">
                        <div class="search-section">
                            <Input.Group compact>
                                <Select onChange={(value) => {
                                    state.transactionType = value;
                                }}
                                    defaultValue="buy" style={{ width: '20%' }}>
                                    <Option value='buy'>买</Option>
                                    <Option value='sell'>卖</Option>
                                </Select>
                                <AutoComplete
                                    onChange={(value) => {
                                        state.stockID = value;
                                        showStockInfo();
                                    }}
                                    //id="stockID"
                                    style={{ width: '80%' }}
                                    placeholder="请输入代码"


                                />
                            </Input.Group>
                            <br />
                            <Input.Group compact>
                                <Input style={{ width: '20%' }} defaultValue="价格" disabled />
                                {/* min和max为跌停和涨停板价格，需计算 */}
                                <Popover id="minmax" content={pricerange}>
                                    <InputNumber onChange={(value) => {
                                        state.price = value;
                                    }}
                                        onMouseEnter={
                                            priceRange}
                                        placeholder={"请输入价格"} style={{ width: '80%' }} step='0.01' min={0} max={1000000} />
                                </Popover>
                            </Input.Group>
                            <br />
                            <Input.Group compact>

                                <Input style={{ width: '20%' }} defaultValue="数量" disabled />
                                <Popover id="maxamount" content={maxnumber} >
                                    <InputNumber onChange={(value) => {
                                        state.amount = value;
                                    }}
                                        onMouseEnter={
                                            maxAmount}
                                        placeholder={"请输入数量"} style={{ width: '80%' }} step='100' min={0} />
                                </Popover>
                            </Input.Group>
                        </div>
                        <div class="button">
                            <Popover content={totalamount}>
                                <Button onMouseEnter={
                                    totalPrice}
                                    type="primary" block="true" onClick={trade}>确认</Button>
                            </Popover>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default TradePage;
