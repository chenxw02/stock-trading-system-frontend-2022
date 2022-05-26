import Header from "../../component/Header/Header";
import { InfoHead, user } from './InfoHead.js';
import { Input, Button, Menu,  Row, Col,  Image } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";

/*待完成组件*/
function QueryTable() {
    return (
        <div>
            <Col push={12}>
                <Image width="600px" height="600px" src={require("./show.png")}/>
                <Image width="200px" height="200px" src={require("./trade.png")}/>
            </Col >
        </div >
    )
}

function Kline() {
    return (
        <Col span={10} push={6}>
            <Image src={require("./Kline.png")}/>
        </Col>
    )
}

/*登陆页面*/
function InfoPage() {
    return (
        <div>
            <Header keyValue="info" />
            <Input
                className="login_inputbox_user"
                placeholder="账户"
                prefix={<UserOutlined />}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="密码"
                prefix={<LockOutlined />}
            />
            <Button type="primary" size="large" className="login_button"
                onClick={() => { window.location.href = "./querylogin"; }}
            > 登录</Button>
            <Button type="primary" size="large" className="login_button"
                onClick={() => { window.location.href = "./register"; }}
            > 注册</Button>
        </div>
    )
}

/*初始查询页面*/
function QueryLogin() {
    return (
        <div>
            <InfoHead/>
            {/*导航栏*/}          
            <Row>
                <Col span={3}>
                    <Menu>
                        <Menu.SubMenu title="用户信息">
                            <Menu.Item>当前账户：{user.name}</Menu.Item>
                            <Menu.Item>权限：{user.authority}</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item onClick={() => { window.location.href = "./upgrade"; }}>账户升级</Menu.Item>
                        <Menu.Item onClick={() => { window.location.href = "./change"; }}>修改密码</Menu.Item>
                        <Menu.Item onClick={() => { window.location.href = "./info"; }}>退出登录</Menu.Item>
                    </Menu>;
                </Col>
            </Row>
            <Row>
                <Col span={15} push={3}>
                    <Input placeholder="请输入股票代码或股票名称" />
                </Col>
                <Col push={4}>
                    <Button type="primary" size="primary"
                        onClick={() => { window.location.href = "./queryresult"; }}
                    >查询</Button>
                </Col>
            </Row>
        </div>
    )
}
/*查询结果*/
function QueryResult(){
    return (
        <div>
            <InfoHead keyValue="1" />
            {/*导航栏*/}
            <div>
                <Row>
                    <Col span={3}>
                        <Menu>
                            <Menu.SubMenu title="用户信息">
                                <Menu.Item>当前账户：{user.name}</Menu.Item>
                                <Menu.Item>权限：{user.authority}</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item onClick={() => {
                                window.location.href = "./upgrade";
                            }}>账户升级</Menu.Item>
                            <Menu.Item onClick={() => { window.location.href = "./change"; }}>修改密码</Menu.Item>
                            <Menu.Item onClick={() => { window.location.href = "./info"; }}>退出登录</Menu.Item>
                        </Menu>;
                    </Col>
                    <Col span={15}>
                        <Input size = "large" placeholder="请输入股票代码或股票名称" />
                    </Col>
                    <Col>
                        <Button type="primary" size="large"
                            onClick={() => { window.location.href = "./queryresult"; }}
                        >查询</Button>
                    </Col>
                    <Col push={1}>
                        <Button type="primary" size="large"
                            onClick={() => { window.location.href = "./highqueryresult"; }}
                        >高级信息</Button>
                    </Col>
                    {/*股票信息组件*/}
                    <QueryTable></QueryTable>
                    
                </Row>
            </div>
        </div>

    )
}

/*高级查询界面*/
function HighQueryResult() {
    return (
        <div>
            <InfoHead />
            <div>
                <Row>
                    <Col span={3}>
                        <Menu>
                            <Menu.SubMenu title="用户信息">
                                <Menu.Item>当前账户：{user.name}</Menu.Item>
                                <Menu.Item>权限：{user.authority}</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item onClick={() => { window.location.href = "./upgrade"; }}>账户升级</Menu.Item>
                            <Menu.Item onClick={() => { window.location.href = "./change"; }}>修改密码</Menu.Item>
                            <Menu.Item onClick={() => { window.location.href = "./info"; }}>退出登录</Menu.Item>
                        </Menu>;
                    </Col>
                    <Col span={15}>
                        <Input size="large" placeholder="请输入股票代码或股票名称" />
                    </Col>
                    <Col>
                        <Button type="primary" size="large"
                            onClick={() => { window.location.href = "./queryresult"; }}
                        >查询</Button>
                    </Col>
                    {/*高级查询组件*/}
                    <Kline></Kline>

                </Row>
            </div>
        </div>

    )
}

/*账户注册界面*/
function Register() {
    return (
        <div>
            <InfoHead/>
            <Input
                className="login_inputbox_user"
                placeholder="账户"
                prefix={<UserOutlined />}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="密码"
                prefix={<LockOutlined />}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="确认密码"
                prefix={<LockOutlined />}
            />
            <Button type="primary" size="large" className="login_button"
            > 注册账户</Button>
            <Button type="primary" size="large" className="login_button"
                onClick={() => { window.location.href = "./info"; }}
            > 返回</Button>
        </div>
    )
}
/*账户升级界面*/
function Upgrade() {
    return (
        <div>
            <InfoHead/>
            <Input
                className="login_inputbox_user"
                placeholder="账户"
                prefix={<UserOutlined />}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="密码"
                prefix={<LockOutlined />}
            />
            <Input
                className="login_inputbox_pwd"
                placeholder="电话"
            />
            <Input
                className="login_inputbox_pwd"
                placeholder="支付额"
            />
            
            
            <Button type="primary" size="large" className="login_button"
                onClick={() => { window.location.href = "./querylogin"; }}
            > 升级账户</Button>
            <Button type="primary" size="large" className="login_button"
                onClick={() => { window.location.href = "./querylogin"; }}
            > 返回</Button>
        </div>
    )
}
/*修改密码界面*/
function Change() {
    return (
        <div>
            <InfoHead/>
            <Input
                className="login_inputbox_user"
                placeholder="账户"
                prefix={<UserOutlined />}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="密码"
                prefix={<LockOutlined />}
            />
            <Input.Password
                className="login_inputbox_pwd"
                placeholder="新密码"
                prefix={<LockOutlined />}
            />
            <Button type="primary" size="large" className="login_button"
                onClick={() => { window.location.href = "./info"; }}
            > 确认</Button>
            <Button type="primary" size="large" className="login_button"
                onClick={() => { window.location.href = "./QueryLogin"; }}
            > 返回</Button>
        </div>
    )
}

export { InfoPage, QueryLogin, Register, QueryResult, Upgrade, Change, HighQueryResult};