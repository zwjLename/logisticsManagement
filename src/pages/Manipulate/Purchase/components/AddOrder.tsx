import { getAllAddressUsingGET } from '@/services/logosticsmanagement/kehuxinxiguanlijiekou'
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Space } from 'antd'
import React, { useEffect, useState, useCallback } from 'react'
import { useModel } from '@umijs/max';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from "../index.less";
import { DateFormat, noticeFunc } from '@/utils/format';
import dayjs from 'dayjs';
import { modifyGoodsUsingPOST, recvMailOrderUsingPOST } from '@/services/logosticsmanagement/dingdanguanli';
import { PurchaseType } from '../../typings';


interface Props {
    cb: () => void;
    setActiveKey: any;
}
export const AddOrder = ({ cb, setActiveKey }: Props) => {
    const { addVisible, setAddVisible, detail, detailVisible, setDetailVisible, activeKey } = useModel('Manipulate.Purchase.index')

    const { user } = useModel('global');
    const [form] = Form.useForm()
    const [list, setList] = useState<API.ConsumerAddress[]>([]);
    const [selectItem, setSelectItem] = useState<API.ConsumerAddress>({});
    const [hopeRcvTime, setHopeRcvTime] = useState(dayjs().format(DateFormat));
    console.log('%c [ dayjs().format(DateFormat) ]-24', 'font-size:13px; background:pink; color:#bf2c9f;', dayjs().format(DateFormat))
    const getClientList = async () => {
        if (user.userId) {
            const listData = await getAllAddressUsingGET({ userId: user.userId });
            setList(listData?.data || []);
        }
    }
    const createOrder = useCallback(async (goodsInRcvOrderParamList: API.GoodsInRcvOrderParam[]) => {
        const { corporateName = '', receiver = '', tel = '', road = '' } = selectItem;
        let res;
        if ((activeKey === PurchaseType.ing) && detailVisible) {
            res = await modifyGoodsUsingPOST({
                mailOrderId: detail.mailOrderId
            }, goodsInRcvOrderParamList)
        } else {
            res = await recvMailOrderUsingPOST({
                corporateName,
                receiver,
                tel,
                address: road,
                hopeRcvTime,
                userId: user.userId
            }, goodsInRcvOrderParamList)
        }
        if (!res?.code) {
            noticeFunc('success', { msg: detailVisible ? '编辑订单成功' : '创建订单成功' });
            setActiveKey(PurchaseType.ing)
            setAddVisible(false)
            cb();
        }
    }, [selectItem, detail, activeKey, detailVisible, hopeRcvTime])
    
    const confirm = async () => {
        await form.validateFields();
        const goods = form.getFieldsValue();
        createOrder(goods.goodsInRcvOrderParamList || [])
    }
    // 获取公司list
    useEffect(() => { getClientList() }, [user.userId]);

    // 初始化
    useEffect(() => {
        if (addVisible) {
            // 设置商品list
            form.setFieldsValue({ goodsInRcvOrderParamList: detailVisible ? detail.goodsList || [] : [{ goodsName: '', number: undefined, unitdesc: '' }] });
            // 设置公司名称和日期
            const corItem = list.find(ele => ele.corporateName === detail.corporateName) || {};
            setSelectItem(corItem)
            if ((activeKey === PurchaseType.finish) && detailVisible) {
                setHopeRcvTime(dayjs().add(1, 'day').format(DateFormat));
            } else if (detailVisible) {
                setHopeRcvTime(detail.hopeRcvTime);
            }
        }

    }, [detailVisible, form, addVisible, list])
    return (
        <Modal open={addVisible} title={detailVisible ? '编辑订单' : '创建订单'} onCancel={() => { setAddVisible(false); setDetailVisible(false) }} onOk={confirm} width={600} destroyOnClose={true}>
            <Row gutter={8} className={styles.addOrder}>
                <Col span={4}>客户单位：</Col>
                <Col span={20}>
                    <Select defaultValue={selectItem.id} onChange={ele => setSelectItem(list.find(it => it.id === ele) || {})} placeholder="请选择创建订单的客户单位" style={{ width: "100%" }} disabled={(activeKey === PurchaseType.ing) && detailVisible}>
                        {list.map((ele) => <Select.Option key={ele.id} value={ele.id}>{ele.corporateName}</Select.Option>)}
                    </Select>
                </Col>

                <Col span={4} className='mt10'>送达日期：</Col>
                <Col span={20} className='mt10'>
                    <DatePicker value={dayjs(hopeRcvTime)} format={DateFormat} style={{ width: '100%' }} onChange={(e) => setHopeRcvTime(e?.format(DateFormat) as string)}></DatePicker>
                </Col>
                <Col span={4} className='mt10'>商品：</Col>
                <Col span={20} className='mt10'>
                    <Row>
                        <Form form={form}>
                            <Form.List name="goodsInRcvOrderParamList" >{(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} className='flex-center' align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'goodsName']}
                                                rules={[{ required: true, message: '请填写名称' }]}
                                            >
                                                <Input placeholder="请填写商品名称" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'number']}
                                                rules={[{ required: true, message: '请填写个数' }]}
                                            >
                                                <InputNumber placeholder="请填写商品个数" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'unitdesc']}
                                                rules={[{ required: true, message: '请填写单位' }]}
                                            >
                                                <Input placeholder="请填写商品单位" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} className={styles.minus} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            添加商品类目
                                        </Button>
                                    </Form.Item>
                                </>
                            )}</Form.List>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Modal>
    )
}