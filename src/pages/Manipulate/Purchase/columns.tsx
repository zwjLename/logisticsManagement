
import { Divider } from "antd";
import { useCallback} from 'react';
import { useModel } from '@umijs/max';
import { PurchaseType } from "../typings";
import { queryOrderDetailByOrderIdUsingGET } from "@/services/logosticsmanagement/dingdanguanli";

export const useColumns= () => {
    const {activeKey} = useModel('Manipulate.Purchase.index')
    const { setAddVisible, setDetail,setDetailVisible } = useModel('Manipulate.Purchase.index')
    const getDetail = useCallback(async (mailOrderId: string) => {
        const res = await queryOrderDetailByOrderIdUsingGET({mailOrderId});
        const resData = res.data || {}
        setDetail({...resData, mailOrderId});
        setDetailVisible(true)
        setAddVisible(true)
    }, [])
    return [
    {
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
    },
    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_: any, record: any) => (
            <>
                <a
                    onClick={() => {
                        getDetail(record.id)
                    }}
                >
                    {activeKey === PurchaseType.finish ? '再来一单' : '修改'}
                </a>
                <Divider type="vertical" />
            </>
        ),
    },
    ]
};