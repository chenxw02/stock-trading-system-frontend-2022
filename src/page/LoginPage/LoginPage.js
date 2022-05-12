import "./LoginPage.css"
import { Input, Button, Radio} from 'antd';
import {
    UserOutlined,
    LockOutlined
  } from "@ant-design/icons";
import { useState} from "react";

const options = [
    { label: '普通用户', value: '普通用户' },
    { label: '账户管理员', value: '账户管理员' },
    { label: '股票管理员', value: '股票管理员' },
  ];


function LoginPage() {
    const [identity, setIdentity] = useState("普通用户");

    return(
        <div className="login_warning">
            我先随手糊了一个方便大家开发，之后再美化（X）一下这玩意儿<br />
            暂时不需要输入用户名和密码登录
            <div className="login_border">
                <Input
                    className="login_inputbox"
                    placeholder="用户名"
                    prefix={<UserOutlined />}
                />
                <Input.Password
                    className="login_inputbox"
                    placeholder="密码"
                    prefix={<LockOutlined />}
                />
                <Radio.Group 
                    buttonStyle="solid"
                    size="large"
                    options={options}
                    onChange = {(event) => { setIdentity(event.target.value) }}
                    value={identity}
                    optionType="button"
                    className="login_group"
                />
                <div />
                <Button  type="primary" className="login_button"
                    onClick={()=>{
                        switch(identity){
                            case "普通用户":
                                window.location.href="./trade";
                                break;
                            case "账户管理员":
                                window.location.href="./money";
                                break;
                            case "股票管理员":
                                window.location.href="./admin";
                                break;
                        }
                    }}
                > 登录</Button>
                <Button  type="primary" className="login_button"
                    onClick={()=>{window.location.href="./info";}}
                > 游客访问</Button>
                
            </div>
        </div>
        
    )
}

export default LoginPage;