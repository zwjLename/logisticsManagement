import React, { useEffect, useRef, useState } from "react";
import { PageContainer, ProCard, ProTable, ActionType } from '@ant-design/pro-components';

import { useModel } from '@umijs/max';
import styles from './index.less';
import '@/global.less'
import { Button } from 'antd';
import { useColumns } from "./columns";
import { PurchaseType } from "../typings";
import { useCallback } from 'react';

import { AddOrder } from "./components/AddOrder";
import { DetailModal } from "./components/SumModal";
import { gatherOrdersUsingGET, getfinishOrderListUsingGET, waitPickOrderListUsingGET } from "@/services/logosticsmanagement/dingdanguanli";
import { DateFormat, ROLE, noticeFunc } from "@/utils/format";
import { allocatePickUpInfoUsingPOST } from "@/services/logosticsmanagement/fenpaidiaoduguanlijiekou";
import { ArrangeModal } from "../components/ArrangeModal";
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';


const PurchaseManipulatePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { user } = useModel('global');
  const { setAddVisible, setSum, setSumVisible, setDetail, activeKey, setActiveKey } = useModel('Manipulate.Purchase.index')
  const { userId } = user || {};
  const columns = useColumns();
  const [open, setOpen] = useState(false);
  const [orderIds, setOrderIds] = useState<string[]>([]);
  useEffect(() => {
    actionRef.current?.reload();
  }, [activeKey])



  const tableRequest = useCallback(async (pag: { current: any; pageSize: any; }) => {
    const { current, pageSize } = pag;
    let data = []
    if (activeKey === PurchaseType.ing) {
      const res = await waitPickOrderListUsingGET({ userId });
      data = res.data || []
    } else {
      const res = await getfinishOrderListUsingGET({
        userId,
        page: current,
        pageSize
      });
      data = res.data?.list || []
    }
    return {
      data,
    }
  }, [activeKey, userId])
  const addCb = useCallback(() => {
    if (activeKey === PurchaseType.ing) {
      actionRef.current?.reload();
    }
  }, [activeKey]);

  const collect = useCallback(async (value: { tel: string, hopeRcvTime: Dayjs }) => {
    try {
      await allocatePickUpInfoUsingPOST({
        pickUserTel: value.tel,
        hopeRcvTime: dayjs(value.hopeRcvTime).format(DateFormat),
        mailOrderIdList: orderIds,
        userId: user.userId,
      });
      noticeFunc('success', { msg: '采购分派成功' });
    } catch (e) { }

    setOpen(false)
  }, [orderIds])
  const tableAlertOptionRender = async (rows: any[]) => {
    const mailOrderIdList = rows.map(ele => ele.id)
    const { data = [] } = await gatherOrdersUsingGET({ mailOrderIdList })
    setSum(data || []);
    setSumVisible(true)
  }
  const extraPag: { pagination?: false } = activeKey === PurchaseType.ing ? { pagination: false } : {}
  return (
    <>
      <PageContainer
        tabActiveKey={activeKey}
        tabList={[{ tab: '进行中', key: PurchaseType.ing }, { tab: '已完成', key: PurchaseType.finish }]}
        extra={<Button type="primary" onClick={() => { setAddVisible(true); setDetail({}) }}>创建订单</Button>}
        onTabChange={(key) => { setActiveKey(key as PurchaseType) }}>
        <div className={styles.container}>
          <ProCard direction="column" ghost gutter={[0, 16]}>
            <ProTable
              {...extraPag}
              search={false}
              actionRef={actionRef}
              rowKey="id"
              request={tableRequest}
              columns={columns}
              tableAlertOptionRender={({ selectedRows }) => {
                return activeKey === PurchaseType.ing &&  <><Button onClick={() => { setOrderIds(selectedRows.map(ele => ele.id)); setOpen(true) }} >采购分派</Button><Button className="ml10" onClick={() => tableAlertOptionRender(selectedRows)}>商品汇总</Button></>
              }}
              {...activeKey === PurchaseType.ing ? {
                rowSelection: {
                  onChange: (_, selectedRows) => {
                    console.log('%c [ selectedRows ]-49', 'font-size:13px; background:pink; color:#bf2c9f;', selectedRows)
  
                  },
                }
              } : {}}
              // rowSelection={{
              //   onChange: (_, selectedRows) => {
              //     console.log('%c [ selectedRows ]-49', 'font-size:13px; background:pink; color:#bf2c9f;', selectedRows)

              //   },
              // }}
            />
          </ProCard>
        </div>
      </PageContainer>

      <AddOrder cb={addCb} setActiveKey={setActiveKey}/>
      <DetailModal />
      <ArrangeModal open={open} setOpen={setOpen} dateName="送达仓库日期" personName="采购员" personType={ROLE.collector} cb={collect} title="采购分派"/>
    </>
  );
};

export default PurchaseManipulatePage;
