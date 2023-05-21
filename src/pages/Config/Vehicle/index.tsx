import { ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import { useModel, useRequest } from "@umijs/max";
import { Button, Form, Input, Modal, Popconfirm } from "antd";
import { useRef, useState, useEffect } from "react";
import { noticeFunc } from "@/utils/format";
import { deleteVehicleUsingDELETE, editVehicleUsingPOST, getAllVehiclesUsingGET, joinSysUsingPOST } from '@/services/logosticsmanagement/cheliangguanlijiekou';
import { VehicleState, VehicleStateWord } from '../const';

export default function ConfigClient() {
    const [form] = Form.useForm();

    const actionRef = useRef<ActionType>();
    const { user } = useModel('global');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState('');

    const res = useRequest(getAllVehiclesUsingGET, {

        manual: true,
    });
    const getList = async () => {
        const data = await res.run({
            userId: user?.userId,
        });
        return {
            data
        }
    }
    const editFunc = (record: API.DriverInfo) => {
        setEdit(record.id as string)
        setVisible(true);
        form.setFieldsValue(record)
    }
    const deleteFunc = async (record: API.DriverInfo) => {
        await deleteVehicleUsingDELETE({
            id: Number(record.id)
        });
        noticeFunc('success', { title: ' 删除成功' });
        getList()
    }
    const columns = [{
        title: '车牌',
        dataIndex: 'licensePlateNumber'
    }, {
        title: '驾驶车型',
        dataIndex: 'vehicleType'
    }, {
        title: '车载重量/kg',
        dataIndex: 'loadWeight'
    }, {
        title: '绑定的车载终端号',
        dataIndex: 'terminalMobile',
        render: (text: any) => text ? text : '未绑定终端'
    }, {
        title: '状态',
        dataIndex: 'state',
        render: (state: VehicleState) => VehicleStateWord[state] || '无终端'
    }, {
        title: '颜色',
        dataIndex: 'licensePlateColor'
    }, {
        title: '操作',
        dataIndex: 'operate',
        render: (_: any, record: any) => {
            return <><Button type="default" onClick={() => editFunc(record)}>修改</Button><Popconfirm title="确定要删除吗？" onConfirm={() => deleteFunc(record)}><Button type='primary' danger className="ml10">删除</Button></Popconfirm></>
        }
    }];
    useEffect(() => {

        if (user?.userId) {
            getList()
        }
    }, [user?.userId])
    const submit = async () => {
        await form.validateFields();
        setLoading(true)
        const value = form.getFieldsValue();
        const func = edit ? editVehicleUsingPOST : joinSysUsingPOST;
        const editId = edit ? { id: edit } : {};
        await func({ ...value, userId: user.userId, load: value.loadWeight, ...editId, coldStorageFlag: false })
        setLoading(false);
        setVisible(false);
        getList()
    }



    return <PageContainer >
        <ProTable
            loading={res.loading}
            actionRef={actionRef}
            rowKey="id"
            search={false}
            columns={columns}
            dataSource={res.data}
            request={getList}
            toolBarRender={() => [<Button type="primary" key="primary" onClick={() => { setEdit(''); setVisible(true); form.resetFields(); }} loading={!visible && loading}>创建</Button>]} />
        <Modal title={edit ? "编辑" : "创建"} open={visible} onCancel={() => setVisible(false)} onOk={submit} confirmLoading={visible && loading}>
            <Form labelCol={{ span: 7 }} form={form}>
                {columns.slice(0, -1).map((ele, index) => <Form.Item key={ele.dataIndex} label={ele.title} name={ele.dataIndex} rules={index < 3 ? [{ required: true, message: `请输入${ele.title}` }] : []}>{ele.formRender ? ele.formRender : <Input />}</Form.Item>)}
            </Form>
        </Modal>
    </PageContainer>
}