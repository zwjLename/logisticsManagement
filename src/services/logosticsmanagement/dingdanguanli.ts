// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 某个订单追加菜品。在具体某个订单中追加商品,可以多个。 POST /order/addgoodsListByOrderId */
export async function addgoodsListByOrderIdUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addgoodsListByOrderIdUsingPOSTParams,
  body: API.GoodsInRcvOrderParam[],
  options?: { [key: string]: any },
) {
  return request<API.Result>('/order/addgoodsListByOrderId', {
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

/** 删除商品。在具体某个订单中删除某条商品信息。 DELETE /order/deleteGoodsById */
export async function deleteGoodsByIdUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteGoodsByIdUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/order/deleteGoodsById', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑订单商品。在具体某个订单中修改商品信息。例如青菜 5斤，由于没货，改成白菜 5斤。 POST /order/editGoods */
export async function editGoodsUsingPOST(
  body: API.GoodsEditParam,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/order/editGoods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员选定多个订单，返回各类商品的汇总信息。例如A单位订单为萝卜5斤、白菜10斤，B单位订单为萝卜5斤、白菜10斤，汇总信息为萝卜10斤、白菜20斤，由采购员(不需要知道每个订单，只需要知道汇总信息)统一采购农产品 GET /order/gatherOrders */
export async function gatherOrdersUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.gatherOrdersUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListGoodsInRcvOrderParam_>('/order/gatherOrders', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有订单列表。 GET /order/getAllOrderList */
export async function getAllOrderListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllOrderListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/order/getAllOrderList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取历史订单列表。最后一列操作包含‘再来一单’ GET /order/getfinishOrderList */
export async function getfinishOrderListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getfinishOrderListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/order/getfinishOrderList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 按照订货单位名称搜索历史订单列表。最后一列操作包含’再来一单‘ GET /order/getOrderListByCoorporate */
export async function getOrderListByCoorporateUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderListByCoorporateUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/order/getOrderListByCoorporate', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 会计记账。会计填写订单中每个商品的单价（必填项，市场价每天都会变动）、有可能更新份数（需要复核重量的客户单位例如酒店有可能一些会更改部分商品的斤重，非必填项）。每个商品单价/总价前端显示保留一位小数 POST /order/keepAccount */
export async function keepAccountUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.keepAccountUsingPOSTParams,
  body: API.KeepAccountForGoods[],
  options?: { [key: string]: any },
) {
  return request<API.Result>('/order/keepAccount', {
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

/** 修改商品。在具体某个订单中修改商品信息。例如青菜 5斤，由于没货，改成白菜 5斤。 POST /order/modifyGoods */
export async function modifyGoodsUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.modifyGoodsUsingPOSTParams,
  body: API.GoodsEditParam[],
  options?: { [key: string]: any },
) {
  return request<API.Result>('/order/modifyGoods', {
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

/** 按物流单号获取其温湿度信息。面向用户商城微服务提供的接口 GET /order/queryHmiTmpById */
export async function queryHmiTmpByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryHmiTmpByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListRetSensor_>('/order/queryHmiTmpById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 按物流单号获取其物流轨迹。面向用户商城微服务提供的接口 GET /order/queryLogisticsTraceById */
export async function queryLogisticsByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryLogisticsByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/order/queryLogisticsTraceById', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据订单id获取商品详情/明细。 GET /order/queryOrderDetailByOrderId */
export async function queryOrderDetailByOrderIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryOrderDetailByOrderIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/order/queryOrderDetailByOrderId', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员接受用户订单任务，创建订单。一种是用户界面上挨个填入商品列表和地址信息，另一种图像识别商品列表（后期手机端考虑） POST /order/recvMailOrder */
export async function recvMailOrderUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.recvMailOrderUsingPOSTParams,
  body: API.GoodsInRcvOrderParam[],
  options?: { [key: string]: any },
) {
  return request<API.Result>('/order/recvMailOrder', {
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

/** 组合条件搜索配送任务,分页显示。totalPrice表示满足条件的所有订单总价格。订单按照客户单位名称、开始结束时间组合搜索 GET /order/searchOrderStatisticalInfoByConditionByPage */
export async function searchOrderStatisticalInfoByConditionByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchOrderStatisticalInfoByConditionByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultMapStringObject_>('/order/searchOrderStatisticalInfoByConditionByPage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 管理员获取待配送的订单列表。通常是当天创建的单子当天分派，该接口显示送达顾客日期大于当天日期(因此该接口显示当天创建的待分派的配送单子)。调用该接口前后都显示该内容。这里仍然不考虑分页，便于全选进行分派调度。接口变更，去掉分页参数,返回值变化。 GET /order/waitDeliveryOrderList */
export async function waitDeliveryOrderListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waitDeliveryOrderListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListOrderListByState_>('/order/waitDeliveryOrderList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取待采购订单列表。管理员获取待采购调度订单列表(待分派给采购员的订单),pickupAllocFlag为1代表已分派。通常是当天创建的单子当天分派，该接口显示送达顾客日期大于当天日期(因此该接口显示当天创建的待分派的配送单子)。往往都是前一天处理第二天的订单，以及特殊加单情况。并且通常当日收到的所有订单都分派给一个采购员，因此前端不要按页显示。即该接口获取还未分派采购的第二天订单。前端显示‘采购单位名称、联系人、电话、目的地、送达日期、详情’等 GET /order/waitPickOrderList */
export async function waitPickOrderListUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.waitPickOrderListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultListOrderListByState_>('/order/waitPickOrderList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
