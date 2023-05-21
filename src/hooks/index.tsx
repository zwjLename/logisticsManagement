import React from 'react'
import { useRequest } from '@umijs/max';
import { getHistoryTraceUsingGET, getTempHumiForTimeUsingGET } from '@/services/logosticsmanagement/zhongduantongxinguanliApi';
export const useResHooks = () => {
    // 获取终端对应整个车厢一段时间温度、湿度、水温、溶解氧
    const tempHumiRes = useRequest(getTempHumiForTimeUsingGET, {
        manual: true
    })

    // 
    const orbitRes = useRequest(getHistoryTraceUsingGET, {
        manual: true
    })

    return {
        tempHumiRes,
        orbitRes
    }
}