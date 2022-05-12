import "./LoginPage.css"
import { Input, Button, Radio,Divider, Row, Col, Carousel, Image} from 'antd';
import {
    UserOutlined,
    LockOutlined
  } from "@ant-design/icons";
import { useState} from "react";

const options = [
    { label: '普通用户', value: '普通用户'},
    { label: '账户管理员', value: '账户管理员' },
    { label: '股票管理员', value: '股票管理员' },
  ];


function LoginPage() {
    const [identity, setIdentity] = useState("普通用户");
    const contentStyle = {
        height: '400px',
        color: '#fff',
        lineHeight: '360px',
        textAlign: 'center',
        background: '#364d79',
      };

    return(
        <div className="login_background">
            <Row>
                <Col span={14}>
                    <Carousel className="login_carousel">
                        <div>
                            <h1 style={contentStyle}>股票交易系统</h1>
                        </div>
                        <div>
                            <h3 style={contentStyle}>A1 证券帐户业务</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>A2 资金帐户业务</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>A3 交易客户端</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>A4 中央交易系统业务</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>A5 交易系统管理业务</h3>
                        </div>  
                    </Carousel>
                </Col>
                <Col span={1}>
                    <Divider type="vertical" className="login_divider" />
                </Col>
                <Col span={9}>
                    <div className="login_border">
                        <Input
                            className="login_inputbox_user"
                            placeholder="用户名"
                            prefix={<UserOutlined />}
                        />
                        <Input.Password
                            className="login_inputbox_pwd"
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
                </Col> 
            </Row>  
        </div>
        
    )
}

export default LoginPage;