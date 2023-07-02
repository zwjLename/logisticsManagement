import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { useLocation } from 'umi';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { websocketurl } from '@/const/url';
import { calLocation, getFlatternDistance } from '@/utils/utils';
import { Map, Marker, Polyline } from 'react-amap';
import SelectVehicle from '@/components/SelectVehicles';

const minPrecision = 10; //最小精度
const maxPrecision = 10000;//最大精度
const TrackMonitorPage: React.FC = () => {
  const { terminalMobile } = useModel('global');
  const state = useLocation();
  const [positionData, setPositionData] = useState<Array<{ latitude: number, longitude: number }>>([]);
  const [logisticsData, setLogisticsData] = useState<Array<{
    x: number,
    y: number,
    sp: number,
    ag: number,
    tm: number,
  }>>([])
  const [center, setCenter] = useState([118.997723, 31.509352]);
  const ws = useRef<any>();

  useEffect(() => {
    if (positionData?.length === 1) {
      setCenter([positionData[0].longitude, positionData[0].latitude])
    }
  }, [positionData]);
  useEffect(() => {
    setPositionData([]);
    setCenter([118.997723, 31.509352])
  }, [terminalMobile]);
   //关闭连接
  //  const closeWebSocket=()=> {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // ws.current && ws.current.close();
    // }
  useEffect(() => {
    if (!terminalMobile) return;
    // closeWebSocket();
     ws.current = new WebSocket(websocketurl);
    ws.current.onopen = function () {          //处理连接开启事件
      console.log('SocketOpening');
      let messageObj = {
        terminalId: terminalMobile,
        type: 'RTP',
      }
      let messageJson = JSON.stringify(messageObj);
      console.log('%c [ messageJson ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', messageJson, terminalMobile)
      ws.current.send(messageJson);
    };

    ws.current.onclose = function () {
      console.log('SocketClosing');
    }


    ws.current.onmessage = function (data: any) {      //处理信息
      console.log('%c [ data ]-33', 'font-size:13px; background:pink; color:#bf2c9f;', data)
      if (data.data.indexOf('PositionResult') !== -1) {
        let latitude = Number(data.data.match(/latitude=(\S*),/)[1]);
        let longitude = Number(data.data.match(/longitude=(\S*),/)[1]);
        //            	 let altitude= Number(data.data.match(/altitude=(\S*),/)[1]);
        let speed = Number(data.data.match(/speed=(\S*),/)[1]);
        let direction = Number(data.data.match(/direction=(\S*),/)[1]);
        let dateTime = Number(data.data.match(/dateTime=(\S*)\)/)[1]);


        console.log(latitude, longitude, speed, direction, dateTime);

        if (positionData.length === 0) {
          if (longitude !== 0 && latitude !== 0) {
            const position = calLocation({ longitude, latitude })
            setPositionData(pre => ([...pre, { ...position }]))
            setLogisticsData(pre => ([...pre, {
              x: longitude / 1000000,
              y: latitude / 1000000,
              sp: speed,
              ag: direction,
              tm: dateTime,
            }]))
          }
        } else {
          let distance = getFlatternDistance(logisticsData[logisticsData.length - 1].y, logisticsData[logisticsData.length - 1].x, latitude / 1000000, longitude / 1000000);
          console.log('距离:' + distance, '米(当前精度范围:' + minPrecision + "米~" + maxPrecision + "米)");
          if (distance > maxPrecision) {
            return;
          } else if (distance < minPrecision) {
            return;
          } else {
            const position = calLocation({ longitude, latitude })
            setPositionData(pre => ([...pre, { ...position }]))
            setLogisticsData(pre => ([...pre, {
              x: longitude / 1000000,
              y: latitude / 1000000,
              sp: speed,
              ag: direction,
              tm: dateTime,
            }]))
          }
        }
      };
    };
    
  }, [terminalMobile, ws]);

  useEffect(()=>{
    return () => {
       ws.current?.close() 
    }
  }, [ws])

  const MarkersCom = useMemo(() => {
    // if (positionData.length > 1) {
    console.log('%c [ positionData ]-102', 'font-size:13px; background:pink; color:#bf2c9f;', positionData)
    //添加汽车
    // let longitude = positionData[positionData.length - 1].longitude;
    // let latitude = positionData[positionData.length - 1].latitude;
    // let angle = Number(logisticsData[logisticsData.length - 1].ag) - 90;
    // let lastOnLineTime = logisticsData[logisticsData.length - 1].tm.toString();
    return (
      <>
        {/* <Marker position={{longitude, latitude}} icon="https://webapi.amap.com/images/car.png"  angle={angle}/>  */}
        {/* offset={(window as any).AMap?.Pixel(0, -13)} */}

      </>
    )
    // }
  }, [positionData, logisticsData])
  return (
    <PageContainer ghost>
      <SelectVehicle />
      <div className={styles.container}>
        <Map amapkey={'a6d72a47007d82705f0269b391b37656'} center={center} zoom={terminalMobile ? 15 : 10} resizeEnable={true} >
          {MarkersCom}
          {positionData.length ? <Marker  offset={[-13, -10]} position={{ longitude: positionData[positionData.length - 1].longitude, latitude: positionData[positionData.length - 1].latitude }} icon="https://webapi.amap.com/images/car.png" angle={Number(logisticsData[logisticsData.length - 1].ag) - 90} /> : null}
          <Polyline
            path={positionData.length ? positionData : []}
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

export default TrackMonitorPage;
