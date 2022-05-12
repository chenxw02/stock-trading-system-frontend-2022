import './AdminPage.css';
import { Table, Button, Space } from 'antd';
const { Column } = Table;

const data = [
    {
        id : '00000',
        name : '垃圾css有限公司',
        price: 10,
        number: 20098,
    },
    {
        id : '00001',
        name : '垃圾unity有限公司',
        price: 5,
        number: 12742,
    },
    {
        id : '00002',
        name : '垃圾vtk有限公司',
        price: 2,
        number: 109832,
    },
]

const columns = [
    {
        title:"股票编号",
        dataIndex:"id",
        defaultSortOrder:"descend", 
        sorter:"(a, b) => a.id - b.id",
    },
    {
        title:"股票名称",
        dataIndex:"name",
        defaultSortOrder:"descend",
        sorter:"(a, b) => a.name - b.name",
    },
    {
        title:"股票信息",
        children:[
            {
                title:"最新成交价格",
                dataIndex:"price",
                defaultSortOrder:"descend",
                sorter:"(a, b) => a.price - b.price",
            },
            {
                title:"最新成交数量",
                dataIndex:"number",
                defaultSortOrder:"descend",
                sorter:"(a, b) => a.number - b.number",
            },
        ]
    },
    {
        title:"Action",
        key:"action",
        render:() => (
            <Space size="middle">
            <a>详情</a>
            </Space>
        )
    },
  ];

function AdminPage() {
    return(
        <div className='admin_background'>

        <div className='admin_header'>
            <div className='admin_welcome'>Hi,Admin</div>

            <div id="datetime" className="admin_datetime">  
                {setInterval("document.getElementById('datetime').innerHTML=new Date().toLocaleString();", 1000)}  
            </div>

            <div className='admin_button_box'>
               <Button type="primary" danger className="admin_button"
                    onClick={()=>{
                        window.location.href="./";
                    }}
                >退出登录</Button>
                <Button type="primary" className="admin_button">修改密码</Button> 
            </div>
            
        </div>

        <div className='admin_table_back'>
           <Table columns={columns} dataSource={data} className="admin_table" /> 
        </div>
        
        
        </div>
        
    )
}

export default AdminPage;