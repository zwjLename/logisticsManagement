import Guide from '@/components/Guide';
import { errorNotice, noticeFunc, trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { Button, Col, Input, Row, Select, Tag } from 'antd';
import SelectVehicle from '@/components/SelectVehicles';
import { useRef, useState } from 'react';
import { VehicleState } from '@/pages/Config/const';
import { sendTextUsingPOST } from '@/services/logosticsmanagement/zhongduantongxinguanliApi';

const DialogManipulatePage: React.FC = () => {
  const { veState, terminalMobile } = useModel('global');
  const [reason, setReason] = useState('');
  const ref = useRef<any>();

  const colors = ['red','green','orange', 'gray', 'skyblue', 'yellow']
  const addTags = () => {
    return ['温度过高','温度过低','水温过高','水温过低','溶解氧过高','溶解氧过低'].map((ele, ind) => <Tag className='hand' color={colors[ind]} key={ele} onClick={() => {
      setReason(pre => `${pre} ${ele}`);
      ref.current?.focus();
    }}>{ele}</Tag>)
  }
  const sendOrder = async () => {
    try {
      await sendTextUsingPOST({terminalMobile, content: reason});
      noticeFunc('success', {
        msg: '下发成功'
      })
    } catch (e) {
      errorNotice({
        msg: '下发失败',
        title: ''
      })
    }

  }
  return (
    <PageContainer >
      <Row >
        车辆
        <Col span={24} className='mt10'><SelectVehicle /></Col>
      </Row>
      <Row className='mt20'>
        指令：
        <Col span={24} className='mt10'><span style={{color: "grey"}}>常用指令：</span>{addTags()}</Col>
        <Input.TextArea value={reason} onChange={e => {
          setReason(e.target.value)

        }} ref={ref} className='mt20' showCount></Input.TextArea>

      </Row>
      <Button className='mt10' onClick={() => {
        sendOrder()
      }} disabled={veState !== VehicleState.online}>下发指令</Button><Button className='ml10' onClick={() => setReason('')}>重置</Button>
    </PageContainer>
  );
};

export default DialogManipulatePage;
