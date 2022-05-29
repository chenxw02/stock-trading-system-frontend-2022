import Head from './Head.js';
import React, { useState, useRef } from 'react';
import { Drawer, ConfigProvider, Button } from 'antd';
import './TradeCenter.css';
import { Card, Descriptions, Badge, Table, Tabs, Space, Tag, Statistic, Row, Col, Input, AutoComplete, Select, Cascader, InputNumber, Divider, Popover, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, AudioOutlined } from '@ant-design/icons';
import { hrHRIntl } from '@ant-design/pro-provider';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import request from "../../utils/request";

const { Option } = Select;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const content = (
    <div>
        <p>5000.00</p>
    </div>
);

//返回信息示例
const trade_success = () => {
    message.success('交易已委托');
};

const buy_error = () => {
    message.error('可用资金不足');
};

const sell_error = () => {
    message.error('可用股票数量不足');
};

const trade_warning = () => {
    message.warning('当前时间段不可发起交易');
};

function trade(e) {
	console.log(e);
	message.success('交易已委托');
}

function buyupdate() {
    request(
		'/update/buy',
		"POST",
		{'Content-Type': 'application/json'},
		{"transaction_id": "0000000001"})
	.then((response) => {
		console.log(response);
	})
}

function sellupdate() {
    request(
		'/update/sell',
		"POST",
		{'Content-Type': 'application/json'},
		{"transaction_id": "0000000001"})
	.then((response) => {
		console.log(response);
	})
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
    // {
    // 	title: 'Address',
    // 	dataIndex: 'address',
    // 	filters: [
    // 		{
    // 			text: <span>London</span>,
    // 			value: 'London',
    // 		},
    // 		{
    // 			text: <span>New York</span>,
    // 			value: 'New York',
    // 		},
    // 	],
    // 	onFilter: (value, record) => record.address.startsWith(value),
    // 	filterSearch: (input, record) => record.value.indexOf(input) > -1,
    // 	width: '40%',
    // },
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
    return (
        <div>
            <Head keyValue="1" />

            <div class="app">
                <div class="app-body">
                    <div class="app-body-main-content">
                        <section class="service-section">

                            <div class="infos">
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card>
                                            <Statistic
                                                title="现价"
                                                value={3200}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}

                                            />
                                            <Statistic
                                                value={11.28}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<ArrowUpOutlined />}
                                                suffix="%"
                                            />
                                            <Statistic
                                                value={11.28}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<ArrowUpOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <Statistic
                                                title="涨停限制"
                                                value={3200}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}

                                            />
                                            <Statistic
                                                value={11.28}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<ArrowUpOutlined />}
                                                suffix="%"
                                            />
                                            <Statistic
                                                value={11.28}
                                                precision={2}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<ArrowUpOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <Statistic
                                                title="跌停限制"
                                                value={3200}
                                                precision={2}
                                                valueStyle={{ color: '#cf1322' }}

                                            />
                                            <Statistic
                                                value={11.28}
                                                precision={2}
                                                valueStyle={{ color: '#cf1322' }}
                                                prefix={<ArrowDownOutlined />}
                                                suffix="%"
                                            />
                                            <Statistic
                                                value={11.28}
                                                precision={2}
                                                valueStyle={{ color: '#cf1322' }}
                                                prefix={<ArrowDownOutlined />}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>

                        </section>
                        <section class="info-section">
                            <div class='stock-info'>
                                <Descriptions
                                    bordered
                                    column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3, xm: 3 }}
                                >
                                    <Descriptions.Item label="今低">00.00</Descriptions.Item>
                                    <Descriptions.Item label="周低">Prepaid</Descriptions.Item>
                                    <Descriptions.Item label="月低">18:00:00</Descriptions.Item>
                                    <Descriptions.Item label="今高">$80.00</Descriptions.Item>
                                    <Descriptions.Item label="周高">$20.00</Descriptions.Item>
                                    <Descriptions.Item label="月高">$60.00</Descriptions.Item>


                                </Descriptions>
                            </div>
                        </section>

                        <section class="stock-section">
                            <div class="stock">
                                <Table columns={own_columns} dataSource={own} onChange={onChange} pagination={{ pageSize: 3 }} />
                            </div>
                        </section>



                    </div>

                    <div class="functions">
                        <div class="search-section">
                            <Input.Group compact>
                                <Select defaultValue="buy" style={{ width: '20%' }}>
                                    <Option value="buy">买</Option>
                                    <Option value="sell">卖</Option>
                                </Select>
                                <AutoComplete
                                    style={{ width: '80%' }}
                                    placeholder="请输入代码"
                                    options={[{ value: '000100' }, { value: '600100' }]}
                                />
                            </Input.Group>
                            <br />
                            <Input.Group compact>
                                <Input style={{ width: '20%' }} defaultValue="价格" disabled />
                                {/* min和max为跌停和涨停板价格，需计算 */}
                                <InputNumber defaultValue={10.00} style={{ width: '80%' }} step='0.01' min={0} max={100} />
                            </Input.Group>
                            <br />
                            <Input.Group compact>
                                <Input style={{ width: '20%' }} defaultValue="数量" disabled />
                                <InputNumber defaultValue={100} style={{ width: '80%' }} step='100' min={0} />
                            </Input.Group>
                        </div>
                        <div class="button">
                            <Popover content={content}>
                                <Button type="primary" block="true" onClick={trade}>确认</Button>
                            </Popover>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default TradePage;