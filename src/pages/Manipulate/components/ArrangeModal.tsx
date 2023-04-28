import { getAllStaffsUsingGET } from '@/services/logosticsmanagement/sijiguanlijiekou';
import { ROLE } from '@/utils/format';
import {  DatePicker, Form, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';

interface Props {
    open: boolean;
    setOpen: (arg: boolean) => void;
    cb: any;
    dateName: string;
    personName: string;
    personType: ROLE;
    title: string
}
export const ArrangeModal = ({ open, setOpen, cb, dateName = '', personName = '', personType, title }: Props) => {
    const { user } = useModel('global');
    console.log('%c [ user ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', user)
    const [personList, setPersonList] = useState<API.DriverInfo[]>([]);
    useEffect(() => {
        const getStaff = async () => {
            const { data = [] } = await getAllStaffsUsingGET({
                userId: user.userId,
                role: personType
            });
            setPersonList(data)
        }
        if (user.userId) {
            getStaff()
        }
    }, [user.userId, personType])
    const [form] = Form.useForm();
    const onOk = () => {
        const value = form.getFieldsValue();
        console.log('%c [ value ]-31', 'font-size:13px; background:pink; color:#bf2c9f;', value)
        cb(value)
    }
    return <Modal open={open} title={title} onCancel={() => setOpen(false)} onOk={onOk}>
        <Form form={form} wrapperCol={{span: 18}} labelCol={{span: 6}}>
            <Form.Item name="hopeRcvTime" label={dateName}>
                <DatePicker className='w100per'/>
            </Form.Item>
            <Form.Item name="tel" label={personName}>
                <Select>
                    {personList.map((ele) => <Select.Option value={ele.tel} key={ele.tel}>{ele.name}</Select.Option>)}
                </Select>
            </Form.Item>
        </Form>

    </Modal>
}