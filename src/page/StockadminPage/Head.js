import {Menu,Button} from 'antd';
import {Link} from 'react-router-dom'
import React from 'react';
import './Head.css'
function Head() {
    return(

        <div>
        <div className='Stockadmin_title'>
        <div className='Stockadmin_welcome'>Hi,Admin</div>

        <div id="datetime" className="Stockadmin_datetime">  
            {setInterval("document.getElementById('datetime').innerHTML=new Date();", 1000)}  
        </div>
        <div className='Stockadmin_button_box'>
           <Button type="primary" danger className="Stockadmin_button"
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
    defaultSelectedKeys={['item-1']}

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