import { ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import { useModel } from "@umijs/max";
import { useRef, useState } from "react";
import { editSensorUsingPOST, getSensorListUsingGET, getTerminalListByUserUsingGET } from '@/services/logosticsmanagement/zhongduantongxinguanliApi';
import { VehicleState, VehicleStateWord } from '../const';
import { Button, Form, Input, Modal, Popconfirm, Select } from 'antd';
import { noticeFunc } from '@/utils/format';
import { unBindVehicleUsingPOST } from '@/services/logosticsmanagement/sijiguanlijiekou';
export default function ConfigTerminal({ search = false }: any) {

    const actionRef = useRef<ActionType>();
    const detailActionRef = useRef<ActionType>()
    const { user } = useModel('global');
    const [open, setOpen] = useState(false);
    const [mobileNumber, setMobileNumber] = useState<string>('');
    const [detailopen, setDetailOpen] = useState(false);
    const [form] = Form.useForm();

    const editSensor = async () => {
        const values = form.getFieldsValue()
        console.log('%c [ values ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', values)
        await editSensorUsingPOST({
            terminalMobile: mobileNumber,
            ...values
        });
        noticeFunc('success', {msg: '编辑成功'});
        setDetailOpen(false);
        detailActionRef.current?.reload()
    }
    const getSensorList = async () => {
        const {data = []} = await getSensorListUsingGET({
            terminalMobile: mobileNumber
        });
        return {
            data,
            success: true,
        }
    }
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

                <Button className='ml10' onClick={() => {setOpen(true);setMobileNumber(record.mobileNumber)}}>编辑传感器</Button>
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
            <Modal open={open} title="编辑传感器" onCancel={() => setOpen(false)} footer={null} >
               
                <ProTable  search={false}  actionRef={detailActionRef} request={getSensorList} params={mobileNumber} columns={[{
                    dataIndex: 'sensorType',
                    title: '类型',
                    render: (type: any) => {
                        return type === 'CO2' ? '二氧化碳' : type === 'DO_DISOXY' ? 'DO溶解氧' : type === 'TEMP_HUMI' ? '温湿度一体' : ''
                    },
                    
                }, {
                    dataIndex: 'sensorAddress',
                    title: '地址'
                }, {
                    dataIndex:'operator',
                    title: '操作',
                    render: (_, record: any) => {
                        return <Button onClick={()=> {setDetailOpen(true); form.setFieldsValue({
                            sensorId: record.id,
                            type: record.sensorType,
                            hexAddress: record.sensorAddress
                        })}}>编辑</Button>
                    }
                }]}></ProTable>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}><Button type="primary" onClick={() => {
                setDetailOpen(true);
                form.setFieldsValue({
                    sensorId: undefined,
                    type: undefined,
                    hexAddress:''
                })
            }}>添加</Button></div>
                
            </Modal>
            <Modal open={detailopen} title="编辑" onCancel={() => setDetailOpen(false)} onOk={editSensor}>
                <Form form={form} >
                    <Form.Item name="sensorId" noStyle initialValue={''}></Form.Item>
                    <Form.Item name={"type"} label="类型">
                        <Select>
                            <Select.Option value='TEMP_HUMI'>温湿度一体</Select.Option>
                            <Select.Option value='DO_DISOXY'>DO溶解氧</Select.Option>
                            <Select.Option value='CO2'>二氧化碳</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="hexAddress" label="地址">
                        <Input />
                    </Form.Item>
                   
                </Form>
            </Modal>

    </PageContainer>
}