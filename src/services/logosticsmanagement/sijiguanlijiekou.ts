// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 司机配置车辆 POST /driver/addConfigVehicle */
export async function addConfigVehicleUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addConfigVehicleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/driver/addConfigVehicle', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机关闭多个已过期的待配送任务 POST /driver/colseAllocation */
export async function colseAllocationUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.colseAllocationUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/driver/colseAllocation', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机编辑车辆信息 POST /driver/editBindVehicle */
export async function editBindVehicleUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editBindVehicleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/driver/editBindVehicle', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机获取绑定的车辆信息。没有绑定返回null GET /driver/getBindVehicle */
export async function getBindVehicleUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBindVehicleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultDriverBindConfig_>('/driver/getBindVehicle', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机根据手机号（用户名为手机号）获取车辆详细信息。判定司机是否与车辆绑定，没有绑定给出提示绑定向导。小程序端为了应用通用性，当司机没有绑定车辆确保整个流程正常运转 GET /driver/getBindVehicleByTel */
export async function getBindVehicleByTelUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBindVehicleByTelUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultTransportVehicleInfo_>('/driver/getBindVehicleByTel', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机根据车牌获取车辆详细信息 GET /driver/getBindVehicleByVehiclNum */
export async function getBindVehicleByVehiclNumUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBindVehicleByVehiclNumUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultTransportVehicleInfo_>('/driver/getBindVehicleByVehiclNum', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机获取指定时间段完成配送的配送信息。例如默认获取最近一星期已完成的配送。 注意!。新增接口 GET /driver/getFinishedDistributionInfoByTime */
export async function getFinishedDistributionInfoByTimeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFinishedDistributionInfoByTimeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListAllocationInfo_>('/driver/getFinishedDistributionInfoByTime', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机根据配送任务的配送id获取每次配送的所有运单信息,该接口适用于查看每个配送任务的详细订单信息。 GET /driver/getOrdersByAllocationId */
export async function getOrdersByAllocationIdUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrdersByAllocationIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultListMailOrder_>('/driver/getOrdersByAllocationId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机获取所属公司的所有车辆列表。司机在绑定车辆前获取的所有车辆列表。 GET /driver/getVehicleList */
export async function getVehicleListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getVehicleListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListTransportVehicleInfo_>('/driver/getVehicleList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机查询今日或明日有无待配送的任务，返回待配送列表。每个配送任务记录显示配送司机姓名、送达日期、订单数、签收数、车牌等字段 GET /driver/getWaitDistributionByDriverVehicle */
export async function getWaitDistributionByDriverVehicleUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWaitDistributionByDriverVehicleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListAllocationInfo_>('/driver/getWaitDistributionByDriverVehicle', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 订单送达。该接口是在微信小程序中点击送达按钮调用的接口,调用微信小程序中地图经纬度坐标 POST /driver/reach */
export async function reachUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reachUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/driver/reach', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机开始配送，考虑多个订单由同一个车辆配送。华成公司司机负责所有订单物品的分拣（按照每个订单详情）、签字、装车、开始配送。在当前配送任务点击开始按钮 POST /driver/startDistribution */
export async function startDistributionUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startDistributionUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/driver/startDistribution', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 测试1 GET /driver/test */
export async function testUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/driver/test', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 司机删除绑定的车辆 POST /driver/unBindVehicle */
export async function unBindVehicleUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unBindVehicleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/driver/unBindVehicle', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增工作人员信息。用户角色，ROLE_DRIVER---司机；ROLE_COLLECTOR---采购员；ROLE_LOADER---配货员。检查数据库是否已经存在userId、tel、role与输入相同的司机的信息，若存在则提示已存在。接口路径变更：原路径author/driver/... POST /staff/addStaff */
export async function addStaffUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addStaffUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/staff/addStaff', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除司机/采购员信息。接口路径变更：原路径author/driver/... DELETE /staff/deleteStaff */
export async function deleteStaffUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteStaffUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/staff/deleteStaff', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑司机/采购员信息。接口路径变更：原路径author/driver/... POST /staff/editStaff */
export async function editStaffUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editStaffUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/staff/editStaff', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 搜索司机/采购员姓名搜索，页面搜索功能可以去掉，因为人员很少。路径变更：原路径author/driver/... GET /staff/findStaffListByName */
export async function findStaffListByNameUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findStaffListByNameUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListDriverInfo_>('/staff/findStaffListByName', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有员工的姓名和手机号。接口路径变更：原路径author/driver/... GET /staff/getAllNameTel */
export async function getAllNameTelUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllNameTelUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/staff/getAllNameTel', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取员工（包括司机或采购员）列表。在分派采购时显示采购员列表，分派司机时显示所有司机列表信息。接口路径变更：原路径author/driver/... GET /staff/getAllStaffs */
export async function getAllStaffsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllStaffsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListDriverIncludeVehicleDto_>('/staff/getAllStaffs', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
