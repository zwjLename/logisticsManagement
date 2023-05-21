import { getOrdersByAllocationIdUsingGET } from '@/services/logosticsmanagement/fenpaidiaoduguanlijiekou'
import { ProTable } from '@ant-design/pro-components';

export const DisTaskModal = ({id = ''}: {id: string}) => {
    

    const request = async () => {
       const res = await getOrdersByAllocationIdUsingGET({
        allocationId: id
    })
        return {
            data: res.data || []
        }
    }
    const columns = [{
        title: '客户单位',
        dataIndex: 'corporateName',
        // tip: '名称是唯一的 key',
    },
    {
        title: '目的地',
        dataIndex: 'rcvAddress',
        valueType: 'text',
    },
    {
        title: '送达日期',
        dataIndex: 'hopeRcvTime',
        valueType: 'date',
    }, {
        title: '联系人',
        dataIndex: 'revName'
    }, {
        title: '电话',
        dataIndex: 'revTel'
    },]

    return <ProTable pagination={false}  request={request}   rowKey="id" search={false} columns={columns} />
}