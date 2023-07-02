import { ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import { useModel } from "@umijs/max";
import { useRef } from "react";
import { getTerminalListByUserUsingGET } from '@/services/logosticsmanagement/zhongduantongxinguanliApi';
import { VehicleState, VehicleStateWord } from '../const';
import { Button, Popconfirm } from 'antd';
import { noticeFunc } from '@/utils/format';
import { unBindVehicleUsingPOST } from '@/services/logosticsmanagement/sijiguanlijiekou';
export default function ConfigTerminal({ search = false }: any) {

    const actionRef = useRef<ActionType>();
    const { user } = useModel('global');


    const getList = async ({ pageSize, current, ...other }: any) => {
        const data = await getTerminalListByUserUsingGET({
            userId: user?.userId,
            page: current,
            pageSize,
            ...other
        });
        return {
            data: data?.data?.list
        }
    }
    const deleteFunc = async (record: any) => {
        await unBindVehicleUsingPOST({
            terminalMobile: record.mobileNumber
        });
        noticeFunc('success', { title: ' 删除成功' });
        actionRef.current?.reload()
    }
    const columns = [{
        title: '车牌',
        dataIndex: 'licensePlateNumber'
    }, {
        title: '终端号',
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
    }, {
        title: '操作',
        dataIndex: 'operate',
        render: (_, record: any) => {
            return (
                <>
                    <Popconfirm title="确定要删除吗？" onConfirm={() => deleteFunc(record)}><Button type='primary' danger className="ml10">删除</Button></Popconfirm>
                    {/* <Button className='ml10'>操作传感器</Button> */}
                </>
            )
        }
    }];
    return <PageContainer >
        <ProTable
            actionRef={actionRef}
            rowKey="id"
            search={search}
            columns={columns as any}
            request={getList} />

    </PageContainer>
}