import { ProTable, PageContainer, ActionType } from '@ant-design/pro-components';
import { useModel } from "@umijs/max";
import { useEffect, useRef, useState } from "react";
import { DatePicker, Row } from 'antd';
import SelectVehicle from '@/components/SelectVehicles';
import dayjs from 'dayjs';
import { MinuteDateFormat } from '@/utils/format';
import { getAllWarningListByConditionUsingGET } from '@/services/logosticsmanagement/baojingjiluguanlijiekou';


const { RangePicker } = DatePicker;

export default function CarbinData({ search = false }: any) {

  const actionRef = useRef<ActionType>();
  const { user } = useModel('global');
  const { vehicleNum } = useModel('global');
  const [range, setRange] = useState([dayjs().startOf('day').format(MinuteDateFormat), dayjs().endOf('day').format(MinuteDateFormat)]);

  const onChange = (e: any) => {
    setRange([
      dayjs(e[0]).format(MinuteDateFormat),
      dayjs(e[1]).format(MinuteDateFormat)
    ])
  }

  const getList = async ({ pageSize, current, ...other }: any) => {
    const [startTime, endTime] = range
    const data = await getAllWarningListByConditionUsingGET({
      userId: user?.userId,
      vehicleNum,
      startTime,
      endTime,
      page: current,
      pageSize,
      ...other
    });
    return {
      data: data?.data?.list
    }
  }
  const columns = [{
    title: '车牌号',
    dataIndex: 'vehicleNum'
  }, {
    title: '终端号',
    dataIndex: 'terminalNum'
  }, {
    title: '传感器地址',
    dataIndex: 'sensorAddress'
  }, {
    title: '时间',
    dataIndex: 'time',
  }, {
    title: '状态',
    dataIndex: 'readFlagStr',
  }, {
    title: '报警信息',
    dataIndex: 'warnDesc'
  }];

  useEffect(() => {
    if (vehicleNum) {
      actionRef.current?.reload()
    }
  }, [vehicleNum, range])

  return <PageContainer >
    <Row>
      <SelectVehicle />
      <RangePicker
        allowClear={false}
        className='ml10'
        showTime={{ format: 'HH:mm:ss' }}
        format={MinuteDateFormat}
        onChange={onChange}
        value={[dayjs(range[0]), dayjs(range[1])]}
      />
    </Row>
    <ProTable
      className='mt10'
      actionRef={actionRef}
      rowKey="id"
      search={search}
      columns={columns}
      request={getList} />

  </PageContainer>
}