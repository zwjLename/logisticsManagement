import { MinuteDateFormat } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import SelectVehicle from '@/components/SelectVehicles';
import { Button, DatePicker, Empty, Row, Skeleton } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useResHooks } from '@/hooks';
import { Mix } from '@ant-design/plots';
import { CarbinAllStatus, CarbinStatus, CarbinStatusType } from '@/const/const';

const { RangePicker } = DatePicker;
const CarbinEnvPage: React.FC = () => {
  const { tempHumiRes } = useResHooks();
  const { terminalMobile } = useModel('global');
  const [range, setRange] = useState([dayjs().startOf('day').format(MinuteDateFormat), dayjs().endOf('day').format(MinuteDateFormat)]);
  const [configSeries, setConfigSeries] = useState<any>({});
  const [configDate, setConfigDate] = useState<any>({});

  const onChange = (e: any) => {
    setRange([
      dayjs(e[0]).format(MinuteDateFormat),
      dayjs(e[1]).format(MinuteDateFormat)
    ])
  }

  useEffect(() => {
    if (terminalMobile) {

      const [startTime, endTime] = range;
      tempHumiRes?.run({
        terminalMobile, // 040662100880 TODO
        startTime,
        endTime
      })
    }
  }, [terminalMobile, range]);

  useEffect(() => {

    let config: any = {};
    let dateConfig: any = {};
    for (const type of CarbinAllStatus) {
      const datas = tempHumiRes.data?.filter(ele => ele.sensorType === type) || [];
      const date = datas.map(ele => ele.time);
      if (type === 'TEMP_HUMI') {
        dateConfig.TEMP_HUMI = date;
        config.TEMP_HUMI = [({
          data: datas.map(da => ({
            value: da.temp,
            date: da.time
          })),
          meta: {
            value: {
              alias: '温度'
            }
          }
        }), {
          data: datas.map(da => ({
            value: da.humi,
            date: da.time
          })),
          meta: {
            value: {
              alias: '湿度'
            }
          }
        }];
      } else if (type === 'DO_DISOXY') {
        dateConfig.DO_DISOXY = date;
        config.DO_DISOXY = [{
          data: datas.map(da => ({
            value: da.doValue,
            date: da.time
          })),
          meta: {
            value: {
              alias: '溶解氧'
            }
          }
        }, {
          data: datas.map(da => ({
            value: da.tempWater,
            date: da.time
          })),
          meta: {
            value: {
              alias: '水温'
            }
          }
        }]
      } else {
        dateConfig.CO2 = date;
        config.CO2 = [{
          data: datas.map(da => ({
            value: da.co2,
            date: da.time
          })),
          meta: {
            value: {
              alias: '二氧化碳'
            }
          }
        }]
      }
    }

setConfigSeries(config);
setConfigDate(dateConfig)

  }, [tempHumiRes?.data])

  const handleParams = (params: any) => {
    let url = ''
    // eslint-disable-next-line guard-for-in
    for (let key in params) {
      url += key + "=" + params[key] + "&";
    }
    if (url.charAt(url.length - 1) === "&" || url.charAt(url.length - 1) === "？") {
      url = url.slice(0, url.length - 1);
    }
    console.log("..url", `https://www.njzhny.com:8443/micro-vehicles/terminal/exportTmpHmiList?${url}`)
    window.location.href = `https://www.njzhny.com:8443/micro-vehicles/terminal/exportTmpHmiList?${url}`

  }

  const mixCom = useCallback((type: CarbinStatusType) => {
    const data = configSeries[type] || [];
    const date = configDate[type] || [];
   
      if (type === 'TEMP_HUMI' || type === 'DO_DISOXY') {
        
        return <>
          <h3 className='mt10'>{CarbinStatus[type]}</h3>
          {
            !date.length ? <Empty/> : <div style={{height: 280}} className='mt10'>
            <Mix plots={[{
              type: 'line',
              options: {
                data: data[0].data,
                xField: 'date',
                yField: 'value',
                meta: data[0].meta
              }
            }, {
              type: 'line',
              options: {
                data: data[1].data,
                xField: 'date',
                yField: 'value',
                xAxis: false,
                meta: data[1].meta,
                color: '#FF6B3B',
              }
            }]} />
            </div>
          }
          
        </>
      }
      return <>
      <h3 className='mt10'>{CarbinStatus[type]}</h3>
      {
        !date.length ? <Empty/> : <div style={{height: 280}} className='mt10'>
        <Mix plots={[{
          type: 'line',
          options: {
            data: data[0].data,
            xField: 'date',
            yField: 'value',
            meta: data[0].meta
          }
        }]} /></div>
      }
    </>
    

  }, [configSeries])

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

          <Button className='ml10' onClick={async () => {

            const [startTime, endTime] = range;
            handleParams({
              terminalMobile,
              startTime,
              endTime
            })
            // const result = await exportTmpHmiListUsingGET({
            //   terminalMobile,
            //   startTime,
            //   endTime
            // });
            // window.location.href=result
          }}>导出</Button>
        </Row>
      </div>
      <div style={{ height: `calc(100vh - 220px)` }}>
        <Skeleton loading={tempHumiRes?.loading} className='mt20'>
          {CarbinAllStatus.map(ele => mixCom(ele as CarbinStatusType))}

        </Skeleton>
      </div>
    </PageContainer>
  );
};

export default CarbinEnvPage;
