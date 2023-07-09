import { ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import { request, useModel, useRequest } from "@umijs/max";
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Radio } from "antd";
import { useRef, useState, useEffect } from "react";
import { AllMember, MemberWord, Member } from './types';
import { addStaffUsingPOST, deleteStaffUsingDELETE, editStaffUsingPOST, getAllStaffsUsingGET } from "@/services/logosticsmanagement/sijiguanlijiekou";
import { DateFormat, noticeFunc } from "@/utils/format";
import dayjs from "dayjs";

export default function ConfigClient() {
    const [form] = Form.useForm();

    const actionRef = useRef<ActionType>();
    const { user } = useModel('global');
    const [activeKey, setActiveKey] = useState(Member.driver)
    const [visible, setVisible] = useState(false);
    // const [teropen, setTeropen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState('');

    const addUserUsingPOST = (data: any) => request('/authority/admin/add', {method: 'POST', data})
    const memberRes = useRequest(getAllStaffsUsingGET, {
        manual: true,
    });
    const getList = async () => {
        const data = await memberRes.run({
            userId: user?.userId,
            role: activeKey
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
        await deleteStaffUsingDELETE({
            id: record.id as string
        });
        noticeFunc('success', { title: ' 删除成功' });
        getList()
    }
    const columns = [{
        title: '姓名',
        dataIndex: 'name'
    }, {
        title: '联系电话',
        dataIndex: 'tel'
    }, {
        title: '驾驶证号',
        dataIndex: 'licenseNum'
    }, {
        title: '驾驶车型',
        dataIndex: 'vehicleType'
    }, {
        title: '性别',
        dataIndex: 'sex',
        formRender: <Radio.Group><Radio value={'男'}>男</Radio><Radio value={'女'}>女</Radio></Radio.Group>
    }, {
        title: '生日',
        dataIndex: 'birthDay',
        formRender: <DatePicker format={DateFormat} className='w100per' />
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
    }, [activeKey, user?.userId])
    const submit = async () => {
        try {
            await form.validateFields();
            setLoading(true)
            const value = form.getFieldsValue();
            const func = edit ? editStaffUsingPOST : addStaffUsingPOST;
            const editId = edit ? { id: edit } : {};
            await func({ ...value, userId: user.userId, role: activeKey, birthDay: value.birthDay ? dayjs(value.birthDay).format(DateFormat) : undefined, ...editId });
            if (activeKey === Member.admin) {
                await addUserUsingPOST({
                    userDO: {
                        "birthDay": "",
                        "id": 0,
                        "image": "",
                        "licenseNum": "",
                        "register_time": "",
                        "role": "ROLE_ADMIN",
                        "sex": "",
                        "vehicleType": "",
                        belongUserId: user?.userId,
                        ...value,
                        username: value.tel,
                        password: '123456'
                    }
                });
                noticeFunc('success', {msg: '创建成功'})
            }
        } catch(e){

        }
        
        setLoading(false);
        setVisible(false);
        getList()
    }

    return <PageContainer tabList={AllMember.map(ele => ({ tab: MemberWord[ele], key: ele }))} onTabChange={(tabkey) => { setActiveKey(tabkey as Member); form.resetFields() }}>
        <ProTable
            pagination={false}
            loading={memberRes.loading}
            actionRef={actionRef}
            rowKey="id"
            search={false}
            dataSource={memberRes.data || []}
            request={getList}
            columns={columns}
            toolBarRender={() => [<Button type="primary" key="primary" onClick={() => { setVisible(true) }} loading={loading}>创建</Button>]} />
        <Modal title={edit ? "编辑" : "创建"} open={visible} onCancel={() => setVisible(false)} onOk={submit}>
            <Form labelCol={{ span: 5 }} form={form}>
                {columns.map((ele, index) => <Form.Item key={ele.dataIndex} label={ele.title} name={ele.dataIndex} rules={index < 2 ? [{ required: true, message: `请输入${ele.title}` }] : []}>{ele.formRender ? ele.formRender : <Input />}</Form.Item>)}
            </Form>
        </Modal>
        {/* <Modal title="操作传感器" open={teropen} onCancel={() => setTeropen(false)} onOk={terSubmit}>


        </Modal> */}
    </PageContainer>
}