// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询终端参数/查询指定终端参数 GET /${param0}/parameters */
export async function findParametersUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findParametersUsingGETParams,
  options?: { [key: string]: any },
) {
  const { terminalId: param0, ...queryParams } = params;
  return request<API.ParameterSettingReply>(`/${param0}/parameters`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 位置信息查询 GET /${param0}/position */
export async function positionUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.positionUsingGETParams,
  options?: { [key: string]: any },
) {
  const { terminalId: param0, ...queryParams } = params;
  return request<API.PositionResult>(`/${param0}/position`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 文本信息下发 POST /${param0}/text */
export async function sendTextUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendTextUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { terminalMobile: param0, ...queryParams } = params;
  return request<API.CommonResult>(`/${param0}/text`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 临时位置跟踪控制 POST /${param0}/track */
export async function trackUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.trackUsingPOSTParams,
  body: API.TemporaryMonitor,
  options?: { [key: string]: any },
) {
  const { terminalId: param0, ...queryParams } = params;
  return request<API.CommonResult>(`/${param0}/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 设置终端参数,设置ip地址和端口，本系统中terminal_id为mobile_number POST /${param0}/updateHostParameters */
export async function updateHostParametersUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateHostParametersUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { terminalId: param0, ...queryParams } = params;
  return request<API.CommonResult>(`/${param0}/updateHostParameters`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 设置终端参数,设置默认汇报时间间隔,单位为秒。本系统terminalId为mobile_num POST /${param0}/updateIntervalParameters */
export async function updateIntervalParametersUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateIntervalParametersUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { terminalId: param0, ...queryParams } = params;
  return request<API.CommonResult>(`/${param0}/updateIntervalParameters`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 设置终端参数,修改终端车牌 POST /${param0}/updateVehicleNumParameters */
export async function updateVehicleNumParametersUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateVehicleNumParametersUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { terminalId: param0, ...queryParams } = params;
  return request<API.CommonResult>(`/${param0}/updateVehicleNumParameters`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 终端绑定传感器 POST /terminal/bindSensor */
export async function bindSensorUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.bindSensorUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/terminal/bindSensor', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑传感器 POST /terminal/editSensor */
export async function editSensorUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editSensorUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/terminal/editSensor', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导出温湿度。 GET /terminal/exportTmpHmiList */
export async function exportTmpHmiListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.exportTmpHmiListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<any>('/terminal/exportTmpHmiList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取某物流企业所有的终端设备列表。不分页 GET /terminal/getAllTerminalsByUser */
export async function getAllTerminalsByUserUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllTerminalsByUserUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListTerminalResult_>('/terminal/getAllTerminalsByUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取终端对应整个车厢当前温度、湿度、水温、溶解氧 GET /terminal/getCurrentTempHumi */
export async function getCurrentTempHumiUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentTempHumiUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListRetSensor_>('/terminal/getCurrentTempHumi', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据终端号获取车辆一段时间内的行驶轨迹 GET /terminal/getHistoryTrace */
export async function getHistoryTraceUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getHistoryTraceUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListPositionResult_>('/terminal/getHistoryTrace', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取终端绑定的传感器列表 GET /terminal/getSensorList */
export async function getSensorListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSensorListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/terminal/getSensorList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取终端对应整个车厢一段时间温度、湿度、水温、溶解氧 GET /terminal/getTempHumiForTime */
export async function getTempHumiForTimeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTempHumiForTimeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListRetSensor_>('/terminal/getTempHumiForTime', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 设备号，车牌号，上下线状态条件查询终端设备列表。可以考虑删除此搜索功能 GET /terminal/getTerminalListByCondition */
export async function getTerminalListByConditionUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTerminalListByConditionUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/terminal/getTerminalListByCondition', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取某物流企业的终端设备列表。分页 GET /terminal/getTerminalListByUser */
export async function getTerminalListByUserUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTerminalListByUserUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/terminal/getTerminalListByUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 数据下行透传，获取某个车辆的温湿度、溶解氧、CO2数据。该接口如果调用成功则返回三个整数，其中resultCode为0。否则提示与终端联通失败 POST /terminal/passthrough */
export async function passthroughUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.passthroughUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResult>('/terminal/passthrough', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 音视频实时传输控制,关闭实时视频 POST /terminal/realTimeVideo/control */
export async function realTimeVideoControlUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.realTimeVideoControlUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResult>('/terminal/realTimeVideo/control', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 实时音视频传输请求 POST /terminal/realTimeVideo/request */
export async function realTimeVideoRequestUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.realTimeVideoRequestUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResult>('/terminal/realTimeVideo/request', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 远程录像回放控制 POST /terminal/replay/control */
export async function replayRequestUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.replayRequestUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResult>('/terminal/replay/control', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 远程录像回放请求 POST /terminal/replay/request */
export async function replayRequestUsingPOST1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.replayRequestUsingPOST1Params,
  body: API.ReplayRequestParams,
  options?: { [key: string]: any },
) {
  return request<API.CommonResult>('/terminal/replay/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 传感器解绑 POST /terminal/unbindSensor */
export async function unbindSensorUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unbindSensorUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/terminal/unbindSensor', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 解除终端与车辆的绑定关系，并删除终端信息 POST /terminal/unbindVehicle */
export async function unbindVehicleUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unbindVehicleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/terminal/unbindVehicle', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
