import { realTimeVideoControlUsingPOST, realTimeVideoRequestUsingPOST, replayRequestUsingPOST, replayRequestUsingPOST1 } from '@/services/logosticsmanagement/zhongduantongxinguanliApi';
import { useRequest } from '@umijs/max';
import { Col, DatePicker, Radio, Row, Select, Tabs } from 'antd'
import React, { memo, useState, useEffect, useMemo } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;
export const VideoComponent = memo(({ terminalMobile, visible, state }: any) => {
    const [activekey, setActiveKey] = useState('1');
    const [channelNo, setChannelNo] = useState(1);
    const [replayMutiple, setReplayMutiple] = useState(0);
    const [dateRange, setDateRange] = useState([] as string[]);
    const realRes = useRequest(realTimeVideoRequestUsingPOST, {
        manual: true
    })
    const realCloseRes = useRequest(realTimeVideoControlUsingPOST, {
        manual: true
    })
    const replayRes = useRequest(replayRequestUsingPOST1, {
        manual: true
    })
    const replayCloseRes = useRequest(replayRequestUsingPOST, {
        manual: true,
    })
    const Vi = useMemo(() => {
        console.log(activekey)
        return <Row><Col ><Radio.Group value={channelNo} onChange={(e) => setChannelNo(e.target.value)}>
            <Radio value={1}>驾驶室</Radio>
            <Radio value={2}>车厢</Radio>
            </Radio.Group>
            </Col>{activekey === '2' ? <Col span={19}>
            <RangePicker showTime onChange={(e:any) => {
                if (moment(e[0]).isValid() && moment(e[1]).isValid()) {
                    const startDate = moment(e[0]).format('YYMMDDHHMMSS');
                    const endDate = moment(e[1]).format('YYMMDDHHMMSS');
                    setDateRange([startDate, endDate])
                }
                
            }}/><Select className='ml10'  value={replayMutiple} onChange={e => {
                setReplayMutiple(e)
            }}><Select.Option value={0}>正常</Select.Option><Select.Option value={1}>1.x</Select.Option><Select.Option value={2}>2.x</Select.Option></Select>
        </Col> : null}</Row>
    }, [activekey, replayMutiple, channelNo])
    const items = [{
        key: '1',
        label: '实时视频',
        children: Vi
    }, {
        key: '2',
        label: '视频回放',
        children: Vi
    }]
    const onChange = (e: string) => {
        setActiveKey(e)
    }
    useEffect(() => {
        if (visible) {
            // if (state === VehicleState.online) {
                if (activekey === '1') {
                    replayCloseRes.run({
                        terminalMobile,
                        channelNo
                    })
                    realRes.run({
                        terminalMobile,
                        channelNo
                    })
                } else if (dateRange.length){
                    realCloseRes.run({
                        terminalMobile,
                        channelNo
                    })
                    replayRes.run({
                        terminalMobile,
                        
                        // param: {
                        //     channelNo,
                        //     "replayType": 0,
                        //     replayMutiple,
                        //     endTime: dateRange[1],
                        //     startTime: dateRange[0]
                        // }
                    }, {
                        replayMutiple,
                        channelNo,
                        replayType: replayMutiple ? 1 : 0,
                        endTime: dateRange[1],
                        startTime: dateRange[0]
                    })
                }
            // }

        } else {
            // if (state === VehicleState.online) {

                // 关闭视频流
                realCloseRes.run({
                    terminalMobile,
                    channelNo
                })
                replayCloseRes.run({
                    terminalMobile,
                    channelNo
                })
            // }

        }
    }, [activekey, visible, channelNo, state, dateRange, replayMutiple]);
    return <Tabs activeKey={activekey} items={items} onChange={onChange} />
})