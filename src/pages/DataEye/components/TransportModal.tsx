import React from 'react'
import { Map, Polyline } from 'react-amap';

interface Props {
    orderStte?: string;
    orderStteShow?: boolean;
    transPositionResultList: {longitude: number, latitude: number}[]
}
export const TransportModal = ({ orderStte, transPositionResultList = [], orderStteShow=true }: Props) => {

    return (
        <div style={{ height: 500, marginBottom: '20px' }}>
            {orderStteShow ? <div>当前状态：{orderStte}</div> : null}
            <Map amapkey={'a6d72a47007d82705f0269b391b37656'} center={transPositionResultList.length ? [transPositionResultList[0].longitude, transPositionResultList[0].latitude] : [118.997723, 31.509352]} zoom={16} resizeEnable={true}>
                <Polyline
                    showDir={true}
                    path={transPositionResultList}
                    style={{
                        strokeColor: '#28F',
                        strokeWeight: 6
                    }}
                />
            </Map>
        </div>
    )
}
