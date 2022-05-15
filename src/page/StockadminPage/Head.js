import {Menu,Button} from 'antd';
import {Link} from 'react-router-dom'
import React from 'react';
import './Head.css'
function Head() {
    return(

        <div>
        <div className='title'>
        <div className='admin_welcome'>Hi,Admin</div>

        <div id="datetime" className="admin_datetime">  
            {setInterval("document.getElementById('datetime').innerHTML=new Date();", 1000)}  
        </div>
        <div className='admin_button_box'>
           <Button type="primary" danger className="admin_button"
                onClick={()=>{
                    window.location.href="./";
                }}
            >退出登录</Button>
        </div>
        
        </div>
     <div className="logo" />
     <div>
     <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['item-2']}

  >
       <Menu.Item key="1">
     <Link to="/stockadmin">首页</Link>
     </Menu.Item>
     <Menu.Item key="2">
     <Link to="/stock">证券账户</Link>
     </Menu.Item>
     <Menu.Item key="3">
     <Link to="/money">资金账户</Link>
     </Menu.Item>
      </Menu>
  </div>
        </div>
    )
}


export default Head;