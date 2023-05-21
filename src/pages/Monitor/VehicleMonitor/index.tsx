import { PageContainer } from '@ant-design/pro-components';
import { history, useModel, useRequest } from '@umijs/max';
import styles from './index.less';
import { InfoWindow, Map, Marker, Markers } from 'react-amap';
import { getAllVehiclesUsingGET, getVehicleLocationByUserUsingGET } from '@/services/logosticsmanagement/cheliangguanlijiekou';
import { LegacyRef, Ref, useEffect, useRef, useMemo, useState } from 'react';
import { calLocation } from '@/utils/utils';
import { CarIcon, VehicleState } from '@/pages/Config/const';
import { Button, Col, Row } from 'antd';
import { VehicleStateWord } from '../../Config/const';
import { Detail } from './components/Detail';
import SelectVehicle from '@/components/SelectVehicles';

const initContent = {
  "id": 0,
  "vehicleType": "",
  "licensePlateNumber": "",
  "licensePlateColor": 0,
  "loadWeight": 0,
  "coldStorageFlag": false,
  "joinSysTime": "",
  "terminalMobile": "",
  "state": VehicleState.null
}

const VehicleMonitorPage: React.FC = () => {
  const { user, terminalMobile, setTerminalMobile } = useModel('global');

  const [infoPosition, setInfoPosition] = useState({
    longitude: 0,
    latitude: 0
  });
  const [visible, setVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [content, setContent] = useState(initContent);
  const [center, setCenter] = useState([118.997723, 31.509352] as any);  // 118.796623, 32.059352
  const mapref = useRef({} as LegacyRef<Map>);
  const res = useRequest(getAllVehiclesUsingGET, {
    manual: true
  });
  const locRes = useRequest(getVehicleLocationByUserUsingGET, {
    manual: true
  })
  const events = {
    click: (_: any, mak: { getExtData: () => { content: any; position: any; }; }) => {
      const { content, position } = mak.getExtData();
      setContent(content);
      setInfoPosition(position)
      setVisible(true)
    },
  };
  const infoEvents = {
    close: () => {
      setVisible(false);
      setContent(initContent);
    }
  }
  useEffect(() => {
    if (user?.userId) {
      res.run({
        userId: user?.userId,
      })
      locRes.run({
        userId: user?.userId,
      })
    }

  }, [user?.userId]);
  const MarkersCom = useMemo(() => {
    if (terminalMobile) {
      const findPos: any = locRes.data?.find(loEle => loEle.terminalMobile === terminalMobile);
      const oneContent: any = res.data?.find(ele => ele.id === findPos?.id)
      if (findPos) {
        const { latitude, longitude } = findPos;
        if (!latitude || !longitude)  return null;
        const position = calLocation({ latitude, longitude });
        return <Marker position={position} icon={"https://webapi.amap.com/images/car.png"} events={{
          click: () => {
            setContent(oneContent);
            setInfoPosition(position);
            setVisible(true);
          }
        }} />
      }
    }
    const cars = res.data?.filter(ele => ele.state).map((ele, ind) => {
      const findPos = locRes.data?.find(loEle => loEle.id === ele.id);
      if (findPos) {
        const { latitude, longitude } = findPos;
        if (!latitude || !longitude) return null;
        const position = calLocation({ latitude, longitude });
        return <Markers markers={[{ position, myIndex: ind, content: ele }]} key={`${ind}`} events={events} title={ele.licensePlateNumber} render={() => <div style={{
          background: `url(${CarIcon[ele.state as VehicleState]})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '25px',
          height: '30px',
          color: '#000',
          textAlign: 'center',
          lineHeight: '40px'
        }} />} />
      }
      return ''
    }).filter(ele => ele);
    return cars || []
  }, [res.data, locRes.data, terminalMobile])

  const infoContent = useMemo(() => {
    if (!visible) return
    const { coldStorageFlag, licensePlateNumber, loadWeight, state, vehicleType } = content;
    const { longitude = 0, latitude = 0 } = infoPosition;
    const result = <Row><Col span={8} >车牌:</Col><Col span={16} >{licensePlateNumber}</Col><Col span={8}>车型:</Col><Col span={16}>{vehicleType}</Col><Col span={8}>载重:</Col><Col span={16}>{loadWeight}kg</Col><Col span={9}>是否带冷藏装置:</Col><Col span={15}>{coldStorageFlag}</Col><Col span={8}>在线状态:</Col><Col span={16}>{VehicleStateWord[state]}</Col><Col span={8}>经纬度:</Col><Col span={16}>{longitude.toFixed(1)}, {latitude.toFixed(1)}</Col><Col><Button disabled={state !== VehicleState.online} onClick={() => {
      setDetailVisible(true)
    }} className='mt10'>查看车厢监控</Button><Button className='ml10' disabled={state !== VehicleState.online} onClick={() => {
      setTerminalMobile(content.terminalMobile);
      history.push({
        pathname: '/monitor/trackMonitor',
      }, {
        id: 'test'
      })
    }}>定位跟踪</Button></Col></Row>
    return result
  }, [content, infoPosition, visible, setDetailVisible])

  useEffect(() => {
    const obj = locRes.data?.find(ele => ele.terminalMobile === terminalMobile) || {};
    const { longitude = 0, latitude = 0 } = obj;
    if (longitude && latitude) {
      const position = calLocation({ latitude, longitude })
      const newCenter = [position.longitude, position.latitude];
      setCenter(newCenter)
    }
  }, [terminalMobile, locRes.data])

  return (
    <PageContainer ghost>
      <SelectVehicle />
      <div className={styles.container}>
        <Map amapkey={'a6d72a47007d82705f0269b391b37656'} center={center} zoom={terminalMobile ? 20 : 10} resizeEnable={true} ref={mapref as Ref<any>}>
          {MarkersCom}
          <InfoWindow position={infoPosition} visible={visible} autoMove={true} events={infoEvents}
          >
            {infoContent}
          </InfoWindow>
        </Map>
      </div>
      <Detail visible={detailVisible} setVisible={setDetailVisible} terminalMobile={content.terminalMobile} state={content.state}></Detail>
    </PageContainer>
  );
};

export default VehicleMonitorPage;
