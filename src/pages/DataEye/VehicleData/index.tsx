import { MinuteDateFormat, noticeFunc } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import SelectVehicle from '@/components/SelectVehicles';
import { DatePicker, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useResHooks } from '@/hooks';
import { Map, Polyline } from 'react-amap';
import { calLocation } from '@/utils/utils';

const { RangePicker } = DatePicker;
const VehicleDataPage: React.FC = () => {
  const ref = useRef<any>();
  const { orbitRes } = useResHooks();
  const { terminalMobile } = useModel('global');
  const [range, setRange] = useState([dayjs().startOf('day').format(MinuteDateFormat), dayjs().endOf('day').format(MinuteDateFormat)]);
  const [center, setCenter] = useState([118.997723, 31.509352] as any);
  const [transPositionResultList, setTransPositionResultList] = useState([] as Array<{ longitude: number, latitude: number }>);
  const onChange = (e: any) => {
    setRange([
      dayjs(e[0]).format(MinuteDateFormat),
      dayjs(e[1]).format(MinuteDateFormat)
    ])
  }

  useEffect(() => {
    if (terminalMobile) {
      const [startTime, endTime] = range;
      orbitRes.run({
        terminalMobile,
        startTime,
        endTime
      })
    }
  }, [terminalMobile, range]);
  useEffect(() => {
    // if (isFunction(ref.current?.clearMap)) {
    //   console.log("...")
    //   ref.current.clearMap();
    // }
    if (orbitRes.data?.length) {
      const pos = orbitRes.data?.filter(ele => {
        const { longitude, latitude } = ele;
        return longitude && latitude;
      }).map(ele => {
        const { longitude, latitude } = ele
        const position = calLocation({ longitude, latitude });
        return position;
      });
      // console.log('allpos...',pos)
      if (pos.length) {
        const { longitude, latitude } = pos[0];
        setCenter([longitude, latitude]);
        setTransPositionResultList(pos);
      }
    } else {
      if (terminalMobile) {
        noticeFunc('success',{
          msg: '该车辆无轨迹信息'
        })
      }
      
      setCenter([118.997723, 31.509352])
      setTransPositionResultList([])
    }
  }, [orbitRes.data])
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Row gutter={12}>
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
      </div>
      <div style={{ height: `calc(100vh - 220px)` }}>
        <Map amapkey={'a6d72a47007d82705f0269b391b37656'} center={center} zoom={11} resizeEnable={true} events={{
          created: (instance: any) => ref.current = instance
        }}>
          <Polyline
            path={transPositionResultList}
            showDir={true}
            style={{
                strokeColor: '#28F',
                strokeWeight: 6
            }}
          />
        </Map>
      </div>
    </PageContainer>
  );
};

export default VehicleDataPage;
