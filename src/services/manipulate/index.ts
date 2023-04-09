
import { baseReq } from "../base";
import { API } from "../typings";
import { RequestData } from '@ant-design/pro-components';

export const getPurchaseList = async (params: API.getPickAllocationListByTodayParams) => baseReq<RequestData<API.getPickAllocationListByTodayRes>>({ url: '/api/micro-vehicles-test/picker/getPickAllocationListByToday', method: 'GET', params })