import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Divider, Modal } from 'antd';
import { useRef, useCallback, useState } from 'react';
import { getAllOrderListUsingGET, queryHmiTmpByIdUsingGET, queryLogisticsByIdUsingGET, searchOrderStatisticalInfoByConditionByPageUsingGET } from '@/services/logosticsmanagement/dingdanguanli';
import { SingleCarbinEnvModal } from '../components/SingleCarbinEnv';
import { TransportModal } from '../components/TransportModal';
import { getBindTerminalInfoByVehicleIdUsingGET } from '@/services/logosticsmanagement/cheliangguanlijiekou';
import { AllOrderStatus } from '../const';
import { noticeFunc } from '@/utils/format';

const AllOrdersPage: React.FC = () => {
    const { user } = useModel('global')
    const actionRef = useRef();

    const [transportOpen, setTransportOpen] = useState(false);
    const [carbinOpen, setCarbinOpen] = useState(false);

    // 物流
    const transport = useRequest(queryLogisticsByIdUsingGET, {
        manual: true
    });

    // 车厢环境
    const carbinenv = useRequest(queryHmiTmpByIdUsingGET, {

        manual: true
    });

    // 根据车牌获取终端号
    // const getTermiMobile = useRequest(getBindTerminalInfoByVehicleIdUsingGET, {
    //     manual: true,
    // })
    // 车辆轨迹
    const getTermiMobile = useRequest(queryLogisticsByIdUsingGET, {
        manual: true
    })
    const tableRequest = useCallback(async (params: any) => {
        const res = await searchOrderStatisticalInfoByConditionByPageUsingGET({

            userId: user.userId,
            ...params
        });
        return {
            data: res.data?.list || [],
            total: res.data?.total
        }
    }, [user.userId]);
    // 车辆环境
    const getVehicleEnv = useRequest(queryHmiTmpByIdUsingGET, {
        manual: true
    })
    const columns = [
        {
            title: '客户单位',
            dataIndex: 'corporateName',
            // tip: '名称是唯一的 key',
        },
        {
            title: '目的地',
            dataIndex: 'rcvAddress',
            valueType: 'text',
            search: false
        },
        {
            title: '送达日期',
            dataIndex: 'hopeRcvTime',
            hideInSearch: true,
        },
        {
            title: '送达日期',
            dataIndex: 'hopeRcvTime',
            hideInTable: true,
            valueType: 'dateRange',
            search: {
                transform: (value: any) => {
                    return {
                        startTime: `${value[0]} 00:00:00`,
                        endTime: `${value[1]} 23:59:59`,
                    };
                },
            },
        }, {
            title: '联系人',
            dataIndex: 'revName',
            search: false
        }, {
            title: '电话',
            dataIndex: 'revTel', search: false
        }, {
            title: '状态',
            dataIndex: 'mailState',
            render: (text: keyof typeof AllOrderStatus) => AllOrderStatus[text], search: false
        }, {
            title: '操作',
            dataIndex: 'operate', search: false,
            render: (_: any, record: any) => {
                return <>
                    <a onClick={() => {
                        getTermiMobile.run({
                            // vehicleNum: record.id
                            mailOrderId: record.id
                        }).then((res) => {
                            if (Array.isArray(res?.transPositionResultList) && res?.transPositionResultList?.length) {
                                setTransportOpen(true)
                            } else {
                                noticeFunc('success', {
                                    msg: '配送车辆无绑定终端设备'
                                })
                            }
                        }).catch(() => { })


                    }}>车辆轨迹</a>
                    <Divider type="vertical" />
                    <a onClick={() => {
                        getVehicleEnv.run({
                            // vehicleNum: record.id
                            mailOrderId: record.id
                        }).then(() => {
                            setCarbinOpen(true)
                        }).catch(() => { })
                    }}>车厢环境</a>
                </>
            }
        }
    ];

    return (
        <PageContainer>
            <div >
                <ProTable
                    pagination={false}
                    search={true}
                    actionRef={actionRef}
                    rowKey="id"
                    request={tableRequest}
                    columns={columns as any}
                />
            </div>
            <Modal open={transportOpen} title="物流" footer={null} onCancel={() => setTransportOpen(false)} maskClosable={false} destroyOnClose={true}>
                {/* TODO 去掉mock代码*/}
                <TransportModal orderStte={transport.data?.orderStte || '无终端'} transPositionResultList={transport.data?.transPositionResultList ||
                    [
                        //     {
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
                        // }
                    ]
                } />
            </Modal>
            <Modal open={carbinOpen} title="车厢环境" footer={null} onCancel={() => setCarbinOpen(false)} maskClosable={false} destroyOnClose={true}>
                <SingleCarbinEnvModal data={carbinenv.data || []} />
            </Modal>
        </PageContainer>
    );
};

export default AllOrdersPage;
