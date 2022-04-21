import "./Header.css";
import { Menu } from "antd";

function Header(props) {
  let keyValue = props.keyValue;
  return (
    <div className="header">
      股票交易系统
      <Menu selectedKeys={keyValue} mode="horizontal" theme="dark">
        <Menu.Item key="info">
          <a href="./" target="_self" rel="noopener noreferrer">
            信息中心
          </a>
        </Menu.Item>
        <Menu.Item key="stock">
          <a href="./stock" target="_self" rel="noopener noreferrer">
            证券账户
          </a>
        </Menu.Item>
        <Menu.Item key="money">
          <a href="./money" target="_self" rel="noopener noreferrer">
            资金账户
          </a>
        </Menu.Item>
        <Menu.Item key="trade">
          <a href="./trade" target="_self" rel="noopener noreferrer">
            交易中心
          </a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Header;