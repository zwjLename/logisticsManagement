import { PurchaseType } from '@/pages/Manipulate/typings';
import { useState } from 'react';
export default function Model() {
    // 编辑
    const [detail, setDetail] = useState<any>({});
    const [detailVisible, setDetailVisible] = useState(false); // 区别是修改还是编辑
    // 汇总
    const [sumVisible, setSumVisible] = useState(false);
    const [sum, setSum] = useState<API.GoodsInRcvOrderParam[]>([])
    // 打开侧边栏
    const [addVisible, setAddVisible] = useState(false);
    // activeKey
    const [activeKey, setActiveKey] = useState<PurchaseType>(PurchaseType.ing);
    return {
        detail, setDetail, detailVisible, setDetailVisible, sumVisible, setSumVisible, addVisible, setAddVisible, sum, setSum, activeKey, setActiveKey
    }
}