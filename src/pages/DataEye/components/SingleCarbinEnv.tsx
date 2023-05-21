import { carbinStatusShowFunc } from '@/utils/format'
import { Empty, Row } from 'antd';

export const SingleCarbinEnvModal = ({data} : {data: Array<API.RetSensor>}) => {
    return <Row  style={{height: 500}}>{data.length ? carbinStatusShowFunc(data) : <Empty style={{margin: '150px 130px'}}/>}</Row>
}