import Head from './Head.js';
import './TradePage.css';
import React, { useState, useRef} from 'react';
import { Card, Descriptions, Badge, Table, Tabs, Space, Tag, Statistic, Row, Col, Input, Drawer, ConfigProvider, Button, Modal, Popover, message, Popconfirm } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, AudioOutlined } from '@ant-design/icons';
import { hrHRIntl } from '@ant-design/pro-provider';

const { Search } = Input;

var page=4;


//提示窗
const recordsNotice = (
	<div>
		<p>点击查看更多信息</p>
	</div>
);

const withdrawNotice = (
	<div>
		<p>点击发起撤单</p>
	</div>
);

const money_more = (
	<div>
		<p>点击查看更多信息</p>
	</div>
)

function getClientHeight()
{
  var clientHeight=0;
  if(document.body.clientHeight&&document.documentElement.clientHeight)
  {
  var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  else
  {
  var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
  }
  return clientHeight;
}
 



//发起撤单的函数，需要在此进行条件判断
function withdraw(e) {
	console.log(e);
	message.success('Click on Yes');
}

//跳转外部链接查看公告的函数
function news() {

}

const onSearch = value => console.log(value);

//持仓股票：表格体
const own_columns = [
	{
		title: '名称',
		dataIndex: 'name',
		width: '15%',
	},
	{
		title: '成本',
		dataIndex: 'cost',
		sorter: (a, b) => a.cost - b.cost,
	},
	{
		title: '现价',
		dataIndex: 'price',
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: '持仓',
		dataIndex: 'num',
		sorter: (a, b) => a.num - b.num,
	},
	{
		title: '可用',
		dataIndex: 'ava',
		sorter: (a, b) => a.ava - b.ava,
	},
	{
		title: '盈亏金额',
		dataIndex: 'gnl',
		sorter: (a, b) => a.gnl - b.gnl,
	},
	{
		title: '盈亏比例',
		dataIndex: 'gnlratio',
		sorter: (a, b) => a.gnlratio - b.gnlratio,
	},
	{
		title: '总市值',
		dataIndex: 'amount',
		sorter: (a, b) => a.amount - b.amount,
	},
];

//持仓股票：信息，转为mysql
const own = [
	{
		key: '1',
		name: 'John Brown',
		cost: 100,
		price: 100,
		num: 100,
		ava: 100,
		gnl: 100,
		gnlratio: 10,
		amount: 100,
	},
	{
		key: '2',
		name: 'Jim Green',
		cost: 100,
		price: 100,
		num: 100,
		ava: 100,
		gnl: 100,
		gnlratio: 10,
		amount: 100,
	},
	{
		key: '3',
		name: 'hh',
		cost: 100,
		price: 100,
		num: 100,
		ava: 100,
		gnl: 100,
		gnlratio: 10,
		amount: 100,
	},
	{
		key: '4',
		name: 'Jim Red',
		cost: 100,
		price: 100,
		num: 100,
		ava: 100,
		gnl: 100,
		gnlratio: 10,
		amount: 100,
	},
	{
		key: '5',
		name: 'Jim Red',
		cost: 100,
		price: 100,
		num: 100,
		ava: 100,
		gnl: 100,
		gnlratio: 10,
		amount: 100,
	},

];

//表格排序函数
function onChange(pagination, filters, sorter, extra) {
	console.log('params', pagination, filters, sorter, extra);
}

//简版交易记录信息
const withdraw_light = [
	{
		key: '1',
		name: '贵州茅台',
		time: "18:00:00",
		tags: ['all'],
	},
	{
		key: '1',
		name: '贵州茅台',
		time: "18:00:00",
		tags: ['expired'],
	},
	{
		key: '1',
		name: '贵州茅台',
		time: "18:00:00",
		tags: ['partial'],
	},
	{
		key: '1',
		name: '贵州茅台',
		time: "18:00:00",
		tags: ['withdrawed'],
	},
];

//完整版交易记录表格体
const withdraw_columns_full = [
	{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
		render: text => <Popover content={withdrawNotice}><Popconfirm
			title="确认撤单吗？"
			onConfirm={withdraw}
			okText="确认"
			cancelText="取消"
		><a>{text}</a></Popconfirm></Popover>,
	},
	{
		title: '委托时间',
		dataIndex: 'time',
		key: 'time',
	},
	{
		title: '委托数量/成交数量',
		dataIndex: 'number',
		key: 'number',
	},
	{
		title: '委托价格/成交均价',
		dataIndex: 'price',
		key: 'price',
	},
	{
		title: '状态',
		key: 'tags',
		dataIndex: 'tags',
		render: tags => (
			<>
				{tags.map(tag => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'expired') {
						color = 'volcano';
					}
					else if (tag === 'all') {
						color = 'green'
					}
					else if (tag === 'partial') {
						color = 'geekblue'
					}
					else {
						color = 'grey'
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
];

//完整版交易记录表格体
const withdraw_full = [
	{
		key: '1',
		name: '贵州茅台',
		time: "19:00:00",
		number: "200/100",
		price: "1970.00/1970.00",
		tags: ['all'],
	},
	{
		key: '1',
		name: '贵州茅台',
		time: "18:00:00",
		number: "200/100",
		price: "1970.00/1970.00",
		tags: ['expired'],
	},
	{
		key: '1',
		name: '贵州茅台',
		time: "18:00:00",
		number: "200/100",
		price: "1970.00/1970.00",
		tags: ['partial'],
	},
];

//主函数
function TradePage() {

	//modal设置相关函数
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showInfos = () => {
		setIsModalVisible(1);
	};

	const showRecords = () => {
		setIsModalVisible(2);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	//drawer设置相关函数
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	// var res=getClientHeight();
	// if(res>800){
	// 	page=5;
	// }

	//简版交易记录表格体
	const withdraw_columns_light = [
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name',
			render: text => <Popover content={recordsNotice}><a onClick={showRecords}>{text}</a></Popover>,
		},
		{
			title: '委托时间',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: '状态',
			key: 'tags',
			dataIndex: 'tags',
			render: tags => (
				<>
					{tags.map(tag => {
						let color;
						if (tag === 'expired') {
							color = 'volcano';
						}
						else if (tag === 'all') {
							color = 'green'
						}
						else if (tag === 'partial') {
							color = 'geekblue'
						}
						else {
							color = 'grey'
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
	];

	//渲染部分
	return (
		<div>
			<Head keyValue="1" />

			<div class="app">
				<div class="app-body">

					{/* 左侧 */}
					<div class="app-body-main-content">

						{/* 基础信息区 */}
						<section class="service-section">

							{/* 搜索框 */}
							<div class="search-section">
								<Search placeholder="输入股票代码进行查询" allowClear onSearch={showInfos} />
							</div>

							{/* 三大指数信息 */}
							<div className="infos">
								<Row gutter={16}>
									<Col span={8}>
										<Card>
											<Statistic
												title="上证指数"
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
												title="上证指数"
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
												title="上证指数"
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

						{/* 股票持仓区 */}
						<section class="stock-section">

							{/* 股票持仓 */}
							<div class="stock">
								<Table columns={own_columns} dataSource={own} onChange={onChange} pagination={{ pageSize: 4 }} showSorterTooltip={false} />
							</div>
						</section>
					</div>

					{/* 右侧 */}
					<div class="functions">

						{/* 资金账户 */}
						<div class="money">
							<Card title="人民币A股账户" bordered={false} style={{ width: 300 }}>
								<Popover placement="topLeft" content={money_more}><a onClick={showDrawer}><p>账户信息</p></a></Popover>
								<p>资产：100</p>
								<p>已用：100</p>
								<p>可用：100</p>
								<p>冻结：0</p>
							</Card>
						</div>

						{/* 交易记录 */}
						<div class="withdraw">
							<Table columns={withdraw_columns_light} dataSource={withdraw_light} pagination={{ pageSize: 4 }} />;
						</div>

						{/* 股票信息modal */}
						<div>
							<>
								<Modal title="贵州茅台 600519" visible={isModalVisible === 1} onCancel={handleCancel} width={1000} footer={null} destroyOnClose={true} keyboard={true}>
									<div>
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
									<div class="infos">
										<Descriptions
											bordered
											column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3, xm: 3 }}
										>
											<Descriptions.Item label="昨收">$60.00</Descriptions.Item>
											<Descriptions.Item label="今开">$60.00</Descriptions.Item>
											<Descriptions.Item label="成交">$60.00</Descriptions.Item>
											<Descriptions.Item label="股本">$80.00</Descriptions.Item>
											<Descriptions.Item label="市值">$20.00</Descriptions.Item>
											<Descriptions.Item label="公告"><a onClick={news}>点击查看</a></Descriptions.Item>
											<Descriptions.Item label="今低">00.00</Descriptions.Item>
											<Descriptions.Item label="周低">Prepaid</Descriptions.Item>
											<Descriptions.Item label="月低">18:00:00</Descriptions.Item>
											<Descriptions.Item label="今高">$80.00</Descriptions.Item>
											<Descriptions.Item label="周高">$20.00</Descriptions.Item>
											<Descriptions.Item label="月高">$60.00</Descriptions.Item>
										</Descriptions>
									</div>
								</Modal>
							</>
						</div>

						{/* 交易记录modal */}
						<div>
							<>
								<Modal title="委托记录" visible={isModalVisible === 2} onCancel={handleCancel} width={1000} footer={null} destroyOnClose={true} keyboard={true}>
									<Table columns={withdraw_columns_full} dataSource={withdraw_full} pagination={{ pageSize: 4 }} />
								</Modal>
							</>
						</div>

						<div>
							<Drawer title="账户信息" placement="right" onClose={onClose} visible={visible} width={400}>
								<p>资金账号：</p>
								<p>资产：</p>
								<p>可用：</p>
								<p>可取：</p>
								<p>已用：</p>
								<p>仓位：</p>
								<p>冻结：</p>
								<div class="buttons">
								<Button>转账</Button>
								<Button>查询</Button>
								<Button>销户</Button>
								</div>
							</Drawer>
						</div>

					</div>

				</div>
			</div>
		</div>


	)
}

export default TradePage;