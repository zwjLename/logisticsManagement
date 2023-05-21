import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { Button, Col, Input, Row, Select, Tag } from 'antd';
import SelectVehicle from '@/components/SelectVehicles';
import { useRef, useState } from 'react';

const DialogManipulatePage: React.FC = () => {
  const { name } = useModel('global');
  const [reason, setReason] = useState('');
  const ref = useRef<any>();

  const addTags = () => {
    return ['温度过高','温度过低','水温过高','水温过低','溶解氧过高','溶解氧过低'].map(ele => <Tag className='hand' key={ele} onClick={() => {
      setReason(pre => `${pre} ${ele}`);
      ref.current?.focus();
    }}>{ele}</Tag>)
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

        }} ref={ref} className='mt20'></Input.TextArea>

      </Row>
      <Button onClick={() => {
        
      }}>下发指令</Button>
    </PageContainer>
  );
};

export default DialogManipulatePage;
