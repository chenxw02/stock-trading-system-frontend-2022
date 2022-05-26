import {Menu,Button} from 'antd';
import React from 'react';
import './info_head.css'
const name = ['00001', '00002'];
const authority = ['用户', '高级用户'];
const i = 1;
const user = {
    name: name[i],
    authority: authority[i]
}
function InfoHead() {
    return (
        <div>
            <div className='Stockadmin_title'>
                <div className='Stockadmin_welcome'>Hi,{user.authority+user.name}</div>

                <div id="datetime" className="Stockadmin_datetime">
                    {setInterval("document.getElementById('datetime').innerHTML=new Date();", 1000)}
                </div>

            </div>
            <div className="logo" />
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['item-1']}
                >
                    <Menu.Item onClick={() => { window.history.back(-1); }}>返回</Menu.Item>
                </Menu>
            </div>
        </div>
    )
}


export { InfoHead, user };