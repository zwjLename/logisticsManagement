import { DateFormat, ROLE, noticeFunc } from '@/utils/format';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Button } from 'antd';
import { useRef, useCallback, useState } from 'react';
import { waitDeliveryOrderListUsingGET } from '@/services/logosticsmanagement/dingdanguanli';
import { ArrangeModal } from '../components/ArrangeModal';
import { allocateDriverInfoUsingPOST } from '@/services/logosticsmanagement/fenpaidiaoduguanlijiekou';
import dayjs, { Dayjs } from 'dayjs';

const DeliverManipulatePage: React.FC = () => {
  const { user } = useModel('global')
  const actionRef = useRef();

  const [open, setOpen] = useState(false);
  const [orderIds, setOrderIds] = useState<string[]>([]);

  const tableRequest = useCallback(async () => {

    const res = await waitDeliveryOrderListUsingGET({
      userId: user.userId,
    });
    console.log(res);
    return {
      data: res.data || []
    }
  }, [user.userId])
  const columns = [
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
  ];
  const { run, loading } = useRequest(allocateDriverInfoUsingPOST, {
    manual: true,
    onSuccess: () => {
      noticeFunc('success', { msg: '配送调度成功' });
      setOpen(false);
    }
  })
  const collect = useCallback((value: { tel: string, hopeRcvTime: Dayjs }) => {
    if (!value.tel) { return }
    run({
      driverTel: value.tel,
      hopeRcvTime: dayjs(value.hopeRcvTime).format(DateFormat),
      mailOrderIdList: orderIds,
      userId: user.userId,
    })
  }, [user.userId, orderIds])
  return (
    <PageContainer>
      <div >
        <ProTable
          pagination={false}
          search={false}
          actionRef={actionRef}
          rowKey="id"
          request={tableRequest}
          columns={columns}
          tableAlertOptionRender={({ selectedRows }) => {
            return <><Button onClick={() => { setOrderIds(selectedRows.map(ele => ele.id as string)); setOpen(true) }} loading={loading}>配送调度</Button></>
          }}
          rowSelection={{}}
        />
      </div>
      <ArrangeModal open={open} setOpen={setOpen} dateName="送达日期" personName="司机" personType={ROLE.driver} cb={collect} title="配送调度" />
    </PageContainer>
  );
};

export default DeliverManipulatePage;
