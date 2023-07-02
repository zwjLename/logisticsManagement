import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { useRef, useCallback, useState } from 'react';
import { getAllDistributionListUsingGET } from '@/services/logosticsmanagement/fenpaidiaoduguanlijiekou';
import { Divider, Modal } from 'antd';
import { getBindTerminalInfoByVehicleIdUsingGET } from '@/services/logosticsmanagement/cheliangguanlijiekou';

import { DisTaskModal } from '../components/DisTask';
import { SingleCarbinEnvModal } from '../components/SingleCarbinEnv';
import { TransportModal } from '../components/TransportModal';
import { DisStatus, DisStatusWord } from '@/const/const';

import type { ProColumns } from '@ant-design/pro-components';
import { getTempHumiForTimeUsingGET } from '@/services/logosticsmanagement/zhongduantongxinguanliApi';
import { useEffect } from 'react';
import { useResHooks } from '@/hooks';
import { calLocation } from '@/utils/utils';
import { noticeFunc } from '@/utils/format';


const DeliverTaskPage: React.FC = () => {
    const { user } = useModel('global')
    const actionRef = useRef();

    const [disOpen, setDisOpen] = useState(false);
    // const [disTaskId, setDisTaskId] = useState('');
    const [rec, setRec] = useState<any>({} as any);

    const [transportOpen, setTransportOpen] = useState(false);
    const [carbinOpen, setCarbinOpen] = useState(false);
    const [transPositionResultList, setTransPositionResultList] = useState([] as Array<{ longitude: number, latitude: number }>);

    const { orbitRes } = useResHooks();
// 车厢环境
const carbinEnv = useRequest(getTempHumiForTimeUsingGET, {
    manual: true,
    onSuccess: (res) => {
        if (res && res?.length) {

            setCarbinOpen(true)
        } else {
            noticeFunc('success', {
                msg: '该车厢无环境信息'
            })
        }
    }
});
    // 车辆信息  getVehicleInfoByVehicleNumUsingGET
    const getVehicleInfo = useRequest(getBindTerminalInfoByVehicleIdUsingGET, {
        manual: true,
        onSuccess: (res, req) => {
            const type = req[0]?.type;
            if (res) {
                const resName = type === 1 ? orbitRes : carbinEnv
                resName.run({
                    terminalMobile: res,
                    startTime: rec.startTime,
                    endTime: rec.endTime
                })
            }
        }
    })

    useEffect(() => {
        if (orbitRes.data?.length) {
            const pos = orbitRes.data?.filter(ele => {
                const { longitude, latitude } = ele;
                return longitude && latitude;
            }).map(ele => {
                const { longitude, latitude } = ele
                const position = calLocation({ longitude, latitude });
                return position;
            });
            if (pos.length) {
                setTransPositionResultList(pos);
            }
        } else {
            if (getVehicleInfo?.data) {

                noticeFunc('success', {
                    msg: '该车辆无轨迹信息'
                })
            }


            setTransPositionResultList([])
        }
    }, [orbitRes.data, getVehicleInfo?.data])

    





    const tableRequest: any = useCallback(async (params: any) => {
        const { current, pageSize, ...searchParams } = params;
        if (!user.userId) return;
        const res = await getAllDistributionListUsingGET({
            userId: user.userId,
            page: current,
            pageSize,
            ...searchParams
        });
        return {
            data: res.data?.list || [],
            total: res.data?.pageNum
        }
    }, [user.userId])
    const columns: ProColumns<any>[] = [
        {
            title: '配送司机',
            dataIndex: 'driverName',
            hideInSearch: true,
        },
        {
            title: '配送车辆车牌',
            dataIndex: 'licensePlateNumber',
            valueType: 'text',
            search: {
                transform: (value: string) => ({
                    vehicleNumber: value
                })
            }
        },
        {
            title: '配送状态',
            dataIndex: 'distributionState',
            // tip: '名称是唯一的 key',
            hideInSearch: true,
            render: (status: DisStatus) => DisStatusWord[status]
        }, {
            title: '配送日期',
            valueType: 'date',
            hideInTable: true,
            search: {
                transform: (value: string) => ({ distributeDateStr: value })
            }
        }, {
            title: '配送开始时间',
            dataIndex: 'startTime',
            valueType: 'dateTime',
            hideInSearch: true,
            render: (val: any, record: any) => {
                return record.startTime
            }
        }, {
            title: '配送结束时间',
            dataIndex: 'endTime',
            valueType: 'dateTime',
            hideInSearch: true,
            render: (val: any, record: any) => {
                return record.endTime
            }
        }, {
            title: '订单数',
            dataIndex: 'alloctionNum',
            hideInSearch: true,
        }, {
            title: '操作',
            dataIndex: 'ope',
            hideInSearch: true,
            search: false,
            render: (_: any, record: any) => {
                return (<><a onClick={() => {
                    setRec(record)
                    //先根据车牌获取车辆信息
                    getVehicleInfo.run({
                        vehicleNum: record.licensePlateNumber,
                        type: 1
                    })
                }}>路线轨迹</a> <Divider type="vertical" />
                    <a onClick={() => {
                        setRec(record)
                        //先根据车牌获取车辆信息
                        getVehicleInfo.run({
                            vehicleNum: record.licensePlateNumber,
                            type: 2
                        });
                    }}>车厢环境</a><Divider type="vertical" /><a onClick={() => {
                        // setDisTaskId(record.id);
                        setRec(record)
                        setDisOpen(true)
                    }}>配送订单</a></>)
            }
        }
    ];
    return (
        <PageContainer>
            <div >
                <ProTable
                    actionRef={actionRef}
                    rowKey="id"
                    request={tableRequest}
                    columns={columns as any}
                />
            </div>
            <Modal open={transportOpen} title="物流" footer={null} onCancel={() => setTransportOpen(false)} maskClosable={false} destroyOnClose={true}>
                {/* TODO 去掉mock代码*/}
                <TransportModal orderStteShow={false} transPositionResultList={transPositionResultList
                    //     [{
                    //     longitude:
                    //         118.99771073114343, latitude: 31.501327282679718
                    // }, {
                    //     "longitude": 118.99794762416336,
                    //     "latitude": 31.501760057353593
                    // }, {
                    //     "longitude": 118.99796063667567,
                    //     "latitude": 31.50138004100149
                    // }, {
                    //     "longitude": 118.99776391312396,
                    //     "latitude": 31.501220426753846
                    // }]
                } />
            </Modal>
            <Modal open={carbinOpen} title="车厢环境" footer={null} onCancel={() => setCarbinOpen(false)} maskClosable={false} destroyOnClose={true}>
                {getVehicleInfo?.data && <SingleCarbinEnvModal data={carbinEnv.data || []} />}
            </Modal>
            <Modal open={disOpen} title="配送订单" footer={null} onCancel={() => setDisOpen(false)} maskClosable={false} destroyOnClose={true} width={800} >
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}><DisTaskModal id={rec?.id} /></div>
            </Modal>
        </PageContainer>
    );
};

export default DeliverTaskPage;
