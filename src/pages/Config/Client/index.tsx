import { addAddressUsingPOST, getAllAddressUsingGET } from "@/services/logosticsmanagement/kehuxinxiguanlijiekou";
import { ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import { useModel } from "@umijs/max";
import { Button, Form, Input, Modal } from "antd";
import { useRef, useState } from "react";

export default function ConfigClient() {
    const [form] = Form.useForm();

    const actionRef = useRef<ActionType>();
    const { user } = useModel('global');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const columns = [{
        title: '客户单位名称',
        dataIndex: 'corporateName'
    }, {
        title: '联系人',
        dataIndex: 'receiver'
    }, {
        title: '联系电话',
        dataIndex: 'tel'
    }, {
        title: '省市区',
        dataIndex: 'city'
    }, {
        title: '详细地址',
        dataIndex: 'road'
    }]
    const tableRequest = async () => {
        const res = await getAllAddressUsingGET({ userId: user.userId });
        return {
            data: res.data
        }
    }
    const submit = async () => {
        await form.validateFields();
        setLoading(true)
        const value = form.getFieldsValue()
        await addAddressUsingPOST({ ...value, userId: user.userId })
        setLoading(false);
        setVisible(false);
        actionRef.current?.reload();
    }
    return <PageContainer>
        <ProTable
            actionRef={actionRef}
            rowKey="id"
            search={false}
            request={tableRequest}
            columns={columns}
            toolBarRender={() => [<Button type="primary" key="primary" onClick={() => { setVisible(true) }} loading={loading}>创建</Button>]} />
        <Modal title="创建" open={visible} onCancel={() => setVisible(false)} onOk={submit}>
            <Form labelCol={{ span: 5 }} form={form}>
                {columns.map((ele) => <Form.Item key={ele.dataIndex} label={ele.title} name={ele.dataIndex} rules={[{ required: true, message: `请输入${ele.title}` }]}><Input /></Form.Item>)}
            </Form>
        </Modal>
    </PageContainer>
}