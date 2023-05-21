import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Divider, Modal } from 'antd';
import { useRef, useCallback, useState } from 'react';
import { getAllOrderListUsingGET, queryHmiTmpByIdUsingGET, queryLogisticsByIdUsingGET } from '@/services/logosticsmanagement/dingdanguanli';
import { SingleCarbinEnvModal } from '../components/SingleCarbinEnv';
import { TransportModal } from '../components/TransportModal';
import { getBindTerminalInfoByVehicleIdUsingGET } from '@/services/logosticsmanagement/cheliangguanlijiekou';

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
    const getTermiMobile = useRequest(getBindTerminalInfoByVehicleIdUsingGET, {
        manual: true,
    })

    const tableRequest = useCallback(async () => {
        const res = await getAllOrderListUsingGET({

            userId: user.userId,
        });
        return {
            data: res.data?.list || [],
            total: res.data?.total
        }
    }, [user.userId])
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
        },
        {
            title: '送达日期',
            dataIndex: 'hopeRcvTime',
            valueType: 'date',
        }, {
            title: '联系人',
            dataIndex: 'revName'
        }, {
            title: '电话',
            dataIndex: 'revTel'
        }, {
            title: '状态',
            dataIndex: 'mailState'
        }, {
            title: '操作',
            dataIndex: 'operate',
            render: (_: any, record: any) => {
                return <>
                    <a onClick={() => {

                        getTermiMobile.run({
                            vehicleNum: record.id
                        }).then(() => {
                            setTransportOpen(true)
                        }).catch(() => { })


                    }}>车辆轨迹</a>
                    <Divider type="vertical" />
                    <a onClick={() => {
                        getTermiMobile.run({
                            vehicleNum: record.id
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
                    search={false}
                    actionRef={actionRef}
                    rowKey="id"
                    request={tableRequest}
                    columns={columns}
                />
            </div>
            <Modal open={transportOpen} title="物流" footer={null} onCancel={() => setTransportOpen(false)} maskClosable={false} destroyOnClose={true}>
                {/* TODO 去掉mock代码*/}
                <TransportModal orderStte={transport.data?.orderStte || '未知'} transPositionResultList={transport.data?.transPositionResultList || [{
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
        </PageContainer>
    );
};

export default AllOrdersPage;
