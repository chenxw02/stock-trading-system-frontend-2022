# 股票交易系统前端

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 环境配置

安装一个比较新的 nodejs 和 npm，Linux/WSL 可以参考[如何在 Ubuntu 20.04 上安装 Node.js 和 npm - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/140961618)。但是不要直接使用 apt install，apt 中的版本非常古老，参考文章中的从 NVM 安装。

Windows 安装方法自行上网搜索。或者从微软商店安装一个 WSL，开始你的 Linux 之旅（x），后续数据库课 MiniSQL 也对此有要求。

### 依赖

除 react 基本包以外，你还需要 react-router-dom 和 antd，在项目根目录运行如下命令：

```shell
npm add react-router-dom
npm add antd
npm  install @ant-design/pro-table
```

依赖配置完毕后，在根目录运行`npm start`，访问 localhost:3000 即可。
