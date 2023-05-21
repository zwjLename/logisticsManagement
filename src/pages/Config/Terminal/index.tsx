import { ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import { useModel } from "@umijs/max";
import { useRef } from "react";
import { getTerminalListByUserUsingGET } from '@/services/logosticsmanagement/zhongduantongxinguanliApi';
import { VehicleState, VehicleStateWord } from '../const';

export default function ConfigTerminal({search = false}: any) {

    const actionRef = useRef<ActionType>();
    const { user } = useModel('global');

   
    const getList = async ({pageSize,current, ...other}: any) => {
        const data = await getTerminalListByUserUsingGET({
            userId: user?.userId,
            page: current,
            pageSize,
            ...other
        });
        return {
            data:data?.data?.list
        }
    }
    const columns = [{
        title: '车牌',
        dataIndex: 'licensePlateNumber'
    }, {
        title: '联系号码',
        dataIndex: 'mobileNumber'
    }, {
        title: '注册时间',
        dataIndex: 'registerTime',
    }, {
        title: '状态',
        dataIndex: 'state',
        render: (state: VehicleState) => {
            return VehicleStateWord[state]
        }
    }];
    return <PageContainer >
        <ProTable
            actionRef={actionRef}
            rowKey="id"
            search={search}
            columns={columns as any}
            request={getList}/>
        
    </PageContainer>
}