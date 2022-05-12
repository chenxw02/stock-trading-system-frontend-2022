import './AdminPage.css';
import { Table, Button, Space } from 'antd';
const { Column } = Table;

const data = [
    {
        id : '00000',
        name : '垃圾css有限公司',
        info: "null"
    },
    {
        id : '00001',
        name : '垃圾unity有限公司',
        info: "null"
    },
    {
        id : '00002',
        name : '垃圾vtk有限公司',
        info: "null"
    },
]

function AdminPage() {
    return(
        <div className='admin_background'>

        <div className='admin_header'>
            Hi,Admin
            <Button type="primary" danger className="admin_button"
                onClick={()=>{
                    window.location.href="./";
                }}
            >退出登录</Button>
            <Button type="primary" className="admin_button">修改密码</Button>
        </div>

        <div className='admin_table_back'>
           <Table dataSource={data} className="admin_table">
                <Column title="股票编号" dataIndex="id" defaultSortOrder="descend" sorter="(a, b) => a.id - b.id" />
                <Column title="股票名称" dataIndex="name" defaultSortOrder="descend" sorter="(a, b) => a.name - b.name" />
                <Column title="股票信息" dataIndex="info" defaultSortOrder="descend" sorter="(a, b) => a.info - b.info" />
                <Column
                title="Action"
                key="action"
                render={() => (
                    <Space size="middle">
                    <a>详情</a>
                    </Space>
                )}
                />
            </Table> 
        </div>
        
        
        </div>
        
    )
}

export default AdminPage;