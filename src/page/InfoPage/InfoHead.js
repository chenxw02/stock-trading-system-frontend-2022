import { Menu } from 'antd';
import React from 'react';
import './info_head.css'
import { useNavigate } from "react-router-dom";

function InfoHead(props) {
    const navigate = useNavigate();
    //下面这部分是:每秒执行一次，获得当前时间并且将该事件替换html中id为"datetime"的组件的值
    //不把他写到return里面使得该函数脱离react的自动渲染。
    const ticking = () => {
        document.getElementById('datetime').innerHTML = new Date();
    }
    setInterval(ticking, 1000);
    return (
        <div>
            <div className='info_title'>
                <div className='info_welcome'>Hi,{props.ID}</div>
                {/*<div id="datetime" className="info_datetime">
                    {setInterval("document.getElementById('datetime').innerHTML=new Date();", 1000)}
                </div>*/}
                <div id="datetime" className="info_datetime"></div>
            </div>
            <div className="logo" />
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['item-1']}
                >
                    <Menu.Item onClick={() => {
                        if (props.ID == "游客") {
                            navigate('/');
                        }

                        else
                            window.history.back(-1);
                    }}>返回</Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export { InfoHead };