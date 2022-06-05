import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom'
import React from 'react';

function Head() {
    return (

        <div>

            <div className="logo" />
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['item-1']}

                >
                    <Menu.Item key="1">
                        <Link to="/stockinfopage">信息中心</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/trade">个人中心</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/tradecenter">交易中心</Link>
                    </Menu.Item>
                    
                </Menu>
            </div>
        </div>
    )
}


export default Head;