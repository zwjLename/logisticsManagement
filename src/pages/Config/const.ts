export enum VehicleState {
    'offline' = 'OFF_LINE',
    'online' = 'ON_LINE',
    'null' = '',
}
export const VehicleStateWord = {
    [VehicleState.offline]: '离线',
    [VehicleState.online]: '在线',
    [VehicleState.null]: '未知',
    null: '未知'
}

export const CarIcon = {
    [VehicleState.offline]: 'https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png',
    [VehicleState.online]: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
    [VehicleState.null]: 'https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png'
}