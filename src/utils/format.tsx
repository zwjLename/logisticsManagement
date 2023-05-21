import { Col, Statistic, notification } from 'antd';
import CountUp from 'react-countup';


// 示例方法，没有实际意义
export function trim(str: string) {
  return str?.trim();
}

export function noticeFunc(type: 'success', { msg, title }: { msg?: string; title?: string }) {
  notification[type]({
    message: title,
    description: msg,
  })
}
export function errorNotice({ msg = '', title = '服务器错误' }) {
  notification.error({
    message: title,
    description: msg,
    placement: 'topRight'
  });
}

export const DateFormat = 'YYYY-MM-DD';
export const MinuteDateFormat = 'YYYY-MM-DD HH:mm:ss';

export enum ROLE {
  'driver' = 'ROLE_DRIVER',
  'collector' = 'ROLE_COLLECTOR',
  'lodaer' = 'ROLE_LOADER'
}
export const ROLEWord = {
  'ROLE_DRIVER': '司机',
  'ROLE_COLLECTOR': '采购员',
  'ROLE_LOADER': '配货员'
}

const formatter = (value: number) => <CountUp end={value} separator="," decimal={1} />;
export const carbinStatusShowFunc = (data: Array<API.RetSensor>) => {
  return data?.map(ele => {
    const { sensorType = '', humi, temp, tempWater, doValue } = ele;
    if (sensorType === "TEMP_HUMI") {
      return <><Col span={4}>
        <Statistic title="温度：℃" value={temp} formatter={formatter as any} precision={1}/>
      </Col><Col span={4}>
          <Statistic title="湿度：%" value={humi} formatter={formatter as any} precision={1}/>
        </Col></>
    } else if (sensorType === "CO2") {
      // eslint-disable-next-line react/jsx-key
      return <Col span={4}>
        <Statistic title="CO2：ppm" value={humi} formatter={formatter as any} precision={1}/>
      </Col>
    } else if (sensorType === "DO_DISOXY") {
      // eslint-disable-next-line react/jsx-key
      return <><Col span={4}>
        <Statistic title="溶解氧(DO)： mg/L" value={doValue} formatter={formatter as any} precision={1}/>
      </Col><Col span={4}>
          <Statistic title="水温：℃" value={tempWater} formatter={formatter as any} precision={1}/>
        </Col></>
    }
    return '';
  })
}

// TODO test
const averageData = [
  {
      date: '2015-02',
      value: 21168,
  },
  {
      date: '2015-08',
      value: 21781,
  },
  {
      date: '2016-01',
      value: 23818,
  },
  {
      date: '2017-02',
      value: 25316,
  },
  {
      date: '2018-01',
      value: 26698,
  },
  {
      date: '2018-08',
      value: 27890,
  },
];
export const chartConfig = {
  appendPadding: 8,
  tooltip: {
      shared: true,
  },
  syncViewPadding: true,
  plots: [
      {
          type: 'column',
          options: {
              data: [
                  {
                      date: '2015-02',
                      value: 160,
                  },
                  {
                      date: '2015-08',
                      value: 245,
                  },
                  {
                      date: '2016-01',
                      value: 487,
                  },
                  {
                      date: '2017-02',
                      value: 500,
                  },
                  {
                      date: '2018-01',
                      value: 503,
                  },
                  {
                      date: '2018-08',
                      value: 514,
                  },
              ],
              xField: 'date',
              yField: 'value',
              // yAxis: {
              //     type: 'log',
              //     max: 100000,
              // },
              meta: {
                  date: {
                      sync: true,
                  },
                  value: {
                      alias: '店数(间)',
                  },
              },
              label: {
                  position: 'middle',
              },
          },
      },
      {
          type: 'line',
          options: {
              data: averageData,
              xField: 'date',
              yField: 'value',
              xAxis: false,
              // yAxis: {
              //     type: 'log',
              //     max: 100000,
              // },
              label: {
                  offsetY: -8,
              },
              meta: {
                  value: {
                      alias: '平均租金(元)',
                  },
              },
              color: '#FF6B3B',
              annotations: averageData.map((d) => {
                  return {
                      type: 'dataMarker',
                      position: d,
                      point: {
                          style: {
                              stroke: '#FF6B3B',
                              lineWidth: 1.5,
                          },
                      },
                  };
              }),
          },
      },
      {
          type: 'line',
          options: {
              data: [
                  {
                      date: '2015-02',
                      value: null,
                  },
                  {
                      date: '2015-08',
                      value: 0.029,
                  },
                  {
                      date: '2016-01',
                      value: 0.094,
                  },
                  {
                      date: '2017-02',
                      value: 0.148,
                  },
                  {
                      date: '2018-01',
                      value: 0.055,
                  },
                  {
                      date: '2018-08',
                      value: 0.045,
                  },
              ],
              xField: 'date',
              yField: 'value',
              xAxis: false,
              yAxis: {
                  line: null,
                  grid: null,
                  position: 'right',
                  max: 0.16,
                  tickCount: 8,
              },
              meta: {
                  date: {
                      sync: 'date',
                  },
                  value: {
                      alias: '递增',
                      formatter: (v: number) => `${(v * 100).toFixed(1)}%`,
                  },
              },
              smooth: true,
              label: {
                  callback: (value: number) => {
                      return {
                          offsetY: value === 0.148 ? 36 : value === 0.055 ? 0 : 20,
                          style: {
                              fill: '#1AAF8B',
                              fontWeight: 700,
                              stroke: '#fff',
                              lineWidth: 1,
                          },
                      };
                  },
              },
              color: '#1AAF8B',
          },
      },
  ],
};