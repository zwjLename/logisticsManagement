import { useModel } from '@umijs/max';
import { Col, List, Modal, Typography } from 'antd';

export const DetailModal = () => {
    const { sumVisible, setSumVisible, sum, setSum } = useModel('Manipulate.Purchase.index');

    return (
        <Modal title="订单详情" open={sumVisible} footer={null} onCancel={() => {setSumVisible(false); setSum([])}} >
            <List dataSource={sum} renderItem={(item) => (
                <List.Item>
                    <Col span={12}><Typography.Text mark>{item.goodsName}</Typography.Text></Col>
                    <Col span={12}>{item.number} {item.unitdesc} </Col>
        
                </List.Item>
            )}></List>
        </Modal>
    )
}