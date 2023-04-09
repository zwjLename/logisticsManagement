import React, { useState, useEffect, useRef } from "react";
import { PageContainer, ProCard, ProTable, ActionType } from '@ant-design/pro-components';

import { useModel } from '@umijs/max';
import styles from './index.less';
import '@/global.less'
import { Button } from 'antd';
import { getPurchaseList } from '@/services/manipulate';
import { columns } from "./columns";
import { PurchaseType } from "../typings";

const PurchaseManipulatePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { userTel } = useModel('global');
  const [activekey, setActiveKey] = useState<PurchaseType>(PurchaseType.ing);
  useEffect(() => {
    actionRef.current?.reload();
  }, [activekey])

  return (
    <PageContainer tabList={[{ tab: '进行中', key: PurchaseType.ing }, { tab: '已完成', key:  PurchaseType.finish }]} extra={<Button key="3" type="primary">创建订单</Button>} onTabChange={(key) => {setActiveKey(key as PurchaseType)}}>
      <div className={styles.container}>
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProTable<any>
            search={false}
            actionRef={actionRef}
            rowKey="id"
            request={async () => {
              const res = await getPurchaseList({
                pickUserTel: userTel,
                pickState: activekey
              });
              return {
                data: res.data,
              };
            }}
            columns={columns}
            rowSelection={{
              onChange: (_, selectedRows) => {
                console.log('%c [ selectedRows ]-49', 'font-size:13px; background:pink; color:#bf2c9f;', selectedRows)

              },
            }}
          />
        </ProCard>
      </div>
    </PageContainer>
  );
};

export default PurchaseManipulatePage;
