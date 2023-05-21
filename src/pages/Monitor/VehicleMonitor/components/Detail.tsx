import { getCurrentTempHumiUsingGET } from '@/services/logosticsmanagement/zhongduantongxinguanliApi'
import { useRequest } from '@umijs/max'
import { Col, Drawer, Empty, Row, Skeleton } from 'antd'
import React, { memo, useCallback, useEffect, useState } from 'react'

import { Mix } from '@ant-design/plots';
import moment from 'moment';
import { VideoComponent } from './Video';
import { carbinStatusShowFunc, chartConfig } from '@/utils/format';
import { useResHooks } from '@/hooks';
import { CarbinAllStatus, CarbinStatus, CarbinStatusType } from '@/const/const';


const commonConfig = {
    appendPadding: 8,
  tooltip: {
      shared: true,
  },
  syncViewPadding: true,
}

export const Detail = memo(({ visible, setVisible, terminalMobile }: any) => {
    const res = useRequest(getCurrentTempHumiUsingGET, {
        manual: true
    });

    const [configSeries, setConfigSeries] = useState<any>({});
    const [configDate, setConfigDate] = useState<any>({});
    const { tempHumiRes } = useResHooks()

    useEffect(() => {
        if (visible && terminalMobile) {
            res.run({
                terminalMobile
            });
            tempHumiRes?.run({
                terminalMobile: '040662100880', // TODO
                // startTime: moment().subtract({ hour: 12 }).format('yyyy-MM-DD HH:mm:ss'),
                startTime: '2013-05-05 00:00:00',
                endTime: moment().format('yyyy-MM-DD HH:mm:ss')
            })
        }
    }, [visible, terminalMobile])
    console.log('%c [ visible ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', tempHumiRes?.data)

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

    const mixCom = useCallback((type: CarbinStatusType) => {
        const data = configSeries[type] || [];
        console.log('%c [ data ]-114', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        const date = configDate[type] || [];

        if (type === 'TEMP_HUMI' || type === 'DO_DISOXY') {

            return <>
                <h3 className='mt10'>{CarbinStatus[type]}</h3>
                {
                    !date.length ? <Empty /> : <div style={{ height: 280 }} className='mt10'>
                        <Mix {...commonConfig} plots={[{
                            type: 'column',
                            options: {
                                data: data[0].data,
                                xField: 'date',
                                yField: 'value',
                                meta: {
                                    ...data[0].meta,
                                },
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
                !date.length ? <Empty /> : <div style={{ height: 280 }} className='mt10'>
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




    return <Drawer width={1000} title="详情" onClose={() => {
        setVisible(false)
    }} open={visible}>
        <Row gutter={16}>
            {carbinStatusShowFunc(res.data as API.RetSensor[])}
            <Col span={24}>
                <Skeleton loading={tempHumiRes?.loading} className='mt20'>
                    {CarbinAllStatus.map(ele => mixCom(ele as CarbinStatusType))}

                </Skeleton>
            </Col>
            <Col span={24}>
                <VideoComponent terminalMobile={terminalMobile} visible={visible} />
            </Col>
        </Row>
    </Drawer>
})