// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分派调度司机。分派配送任务，选择司机。在分派时管理员从司机列表选择司机。接口发生变更 POST /distribute/allocateDriverInfo */
export async function allocateDriverInfoUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.allocateDriverInfoUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/distribute/allocateDriverInfo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 采购分派调度。向下分派农产品汇总信息给采购员（华成公司收到所有单子汇总给统一采购员），通过采购员列表选择采购员。在前端通常是将明日待配送订单全选。不考虑管理员对订单进行重新分派采购情况 POST /distribute/allocatePickUpInfo */
export async function allocatePickUpInfoUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.allocatePickUpInfoUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/distribute/allocatePickUpInfo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 显示所有的配送任务,包含条件搜索配送任务 GET /distribute/getAllDistributionList */
export async function getAllDistributionListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllDistributionListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/distribute/getAllDistributionList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据配送表的配送id获取每次配送的所有运单信息。 GET /distribute/getOrdersByAllocationId */
export async function getOrdersByAllocationIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrdersByAllocationIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListMailOrder_>('/distribute/getOrdersByAllocationId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
