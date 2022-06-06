import Head from './Head.js';
import './TradePage.css';
import React, { useState, useEffect } from 'react';
import { Card, Table, Radio, Divider, Input, Drawer, Button, Modal, Popover, message } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import request from "../../utils/request";


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

			document.getElementById("asset").innerHTML = "资产：" + response.data.balance.toFixed(2);
			document.getElementById("frozen").innerHTML = "冻结：" + response.data.frozen.toFixed(2);
			document.getElementById("used").innerHTML = "已用：" + response.data.taken.toFixed(2);
			document.getElementById("available").innerHTML = "可用：" + num.toFixed(2);

		})
}


const control = (
	<div>
		<p>点击进入控制面板</p>
	</div>
)


//完整版交易记录
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
		title: '盈亏金额',
		dataIndex: 'gnl',

	},
	{
		title: '盈亏比例',
		dataIndex: 'gnlratio',

	},
	{
		title: '总市值',
		dataIndex: 'amount',

	},
];

const instruction_columns = [
	{
		title: '方向',
		dataIndex: 'flag',
		key: 'flag',
	},
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
		title: '成交价格/委托均价',
		dataIndex: 'price',
		key: 'price',
	},
	{
		title: '成交数量/委托数量',
		dataIndex: 'number',
		key: 'number',
	},
	{
		title: '状态',
		key: 'tags',
		dataIndex: 'tags',

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
	const handleCancel_xiaohu = () => {
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
	const [instruction, setInstruction] = useState([])
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
						gnlratio: gr.toFixed(2)+'%',
						amount: (response.data[i].own_number * response.data[i].price).toFixed(2),
					};
					list.push(temp);
				}
				setOwn(list);
			})

		request(
			'/instruction/info',
			"GET",
			{
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem("token")
			}).then((response) => {
				console.log('own instruction info', response);
				var list0 = [];
				for (var i = 0; i < response.data.length; i++) {
					var flag = response.data[i].flag;
					var name = response.data[i].name;
					var tprice = response.data[i].tprice.toFixed(2);
					var amount = response.data[i].amount;
					var tnum = response.data[i].tnum;
					var anum = response.data[i].cnum;
					var state = response.state;
					var thistime = String(response.data[i].time);
					var thistprice = String(response.data[i].tprice.toFixed(2));
					var thistnum = String(response.data[i].tnum);
					var thisanum = String(response.data[i].anum);
					if (response.data[i].anum != 0) {
						var thisaprice = String(((response.data[i].amount) / (response.data[i].anum)).toFixed(2))
					}
					else {
						var thisaprice = '0';
					}
					if (response.data[i].state == 'N') {
						var thistag = '未成交'
					}
					else if (response.data[i].state == 'P') {
						var thistag = '部分成交'
					}
					else if (response.data[i].state == 'T') {
						var thistag = '全部成交'
					}
					else if (response.data[i].state == 'E') {
						var thistag = '已作废'
					}

					var price = thisaprice + '/' + thistprice;
					var num = thisanum + '/' + thistnum;

					var timeh = thistime.slice(1, 3);
					var timem = thistime.slice(3, 5);
					var times = thistime.slice(5, 7);
					var mytime = timeh + ':' + timem + ':' + times

					var temp0 = { //一条记录
						key: thistime,
						flag: flag,
						name: name,
						time: mytime,
						price: price,
						number: num,
						tags: thistag,
					};
					list0.push(temp0);
				}

				setInstruction(list0);

			})
	}, []);

	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [loading, setLoading] = useState(false);

	const start = () => {
		setLoading(true); // ajax request after empty completing

		setTimeout(() => {
			setSelectedRowKeys([]);
			setLoading(false);
		}, 1000);

		var keys = String(selectedRowKeys)
		request(
			'/withdraw',
			"POST",
			{
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem("token")
			}, { "keys": keys }).then((response) => {
				console.log(response);
				if (response.code == 0) {
					message.success("撤单成功");
				}
				else {
					message.error(response.message);
				}
			})


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
						</section>

						{/* 股票持仓区 */}
						<section class="stock-section">
							{/* 股票持仓 */}
							<div class="stock">
								<h3>账户信息</h3><Divider />
								<Table columns={own_columns} dataSource={own} pagination={false} showSorterTooltip={false} />

							</div>
							<br />

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
											marginLeft: 15,
										}}
									>
										{hasSelected ? `已选中 ${selectedRowKeys.length} 条记录` : ''}
									</span>
								</div>
								<Table rowSelection={rowSelection} columns={instruction_columns} dataSource={instruction} />
							</div>
						</section>
					</div>

					{/* 右侧 */}
					<div class="functions">

						{/* 资金账户 */}
						<div class="money">
							<Card title="人民币A股账户" bordered={false} style={{ width: 300 }}>
								<Popover placement="topLeft" content={control}><a onClick={showDrawer}><p style={{ color: '#1E90FF' }}>控制面板</p></a></Popover>
								<div>
									<ShowFundInfo></ShowFundInfo>
									<p id="asset">资产：</p>
									<p id="used">已用：</p>
									<p id="available">可用：</p>
									<p id="frozen">冻结：</p>
								</div>
							</Card>
						</div>


						<div>
							<>
								<Modal title="修改密码" visible={isModalVisible === 3} onCancel={handleCancel} width={500} destroyOnClose={true} keyboard={true} onOk={handelok_changepass} okText="确认"
									cancelText="取消">
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

								<Modal title="销户资金账户" width={500} visible={isModalVisible === 6} onOk={handleOk_xiaohu} onCancel={handleCancel_xiaohu} destroyOnClose={true} keyboard={true} okText="确认"
									cancelText="取消">
									<Radio.Group onChange={onChange_money_account_xiaohu} >
										<Radio value={0}>法人账户</Radio>
										<Radio value={1}>个人账户</Radio>
									</Radio.Group>
									<Input placeholder="个人用户身份证号或法人注册登记号" prefix={<UserOutlined />} maxLength={18}
										onChange={(event) => {
											setid_num_legal_register_num(event.target.value);
										}} style={{marginTop:15}}/>
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
									<Button type="primary" danger onClick={() => {
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