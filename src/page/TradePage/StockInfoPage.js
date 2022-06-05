import Head from './Head.js';
import './TradePage.css';
import React, { useState, useRef, useEffect } from 'react';
import { Card, Descriptions, Badge, Table, Tabs, Space, Tag, Statistic, Row, Col, Input, Drawer, ConfigProvider, Button, Modal, Popover, message, Popconfirm } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ReloadOutlined } from '@ant-design/icons';
import { hrHRIntl } from '@ant-design/pro-provider';
import request from "../../utils/request";
import { render } from '@testing-library/react';
import $ from 'jquery'


const { Search } = Input;

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
				if (message1[31] < 0) {
					document.getElementById("SH").innerHTML = message1[3];
					var sh = document.getElementById("SH");
					sh.setAttribute('style', 'color: green;');
				}
				else if(message1[31]>=0){
					document.getElementById("SH").innerHTML = message1[3];	
				}
				
				if(message2[31]<0){
					document.getElementById("SZ").innerHTML = message2[3];
					var sz = document.getElementById("SZ");
					sz.setAttribute('style', 'color: green;');
				}
				else if(message2[31]>=0){
					document.getElementById("SZ").innerHTML = message2[3];
				}
				
				if(message3[31<0]){
					document.getElementById("CY").innerHTML = message3[3];
					var cy = document.getElementById("CY");
					cy.setAttribute('style', 'color: green;');
				}
				else if(message3[31]>0){
					document.getElementById("CY").innerHTML = message3[3];
				}	

				
				
			}

			reader.readAsText(data, 'GBK');
		}
	)

}

//账户信息刷新
class GetInfo extends React.Component {
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
			<div>
				<p className='thisname'><a>上证指数</a></p>
				<p id="SH" className='thisinfo'>0.00</p>
				<p className='thisname'><a>深证成指</a></p>
				<p id="SZ" className='thisinfo'>0.00</p>
				<p className='thisname'><a>创业板指</a></p>
				<p id="CY" className='thisinfo'>0.00</p>
				<br />
			</div>
		)
	}

}


function showStockInfo() {
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
				if (response.code == 1) {
					message.error(response.message);
				}
				else {
					message.success("查询成功");
					var point = (response.data.price).toFixed(2);
					var float = ((response.data.price) - (response.data.start)).toFixed(2);
					var ratio = ((float / response.data.start) * 100).toFixed(2);

					document.getElementById("end").innerHTML = response.data.end;
					document.getElementById("open").innerHTML = response.data.start;
					document.getElementById("Dlow").innerHTML = response.data.Dlow;
					document.getElementById("Dhigh").innerHTML = response.data.Dhigh;
					document.getElementById("Wlow").innerHTML = response.data.Wlow;
					document.getElementById("Whigh").innerHTML = response.data.Whigh;
					document.getElementById("Mlow").innerHTML = response.data.Mlow;
					document.getElementById("Mhigh").innerHTML = response.data.Mhigh;
					document.getElementById("name").innerHTML = response.data.name;
					document.getElementById("volume").innerHTML = response.data.volume;


					if(response.data.state=='T'){
						document.getElementById("state").innerHTML = '正常';
					}
					else {
						document.getElementById("state").innerHTML = '不可交易';
					}

					if(response.data.type=='N'){
						document.getElementById("type").innerHTML = '正常';
					}
					else{
						document.getElementById("type").innerHTML = 'ST';
					}

					if (float < 0) {
						document.getElementById("point").innerHTML = point;
						document.getElementById("float").innerHTML = '-' + float;
						document.getElementById("ratio").innerHTML = '-' + ratio + '%';
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


//跳转外部链接查看公告的函数
function shownotice() {
	var stock_id = document.getElementById("StockID").value;
	if(stock_id.length==6){
		var url= 'https://data.eastmoney.com/notices/stock/'+stock_id+'.html'
		window.open(url)
	}
	
}




//主函数
function TradePage() {


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

						</section>

						<div className='thiscard'>
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
								<Descriptions.Item label="昨收"><a id="end">null</a></Descriptions.Item>
								<Descriptions.Item label="今开"><a id="open">null</a></Descriptions.Item>
								<Descriptions.Item label="成交"><a id="volume">null</a></Descriptions.Item>
								<Descriptions.Item label="今低"><a id="Dlow">null</a></Descriptions.Item>
								<Descriptions.Item label="周低"><a id="Wlow">null</a></Descriptions.Item>
								<Descriptions.Item label="月低"><a id="Mlow">null</a></Descriptions.Item>
								<Descriptions.Item label="今高"><a id="Dhigh">null</a></Descriptions.Item>
								<Descriptions.Item label="周高"><a id="Whigh">null</a></Descriptions.Item>
								<Descriptions.Item label="月高"><a id="Mhigh">null</a></Descriptions.Item>
								<Descriptions.Item label="类型"><a id="type">null</a></Descriptions.Item>
								<Descriptions.Item label="状态"><a id="state">null</a></Descriptions.Item>
								<Descriptions.Item label="公告" ><a onClick={shownotice} style={{ color: '#1E90FF' }}>点击查看</a></Descriptions.Item>
							</Descriptions>
						</div>
					</div>

					{/* 右侧 */}
					<div class="functions">

						{/* 资金账户 */}
						<div class="money">
							<div className='indexcard'>
								<Card>
									<GetInfo></GetInfo>
								</Card>
							</div>
						</div>








					</div>

				</div>
			</div>
		</div>


	)
}

export default TradePage;