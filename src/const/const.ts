export const CarbinStatus = {
    'TEMP_HUMI': '温湿度一体', // 温湿度一体传感器,该类传感器获取到的数据对应字段temp、humi
    'DO_DISOXY': 'DO溶解氧', // DO溶解氧传感器，该类传感器获取到的数据对应字段为doValue、tempWater
    'CO2': '二氧化碳', ///二氧化碳传感器，该类传感器获取到的数据对应字段为co2.取值范围在1~2000ppm之间，通常在400ppm左右 
};

export const CarbinAllStatus = ['TEMP_HUMI', 'DO_DISOXY', 'CO2'];

export type CarbinStatusType = 'TEMP_HUMI' | 'DO_DISOXY' | 'CO2';

export enum DisStatus {
    HAVE_ALLOCATE = 'HAVE_ALLOCATE',//已分配任务，待配送
    DISTRIBUTING = 'DISTRIBUTING',//配送中
    DISTRIBUTION_CANCEL = 'DISTRIBUTION_CANCEL',//取消配送
    DISTRIBUTION_END = 'DISTRIBUTION_END',//配送完成
    OVER = 'OVER' //关闭
}
export const DisStatusWord = {
    [DisStatus.HAVE_ALLOCATE]: '已分配任务，待配送',
    [DisStatus.DISTRIBUTING]: '配送中',
    [DisStatus.DISTRIBUTION_CANCEL]: '取消配送',
    [DisStatus.DISTRIBUTION_END]: '配送完成',
    [DisStatus.OVER]: '关闭'
}