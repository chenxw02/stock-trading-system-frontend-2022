import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom'
import React from 'react';
import './Head.css'
function Head() {
    return (

        <div>
            <div className='Stockadmin_title'>
                <div className='Stockadmin_welcome'>股票交易客户端</div>

                <div id="datetime" className="Stockadmin_datetime">
                    {setInterval("document.getElementById('datetime').innerHTML=new Date();", 1000)}
                </div>
                <div className='Stockadmin_button_box'>
                    <Button type="primary" danger className="Stockadmin_button"
                        onClick={() => {
                            window.location.href = "./";
                        }}
                    >退出登录</Button>
                </div>
                <hr size="5"/>
            </div>

            <div className="logo" />
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['item-1']}

                >
                    <Menu.Item key="1">
                        <Link to="/trade">行情中心</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/tradecenter">交易中心</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/test">测试</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}


export default Head;