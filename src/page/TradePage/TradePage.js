import Head from './Head.js';
import './TradePage.css';
import React, { useState, useRef, useEffect } from 'react';
import { Card, Descriptions, Badge, Table, Radio,Tabs, Space, Tag, Statistic, Row, Col, Input, Drawer, ConfigProvider, Button, Modal, Popover, message, Popconfirm } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ReloadOutlined,KeyOutlined,UserOutlined} from '@ant-design/icons';
import { hrHRIntl } from '@ant-design/pro-provider';
import request from "../../utils/request";
import { render } from '@testing-library/react';
import $ from 'jquery'
import SkeletonInput from 'antd/lib/skeleton/Input';

var state = {
    stockID: "",
};

const { Search } = Input;

const pwd_success = () => {
	message.success('修改成功');
};

const pwd_fail1 = () => {
	message.error('原密码输入错误');
};

const pwd_fail2 = () => {
	message.error('新密码不能与原密码相同');
};

var colorSH = "red";
var colorSZ = "red";
var colorCY = "red";
var arrowSH = <ArrowUpOutlined />
var arrowSZ = <ArrowUpOutlined />
var arrowCY = <ArrowUpOutlined />
var SH1, SH2, SH3;
var SZ1, SZ2, SZ3;
var CY1, CY2, CY3;

//获取实时信息
async function getInfo() {

	fetch("http://qt.gtimg.cn/q=sh000001,sz399001,sz399006", {
	}).then(
		res => res.blob()
	).then(
		(data) => {
			let reader = new FileReader();

			reader.onload = () => {
				var text = reader.result;
				var stock = text.split(';');
				var message1 = stock[0].split('~');
				var message2 = stock[1].split('~');
				var message3 = stock[2].split('~');
				setSH(message1[3], message1[31], message1[32]);
				setSZ(message2[3], message2[31], message2[32]);
				setCY(message3[3], message3[31], message3[32]);
			}

			reader.readAsText(data, 'GBK');
		}
	)

}

function setSH(point, float, ratio) {
	$.ajax({
		async: false,
		success: function () {
			if (float < 0) {
				colorSH = "green";
				arrowSH = <ArrowDownOutlined />;
			}
			SH1 = point;
			SH2 = float;
			SH3 = ratio;
		}
	})
}

function setSZ(point, float, ratio) {
	$.ajax({
		async: false,
		success: function () {
			if (float < 0) {
				colorSZ = "green";
				arrowSZ = <ArrowDownOutlined />;
			}
			SZ1 = point;
			SZ2 = float;
			SZ3 = ratio;
		}
	})
}

function setCY(point, float, ratio) {
	$.ajax({
		async: false,
		success: function () {
			if (float < 0) {
				colorCY = "green";
				arrowCY = <ArrowDownOutlined />;
			}
			CY1 = point;
			CY2 = float;
			CY3 = ratio;
		}
	})
}

class Info extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() { // 生命周期
		this.timerID = setInterval(
			() => {
				getInfo();
				this.forceUpdate();
			},
			1000
		);
	}

	componentWillUnmount() { // 生命周期
		clearInterval(this.timerID);
	}

	render() {
		return (
			<div className="infos">
				<Row gutter={16}>
					<Col span={8}>
						<Card>
							<Statistic
								title="上证指数"
								value={SH1}
								precision={2}
								valueStyle={{ color: colorSH }}

							/>
							<Statistic
								value={SH2}
								precision={2}
								valueStyle={{ color: colorSH }}
								prefix={arrowSH}

							/>
							<Statistic
								value={SH3}
								precision={2}
								valueStyle={{ color: colorSH }}
								prefix={arrowSH}
								suffix="%"
							/>
						</Card>
					</Col>
					<Col span={8}>
						<Card>
							<Statistic
								title="深圳成指"
								value={SZ1}
								precision={2}
								valueStyle={{ color: colorSZ }}

							/>
							<Statistic
								value={SZ2}
								precision={2}
								valueStyle={{ color: colorSZ }}
								prefix={arrowSZ}
							/>
							<Statistic
								value={SZ3}
								precision={2}
								valueStyle={{ color: colorSZ }}
								prefix={arrowSZ}
								suffix="%"
							/>
						</Card>
					</Col>
					<Col span={8}>
						<Card>
							<Statistic
								title="创业板指"
								value={CY1}
								precision={2}
								valueStyle={{ color: colorCY }}
							/>
							<Statistic
								value={CY2}
								precision={2}
								valueStyle={{ color: colorCY }}
								prefix={arrowCY}
							/>
							<Statistic
								value={CY3}
								precision={2}
								valueStyle={{ color: colorCY }}
								prefix={arrowCY}
								suffix="%"
							/>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

//显示资金账户信息
function ShowFundInfo() {
	request(
		'/fund/info',
		"GET",
		{
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem("token")
		})
		.then((response) => {
			console.log('fund info', response);
			let num = response.data.balance - response.data.frozen - response.data.taken;

			document.getElementById("asset").innerHTML = "资产：" + response.data.balance;
			document.getElementById("frozen").innerHTML = "冻结：" + response.data.frozen;
			document.getElementById("used").innerHTML = "已用：" + response.data.taken;
			document.getElementById("available").innerHTML = "可用：" + num;

			//点击查看更多信息后显示的部分
			document.getElementById("fund_acc").innerHTML = "资金账号：" + response.data.fund_account_number;
			document.getElementById("asset2").innerHTML = "资产：" + response.data.balance;
			document.getElementById("frozen2").innerHTML = "冻结：" + response.data.frozen;
			document.getElementById("used2").innerHTML = "已用：" + response.data.taken;
			document.getElementById("available2").innerHTML = "可用：" + num;
			document.getElementById("position").innerHTML = "仓位：" + (response.data.taken * 100 / response.data.balance) + "%";
			document.getElementById("take").innerHTML = "可取：" + (num - response.data.sellamount);
		})
}

//账户信息刷新
class FundInfo extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() { // 生命周期
		this.timerID = setInterval(
			() => {
				ShowFundInfo();
				this.forceUpdate();
			},
			10000000
		);
	}

	componentWillUnmount() { // 生命周期
		clearInterval(this.timerID);
	}

	render() {
		return (
			<div>
				<p id="asset">资产：</p>
				<p id="used">已用：</p>
				<p id="available">可用：</p>
				<p id="frozen">冻结：</p>
			</div>
		)


	}

}




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

const control = (
	<div>
		<p>点击进入控制面板</p>
	</div>
)


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

//表格排序函数
function onChange(pagination, filters, sorter, extra) {
	console.log('params', pagination, filters, sorter, extra);
}

//简版交易记录信息表格体
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

//完整版交易记录
const withdraw_columns_full = [
	{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '委托时间',
		dataIndex: 'time',
		key: 'time',
	},
	{
		title: '成交数量/委托数量',
		dataIndex: 'number',
		key: 'number',
	},
	{
		title: '成交价格/委托均价',
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
					var color;
					if (tag === 'expired') {
						color = 'volcano';
					}
					else if (tag === 'all') {
						color = 'green'
					}
					else if (tag === 'partial') {
						color = 'geekblue'
					}
					else if (tag == 'none') {
						color = 'grey'
					}
					else if (tag == 'withdrawed') {
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
		key: '2',
		name: '贵州茅台',
		time: "18:00:00",
		number: "200/100",
		price: "1970.00/1970.00",
		tags: ['expired'],
	},
	{
		key: '3',
		name: '贵州茅台',
		time: "18:00:00",
		number: "200/100",
		price: "1970.00/1970.00",
		tags: ['partial'],
	},
];


//主函数
function TradePage() {
	const [fund_account_number, setfund_account_number] = useState("");//A1组进行修改
	const [id_num_legal_register_num, setid_num_legal_register_num] = useState("");//A1组进行修改
	const [value_password, setValue_password] = useState(false);//A1组进行修改
	const [oldpass, setoldpass] = useState("");//A1组进行修改
	const [newpass, setnewpass] = useState("");//A1组进行修改
	const onChange_password = (e) => {//A1组进行修改
	  setValue_password(e.target.value);
	};
	const xiaohu = () => {
		setIsModalVisible(6);
	};
	const handleCancel_xiaohu=()=>{
		setIsModalVisible(false);
	};
	const handelok_changepass = () => {
		request('/account_admin/fund_change_password', "POST", { 'Content-Type': 'application/json' },
		  {
			"trade_withdraw": value_password,
			"fund_account_number": fund_account_number,
			"old_password": oldpass,
			"new_password": newpass
		  }).then((response) => {
			console.log(response);
			if (response.code === '0') {
			  alert("操作成功！");
			}
			else {
			  alert(response.message);
			}
			setIsModalVisible(false);
		  });
	  }//A1组进行修改
	  const [value_money_account_xiaohu, setValue_money_account_xiaohu] = useState(0);
	  const onChange_money_account_xiaohu = (e) => {
		console.log(e.target.value);
		setValue_money_account_xiaohu(e.target.value);
	  };//A1组进行修改
	  const handleOk_xiaohu = () => {
		request('/account_admin/add_new_deal', "POST", { 'Content-Type': 'application/json' },
      {
        "id_num/legal_register_num": id_num_legal_register_num,
        "security_num": fund_account_number,
        "label": value_money_account_xiaohu
      }).then((response) => {
        console.log(response);
        if (response.code === '0') {
          alert("已发送申请！");
        }
        else {
          alert(response.message);
        }
      });
		setIsModalVisible(false);
	  };
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
						price: response.data[i].price,
						num: response.data[i].own_number,
						ava: response.data[i].own_number - response.data[i].frozen,
						gnl: g.toFixed(2),
						gnlratio: gr.toFixed(2),
						amount: response.data[i].own_number * response.data[i].price,
					};
					list.push(temp);
				}
				setOwn(list);
			})
	}, []);

	// const showInfos = () => {
	// 	showStockInfo();
		
		
	// };

	const showStockInfo=()=> {
		setIsModalVisible(1);
		var stock_id = document.getElementById("StockID").value;
		if (1) {
			request(
				'/stock/info',
				"POST",
				{
					'Content-Type': 'application/json',
					'stock_id': stock_id
				})
				.then((response) => {
					console.log('stock info', response);
					if(response.code==1){
						message.error(response.message);
					}
					else{
						message.success("查询成功");
					var name=response.data.name;
					var point = (response.data.price).toFixed(2);
					var float = ((response.data.price) - (response.data.start)).toFixed(2);
					var ratio = ((float / response.data.start)*100).toFixed(2);
					var Dlow = response.data.Dlow;
					var Dhigh = response.data.Dhigh;
	
					document.getElementById("Dlow").innerHTML=Dlow;
					document.getElementById("Dhigh").innerHTML=Dhigh;
					document.getElementById("name").innerHTML=name;
	
					if(float<0){
						document.getElementById("point").innerHTML=point;
						document.getElementById("float").innerHTML='-'+float;
						document.getElementById("ratio").innerHTML='-'+ratio+'%';
						var obj1 = document.getElementById("point");
						obj1.setAttribute('style', 'color: green;');
						var obj2 = document.getElementById("float");
						obj2.setAttribute('style', 'color: green;');
						var obj3 = document.getElementById("ratio");
						obj3.setAttribute('style', 'color: green;');
					}
					else {
						document.getElementById("point").innerHTML=point;
						document.getElementById("float").innerHTML='+'+float;
						document.getElementById("ratio").innerHTML='+'+ratio+'%';
					}
				}
					
	
				})
		}
	
	}


	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [loading, setLoading] = useState(false);

	const start = () => {
		setLoading(true); // ajax request after empty completing

		setTimeout(() => {
			setSelectedRowKeys([]);
			setLoading(false);
		}, 1000);
	};

	const onSelectChange = (newSelectedRowKeys) => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const hasSelected = selectedRowKeys.length > 0;

	//modal设置相关函数
	const [isModalVisible, setIsModalVisible] = useState(false);

	

	const showRecords = () => {
		setIsModalVisible(2);
	};

	const pwdChange = () => {
		setIsModalVisible(3);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const [visible, setVisible] = useState(false);


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
								<Search placeholder="输入股票代码进行查询" allowClear onSearch={showStockInfo} style={{ width: '100%' }} id="StockID"
								/>
							</div>

							{/* 三大指数信息 */}
							<Info></Info>
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
								<Popover placement="topLeft" content={control}><a onClick={showDrawer}><p style={{ color: '#1E90FF' }}>控制面板</p></a></Popover>
								<FundInfo></FundInfo>
							</Card>
						</div>

						{/* 交易记录 */}
						<div class="withdraw">
							<Table columns={withdraw_columns_light} dataSource={withdraw_light} pagination={{ pageSize: 4 }} />
						</div>

						{/* 股票信息modal */}
						<div>
							<>
								<Modal visible={isModalVisible === 1} onCancel={handleCancel} width={1000} footer={null} destroyOnClose={true} keyboard={true}>
									<div>
										<Card>
											<p id="name" className='thisname'><a>无数据</a></p>
											<p id="point" className='thisinfo'>0.00</p>
											<p id="float" className='thisinfo'>0.00</p>
											<p id="ratio" className='thisinfo'>0.00%</p>
										</Card>
									</div>
									<div class="infos">
										<Descriptions
											bordered
											column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3, xm: 3 }}
										>
											<Descriptions.Item label="昨收">$60.00</Descriptions.Item>
											<Descriptions.Item label="今开">$60.00</Descriptions.Item>
											<Descriptions.Item label="成交">$60.00</Descriptions.Item>
											<Descriptions.Item label="今低">00.00</Descriptions.Item>
											<Descriptions.Item label="周低">Prepaid</Descriptions.Item>
											<Descriptions.Item label="月低">18:00:00</Descriptions.Item>
											<Descriptions.Item label="今高">$80.00</Descriptions.Item>
											<Descriptions.Item label="周高">$20.00</Descriptions.Item>
											<Descriptions.Item label="月高">$60.00</Descriptions.Item>
											<Descriptions.Item label="类型">正常</Descriptions.Item>
											<Descriptions.Item label="状态">正常</Descriptions.Item>
											<Descriptions.Item label="公告" ><a onClick={news} style={{ color: '#1E90FF' }}>点击查看</a></Descriptions.Item>
										</Descriptions>
									</div>
								</Modal>
							</>
						</div>

						{/* 交易记录modal */}
						<div>
							<>
								<Modal title="委托记录" visible={isModalVisible === 2} onCancel={handleCancel} width={1000} footer={null} destroyOnClose={true} keyboard={true}>
									{/* <Table columns={withdraw_columns_full} dataSource={withdraw_full} pagination={{ pageSize: 4 }} /> */}
									<div>
										<div
											style={{
												marginBottom: 16,
											}}
										>
											<Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
												撤单
											</Button>
											<span
												style={{
													marginLeft: 8,
												}}
											>
												{hasSelected ? `已选中 ${selectedRowKeys.length} 条记录` : ''}
											</span>
										</div>
										<Table rowSelection={rowSelection} columns={withdraw_columns_full} dataSource={withdraw_full} />
									</div>

								</Modal>
							</>
						</div>
						<div>
							<>
								<Modal title="修改密码" visible={isModalVisible === 3} onCancel={handleCancel} width={500} destroyOnClose={true} keyboard={true} onOk={handelok_changepass}>
								<Radio.Group onChange={onChange_password} >
          <Radio value={0}>资金账户交易密码</Radio>
          <Radio value={1}>资金账户登录密码</Radio>
        </Radio.Group>
        <br />
        <br />
        <Input placeholder="资金账户号码" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setfund_account_number(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="旧密码" prefix={<KeyOutlined />} maxLength={6}
          onChange={(event) => {
            setoldpass(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="新密码" prefix={<KeyOutlined />} maxLength={6}
          onChange={(event) => {
            setnewpass(event.target.value);
          }} />
        <br />
        <br />
								</Modal>
								<Modal title="销户资金账户" width={500} visible={isModalVisible===6} onOk={handleOk_xiaohu} onCancel={handleCancel_xiaohu} destroyOnClose={true} keyboard={true} >
        <Radio.Group onChange={onChange_money_account_xiaohu} >
          <Radio value={0}>法人账户</Radio>
          <Radio value={1}>个人账户</Radio>
        </Radio.Group>
        <Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setid_num_legal_register_num(event.target.value);
          }} />
        <br />
        <br />
        <Input placeholder="证券账户号码" prefix={<UserOutlined />} maxLength={18}
          onChange={(event) => {
            setfund_account_number(event.target.value);
          }} />
        <br />
        <br />
      </Modal>
							</>
						</div>

						<div>
							<Drawer title="控制面板" placement="right" onClose={onClose} visible={visible} width={400}>
								<div class="buttons">
									<Button onClick={pwdChange}>修改密码</Button>
									<Button onClick={xiaohu}>销户账户</Button>
									<Button  type="primary" danger onClick={() => {
										window.location.href = "./";
									}}>退出登录</Button>
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