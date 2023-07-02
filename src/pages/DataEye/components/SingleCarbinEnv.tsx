import { carbinStatusShowFunc } from '@/utils/format'
import { Empty, Row } from 'antd';

export const SingleCarbinEnvModal = ({data} : {data: Array<API.RetSensor>}) => {
    console.log('%c [ data ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    return <Row  style={{height: 500}}>{data.length ? carbinStatusShowFunc(data) : <Empty style={{margin: '150px 130px'}}/>}</Row>
}