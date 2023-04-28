// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新增地址。会根据客户的单位名称验证是否已经存在该客户地址 POST /address/addAddress */
export async function addAddressUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addAddressUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/address/addAddress', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除地址 POST /address/delAddress */
export async function delAddressUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delAddressUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/address/delAddress', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑地址 POST /address/editAddress */
export async function editAddressUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editAddressUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/address/editAddress', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取地址列表 GET /address/getAllAddressByUserId */
export async function getAllAddressUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllAddressUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListConsumerAddress_>('/address/getAllAddressByUserId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
