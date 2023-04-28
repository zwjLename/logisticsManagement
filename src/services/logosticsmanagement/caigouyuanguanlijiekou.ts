// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 根据采购任务id获取汇总后的采购商品列表。显示字段：名称、份数（包括计量单位，例如3斤） GET /picker/getAllWaitGoodsListById */
export async function getAllWaitGoodsListByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllWaitGoodsListByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListGoodsInRcvOrderParam_>('/picker/getAllWaitGoodsListById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 采购员查询有无分派的待采购的任务，返回采购列表，通常不超3条，因此全部显示不需要分页，显示分派时间、送达仓库日期、状态为'完成/未完成、查看商品'。 GET /picker/getPickAllocationListByToday */
export async function getPickAllocationListByTodayUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPickAllocationListByTodayUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListPickUpAllocation_>('/picker/getPickAllocationListByToday', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 采购完成后入库。 POST /picker/repoIn */
export async function repoInUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.repoInUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/picker/repoIn', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
