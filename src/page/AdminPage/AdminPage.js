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
        <div className='Admin_BackGound'>

        <div className='Admin_Header'>
            Hi,Admin
            <Button type="primary" className="Admin_Button">修改密码</Button>
            <Button type="primary" danger className="Admin_Button">退出登录</Button>
        </div>

        <div className='Admin_TabelBack'>
           <Table dataSource={data} className="Admin_Table">
                <Column title="股票编号" dataIndex="id" defaultSortOrder="descend"/>
                <Column title="股票名称" dataIndex="name" defaultSortOrder="descend" />
                <Column title="股票信息" dataIndex="info" defaultSortOrder="descend" />
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