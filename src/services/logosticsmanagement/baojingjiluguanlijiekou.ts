// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页获取历史报警记录 GET /warning/getAllWarningListByCondition */
export async function getAllWarningListByConditionUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllWarningListByConditionUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/warning/getAllWarningListByCondition', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据用户id获取指定时间内未读报警记录，例如最近24小时内 GET /warning/getUnreadWarningListByUser */
export async function getUnreadWarningListByUserUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUnreadWarningListByUserUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListWarningLog_>('/warning/getUnreadWarningListByUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据用户id获取指定时间内未读的报警记录条数，例如最近24小时。每隔一定时间间隔调用该接口 GET /warning/getUnreadWarningListNumByUser */
export async function getUnreadWarningListNumByUserUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUnreadWarningListNumByUserUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultInt_>('/warning/getUnreadWarningListNumByUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 将报警记录标记为已读 POST /warning/readWarningList */
export async function readWarningListUsingPOST(body: string[], options?: { [key: string]: any }) {
  return request<API.Result>('/warning/readWarningList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
