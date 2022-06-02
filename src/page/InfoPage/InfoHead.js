import { Menu } from 'antd';
import React from 'react';
import './info_head.css'
import { useNavigate } from "react-router-dom";

function InfoHead(props) {
    const navigate = useNavigate();
    return (
        <div>
            <div className='Stockadmin_title'>
                <div className='Stockadmin_welcome'>Hi,{props.ID}</div>
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
                    <Menu.Item onClick={() => {
                        if (props.ID == "游客") {
                            /*alert("!");*/
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