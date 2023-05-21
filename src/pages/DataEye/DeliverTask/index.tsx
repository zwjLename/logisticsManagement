import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { useRef, useCallback, useState } from 'react';
import { getAllDistributionListUsingGET } from '@/services/logosticsmanagement/fenpaidiaoduguanlijiekou';
import { Divider, Modal } from 'antd';
import { queryHmiTmpByIdUsingGET } from '@/services/logosticsmanagement/dingdanguanli';
import { getVehicleInfoByVehicleNumUsingGET } from '@/services/logosticsmanagement/cheliangguanlijiekou';

import { DisTaskModal } from '../components/DisTask';
import { SingleCarbinEnvModal } from '../components/SingleCarbinEnv';
import { TransportModal } from '../components/TransportModal';
import { DisStatus, DisStatusWord } from '@/const/const';


const DeliverTaskPage: React.FC = () => {
    const { user } = useModel('global')
    const actionRef = useRef();

    const [disOpen, setDisOpen] = useState(false);
    const [disTaskId, setDisTaskId] = useState('');

    const [transportOpen, setTransportOpen] = useState(false);
    const [carbinOpen, setCarbinOpen] = useState(false);
    // 车辆信息
    const getVehicleInfo = useRequest(getVehicleInfoByVehicleNumUsingGET, {
        manual: true,
        onSuccess: (res) => {
            console.log('%c [ res ]-24', 'font-size:13px; background:pink; color:#bf2c9f;', res)

        }
    })
    // 根据终端号获取车辆一段时间内的行驶轨迹

    // 车厢环境
    const carbinenv = useRequest(queryHmiTmpByIdUsingGET, {
        manual: true
    });

    const tableRequest: any = useCallback(async (params: any) => {
        const { current, pageSize, ...searchParams } = params;
        if (!user.userId) return;
        const res = await getAllDistributionListUsingGET({
            userId: user.userId,
            page: current,
            pageSize,
            ...searchParams
        });
        console.log(res);
        return {
            data: res.data?.list || [],
            total: res.data?.pageNum
        }
    }, [user.userId])
    const columns = [
        {
            title: '配送司机',
            dataIndex: 'driverName',
        },
        {
            title: '配送车辆车牌',
            dataIndex: 'licensePlateNumber',
            valueType: 'text',
        },
        {
            title: '配送状态',
            dataIndex: 'distributionState',
            // tip: '名称是唯一的 key',
            render: (status: DisStatus) => DisStatusWord[status] 
        }, {
            title: '配送开始时间',
            dataIndex: 'startTime',
            valueType: 'dateTime',
            render: (val: any, record: any) => {
                return record.startTime
            }
        }, {
            title: '配送结束时间',
            dataIndex: 'endTime',
            valueType: 'dateTime',
            render: (val: any, record: any) => {
                return record.endTime
            }
        }, {
            title: '订单数',
            dataIndex: 'alloctionNum'
        }, {
            title: '操作',
            dataIndex: 'ope',
            search: false,
            render: (_: any, record: any) => {
                return (<><a onClick={() => {
                    //先根据车牌获取车辆信息
                    getVehicleInfo.run({
                        vehicleNum: record.licensePlateNumber
                    })
                }}>路线轨迹</a> <Divider type="vertical" />
                    <a onClick={() => {
                        carbinenv.run({
                            mailOrderId: record.id
                        });
                        setCarbinOpen(true)
                    }}>车厢环境</a><Divider type="vertical" /><a onClick={() => {
                        setDisTaskId(record.id);
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
                <TransportModal orderStteShow={false} transPositionResultList={[{
                    longitude:
                        118.99771073114343, latitude: 31.501327282679718
                }, {
                    "longitude": 118.99794762416336,
                    "latitude": 31.501760057353593
                }, {
                    "longitude": 118.99796063667567,
                    "latitude": 31.50138004100149
                }, {
                    "longitude": 118.99776391312396,
                    "latitude": 31.501220426753846
                }]} />
            </Modal>
            <Modal open={carbinOpen} title="车厢环境" footer={null} onCancel={() => setCarbinOpen(false)} maskClosable={false} destroyOnClose={true}>
                <SingleCarbinEnvModal data={carbinenv.data || []} />
            </Modal>
            <Modal open={disOpen} title="配送订单" footer={null} onCancel={() => setDisOpen(false)} maskClosable={false} destroyOnClose={true} width={800} >
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}><DisTaskModal id={disTaskId} /></div>
            </Modal>
        </PageContainer>
    );
};

export default DeliverTaskPage;
