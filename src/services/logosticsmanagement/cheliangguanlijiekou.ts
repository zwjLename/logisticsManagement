// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除车辆 DELETE /vehicle/deleteVehicle */
export async function deleteVehicleUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteVehicleUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/vehicle/deleteVehicle', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑车辆 POST /vehicle/editVehicle */
export async function editVehicleUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editVehicleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/vehicle/editVehicle', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取车辆列表 GET /vehicle/getAllVehicleByUserPage */
export async function getAllVehicleByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllVehicleByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/vehicle/getAllVehicleByUserPage', {
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

/** 获取所有车辆相关信息列表,包括车辆的车牌、颜色、绑定的车载终端号(车辆没有绑定终端该字段为null)、状态。单纯获取车辆静态列表不要使用此接口 GET /vehicle/getAllVehiclesByUser */
export async function getAllVehiclesUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllVehiclesUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListVehicleResult_>('/vehicle/getAllVehiclesByUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据车牌获取车辆绑定的终端信息。如果车辆没有绑定终端，则返回code为30012提示 GET /vehicle/getBindTerminalInfoByVehicleNum */
export async function getBindTerminalInfoByVehicleIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBindTerminalInfoByVehicleIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultString_>('/vehicle/getBindTerminalInfoByVehicleNum', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据车牌获取车辆信息。 GET /vehicle/getVehicleInfoByVehicleNum */
export async function getVehicleInfoByVehicleNumUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVehicleInfoByVehicleNumUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultTransportVehicleInfo_>('/vehicle/getVehicleInfoByVehicleNum', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取车辆地理分布一览表 GET /vehicle/getVehicleLocationByUser */
export async function getVehicleLocationByUserUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVehicleLocationByUserUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListVehicleLocation_>('/vehicle/getVehicleLocationByUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加车辆 POST /vehicle/joinSys */
export async function joinSysUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.joinSysUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/vehicle/joinSys', {
    method: 'POST',
    params: {
      // licensePlateColor has a default value: -1
      licensePlateColor: '-1',

      ...params,
    },
    ...(options || {}),
  });
}

/** 在车辆地理分布上搜索车辆当前位置 GET /vehicle/searchVehicleCurrentLocation */
export async function searchVehicleCurrentLocationUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchVehicleCurrentLocationUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultCurrentPosition_>('/vehicle/searchVehicleCurrentLocation', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
