declare namespace API {
  type addAddressUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 客户单位名称 */
    corporateName: string;
    /** 联系人 */
    receiver: string;
    /** 联系电话 */
    tel: string;
    /** 省市区，例如江苏省南京市鼓楼区 */
    city: string;
    /** 接到详细地址 */
    road: string;
    /** 创建地址的当前用户id */
    userId: number;
  };

  type addConfigVehicleUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 司机手机号 */
    driverTel: string;
    /** 车牌 */
    vehicleNum: string;
  };

  type addgoodsListByOrderIdUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 订单号 */
    mailOrderId: string;
  };

  type addStaffUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 司机名 */
    name: string;
    /** 手机号 */
    tel: string;
    /** 性别，男或女,非必填项 */
    sex?: string;
    /** 格式为yyyy-MM-dd,非必填项 */
    birthDate?: string;
    /** 驾驶证号 */
    licenseNum?: string;
    /** 驾驶车型 */
    vehicleType?: string;
    /** 用户角色，ROLE_DRIVER---司机；ROLE_COLLECTOR---采购员；ROLE_ADMIN---管理员 */
    role: string;
  };

  type allocateDriverInfoUsingPOSTParams = {
    /** mailOrderIdList */
    mailOrderIdList: string[];
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流公司的管理员id */
    userId: number;
    /** 司机手机号。通过前端界面司机列表中获取的参数 */
    driverTel: string;
    /** 送达客户日期，年月日，特别注意格式为yyyy-MM-dd */
    hopeRcvTime: string;
  };

  type allocatePickUpInfoUsingPOSTParams = {
    /** 订单列表,该字段是为了便于在采购员不知情的情况下及时更改订单为‘已分派’状态 */
    mailOrderIdList?: string[];
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流公司的管理员id */
    userId: number;
    /** 揽件员手机号 */
    pickUserTel: string;
    /** 送达仓库的日期，年月日，特别注意格式为yyyy-MM-dd */
    hopeRcvTime: string;
  };

  type AllocationInfo = {
    alloctionNum?: number;
    distributionState?: string;
    driverTel?: string;
    endLat?: string;
    endLong?: string;
    endTime?: string;
    hopeRcvTime?: string;
    id?: string;
    licensePlateNumber?: string;
    loadingNum?: number;
    signNum?: number;
    startLat?: string;
    startLong?: string;
    startTime?: string;
    totalWeight?: number;
    userId?: number;
  };

  type ByteBuf = {
    direct?: boolean;
    readOnly?: boolean;
    readable?: boolean;
    writable?: boolean;
  };

  type colseAllocationUsingPOSTParams = {
    /** 配送任务id列表 */
    tansAllocationId?: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type CommonResult = {
    flowId?: number;
    payload?: ByteBuf;
    replyId?: number;
    resultCode?: number;
  };

  type ConsumerAddress = {
    city?: string;
    corporateName?: string;
    createTime?: string;
    id?: number;
    receiver?: string;
    road?: string;
    tel?: string;
    userId?: number;
  };

  type CurrentPosition = {
    lastOnLineTime?: string;
    latitude?: number;
    longitude?: number;
    mobileNumber?: string;
    speed?: number;
  };

  type delAddressUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 地址id */
    addressId: number;
  };

  type deleteGoodsByIdUsingDELETEParams = {
    /** 商品记录id */
    goodsId?: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type deleteStaffUsingDELETEParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 工作人员id */
    id: string;
  };

  type deleteVehicleUsingDELETEParams = {
    /** id */
    id: number;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type DriverBindConfig = {
    driverTel?: string;
    id?: string;
    vehicleNum?: string;
  };

  type DriverInfo = {
    belongUserId?: number;
    birthDay?: string;
    id?: string;
    licenseNum?: string;
    name?: string;
    role?: string;
    sex?: string;
    tel?: string;
    vehicleType?: string;
  };

  type editAddressUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 地址id */
    addressId: number;
    /** 客户单位名称 */
    corporateName: string;
    /** 联系人 */
    receiver: string;
    /** 联系电话 */
    tel: string;
    /** 省市区 */
    city: string;
    /** 接到详细地址 */
    road: string;
  };

  type editBindVehicleUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 车辆绑定记录id */
    id: string;
    /** 车牌 */
    vehicleNum: string;
  };

  type editGoodsUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type editSensorUsingPOSTParams = {
    /** terminalMobile */
    terminalMobile: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 传感器id */
    sensorId?: string;
    /** 传感器类别，TEMP_HUMI表示温湿度一体，DO_DISOXY表示DO溶解氧，CO2表示二氧化碳 */
    type: string;
    /** 地址为16进制，例如01、02 */
    hexAddress: string;
  };

  type editStaffUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 用户id */
    id: string;
    /** 司机名 */
    name: string;
    /** 手机号 */
    tel: string;
    /** 性别，男或女,非必填项 */
    sex?: string;
    /** 格式为yyyy-MM-dd,非必填项 */
    birthDate?: string;
    /** 驾驶证号 */
    licenseNum: string;
    /** 驾驶车型 */
    vehicleType: string;
    /** 用户角色，ROLE_DRIVER---司机；ROLE_COLLECTOR---采购员员；ROLE_ADMIN---二级管理员 */
    role: string;
  };

  type editVehicleUsingPOSTParams = {
    /** id */
    id: number;
    /** vehicleType */
    vehicleType: string;
    /** licensePlateNumber */
    licensePlateNumber: string;
    /** licensePlateColor */
    licensePlateColor: number;
    /** load */
    load: number;
    /** coldStorageFlag */
    coldStorageFlag: boolean;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type exportTmpHmiListUsingGETParams = {
    /** terminalMobile */
    terminalMobile: string;
    /** startTime */
    startTime: string;
    /** endTime */
    endTime: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type findParametersUsingGETParams = {
    /** terminalId */
    terminalId: string;
    /** 参数ID列表，为空则查询全部 */
    idList?: number[];
  };

  type findStaffListByNameUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 司机名/采购员姓名 */
    name: string;
  };

  type gatherOrdersUsingGETParams = {
    /** 订单号列表 */
    mailOrderIdList?: string[];
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type getAllAddressUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 创建地址的当前用户id */
    userId: number;
  };

  type getAllDistributionListUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 车牌 */
    vehicleNumber?: string;
    /** 配送日期，默认格式yyyy-MM-dd。车牌与配送日期至少选择一个组成组合条件搜索，车牌与配送日期两个参数都没有则搜索所有订单 */
    distributeDateStr?: string;
    /** 获取第几页数据，默认为1，表示获取第1页数据,非必填项 */
    page?: number;
    /** 每页显示的条数,默认为10，非必填项 */
    pageSize?: number;
  };

  type getAllNameTelUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
  };

  type getAllOrderListUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 获取第几页数据，默认为1，表示获取第1页数据,非必填项 */
    page?: number;
    /** 每页显示的条数,默认为10，非必填项 */
    pageSize?: number;
  };

  type getAllStaffsUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 用户角色，ROLE_DRIVER---司机；ROLE_COLLECTOR---采购员员；ROLE_LOADER---配货员 */
    role: string;
  };

  type getAllTerminalsByUserUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
  };

  type getAllVehicleByPageUsingGETParams = {
    /** userId */
    userId: number;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type getAllVehiclesUsingGETParams = {
    /** userId */
    userId: number;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type getAllWaitGoodsListByIdUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 采购任务id */
    pickUpAllocationId: string;
  };

  type getAllWarningListByConditionUsingGETParams = {
    /** userId */
    userId: number;
    /** vehicleNum */
    vehicleNum?: string;
    /** startTime */
    startTime?: string;
    /** endTime */
    endTime?: string;
    /** page */
    page?: number;
    /** pageSize */
    pageSize?: number;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type getBindTerminalInfoByVehicleIdUsingGETParams = {
    /** vehicleNum */
    vehicleNum: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type getBindVehicleByTelUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 司机小程序登陆的手机号 */
    driverTel: string;
  };

  type getBindVehicleByVehiclNumUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization: string;
    /** 车牌 */
    vehicleNum: string;
  };

  type getBindVehicleUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 司机手机号 */
    driverTel: string;
  };

  type getCurrentTempHumiUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
  };

  type getFinishedDistributionInfoByTimeUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 司机手机号 */
    driverTel: string;
    /** yyyy-MM-dd HH:mm:ss */
    startTime: string;
    /** yyyy-MM-dd HH:mm:ss */
    endTime: string;
  };

  type getfinishOrderListUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 获取第几页数据，默认为1，表示获取第1页数据,非必填项 */
    page?: number;
    /** 每页显示的条数,默认为10，非必填项 */
    pageSize?: number;
  };

  type getHistoryTraceDateListUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端中的sim卡号 */
    terminalMobile: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss */
    startTime: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss */
    endTime: string;
  };

  type getHistoryTraceUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端中的sim卡号 */
    terminalMobile: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss */
    startTime: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss */
    endTime: string;
  };

  type getOrderListByCoorporateUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 客户单位名称 */
    corporateName: string;
    /** 获取第几页数据，默认为1，表示获取第1页数据,非必填项 */
    page?: number;
    /** 每页显示的条数,默认为10，非必填项 */
    pageSize?: number;
  };

  type getOrdersByAllocationIdUsingGET1Params = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 配送任务id */
    allocationId: string;
  };

  type getOrdersByAllocationIdUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 配送任务id */
    allocationId: string;
  };

  type getPickAllocationListByTodayUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 揽件员手机号 */
    pickUserTel: string;
    /** 揽件状态：HAVE_ALLOCATE｜FINISH,HAVE_ALLOCATE表示获取待采购的任务 */
    pickState: string;
  };

  type getSensorListUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
  };

  type getTempHumiDateListUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss */
    startTime: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss */
    endTime: string;
  };

  type getTempHumiForTimeUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss */
    startTime: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss */
    endTime: string;
  };

  type getTerminalListByConditionUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 终端SIM卡号 */
    terminalMobile?: string;
    /** 车牌 */
    vehicleNum?: string;
    /** 终端状态目前两种：ON_LINE|OFF_LINE */
    terminalState?: string;
    /** 获取第几页数据，默认为1，表示获取第1页数据,非必填项 */
    page?: number;
    /** 每页显示的条数,默认为10，非必填项 */
    pageSize?: number;
  };

  type getTerminalListByUserUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 获取第几页数据，默认为1，表示获取第1页数据,非必填项 */
    page?: number;
    /** 每页显示的条数,默认为10，非必填项 */
    pageSize?: number;
  };

  type getUnreadWarningListByUserUsingGETParams = {
    /** userId */
    userId: number;
    /** startTime */
    startTime: string;
    /** endTime */
    endTime: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type getUnreadWarningListNumByUserUsingGETParams = {
    /** userId */
    userId: number;
    /** startTime */
    startTime: string;
    /** endTime */
    endTime: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type getVehicleInfoByVehicleNumUsingGETParams = {
    /** vehicleNum */
    vehicleNum: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type getVehicleListUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 司机手机号 */
    driverTel: string;
  };

  type getVehicleLocationByUserUsingGETParams = {
    /** userId */
    userId: number;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type getWaitDistributionByDriverVehicleUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 配送的司机手机号 */
    driverTel: string;
    /** 要查询的待配送任务状态：HAVE_ALLOCATE */
    distributeState: string;
  };

  type GoodsEditParam = {
    /** 商品名称 */
    goodsName?: string;
    /** 商品id */
    id?: string;
    /** 商品数量 */
    number?: number;
    /** 商品重量单位 */
    unitdesc?: string;
  };

  type GoodsInRcvOrderParam = {
    /** 商品名称，备注直接融到名称，例如老母鸡（农家） */
    goodsName?: string;
    /** 商品数量 */
    number?: number;
    /** 商品重量单位 */
    unitdesc?: string;
  };

  type joinSysUsingPOSTParams = {
    /** userId */
    userId: number;
    /** vehicleType */
    vehicleType: string;
    /** 车牌 */
    licensePlateNumber?: string;
    /** 车牌颜色,数字1代表蓝色，2代表黄色，3代表黑色，4代表白色，5代表其他 */
    licensePlateColor?: number;
    /** 车辆载重，单位默认为kg */
    load?: number;
    /** coldStorageFlag */
    coldStorageFlag: boolean;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type KeepAccountForGoods = {
    /** 商品记录id */
    id?: string;
    /** 商品数量 */
    number?: number;
    /** 商品单价 */
    unitprice?: number;
  };

  type keepAccountUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 订单号 */
    mailOrderId: string;
  };

  type keepPriceAccountUsingPOSTParams = {
    /** 订单号列表 */
    mailOrderIdList?: string[];
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type MailOrder = {
    corporateName?: string;
    endDistributionTime?: string;
    endLat?: string;
    endLong?: string;
    hopeRcvTime?: string;
    /** 物流单号 */
    id?: string;
    /** 该订单总价 */
    mailPrice?: number;
    mailState?: string;
    pickAllocationTime?: string;
    pickFinishTime?: string;
    pickupAllocFlag?: number;
    rcvAddress?: string;
    rcvOrderTime?: string;
    revName?: string;
    revTel?: string;
    startDistributionTime?: string;
    startLat?: string;
    startLong?: string;
    toLat?: string;
    toLong?: string;
    transAllocFlag?: number;
    transAllocationTime?: string;
    /** 负责订单的管理员id */
    userId?: number;
  };

  type modifyGoodsUsingPOSTParams = {
    /** mailOrderId */
    mailOrderId: string;
    /** 将删除的商品id列表 */
    delGoodsIdList?: string[];
    /** unitprice */
    unitprice?: number;
    /** hopeRcvTime */
    hopeRcvTime?: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type OrderListByState = {
    corporateName?: string;
    endDistributionTime?: string;
    hopeRcvTime?: string;
    id?: string;
    mailPrice?: number;
    mailState?: string;
    pickAllocationTime?: string;
    pickFinishTime?: string;
    pickupAllocFlag?: number;
    rcvAddress?: string;
    rcvOrderTime?: string;
    revName?: string;
    revTel?: string;
    startDistributionTime?: string;
    transAllocFlag?: number;
    transAllocationTime?: string;
    userId?: number;
  };

  type ParameterSettingReply = {
    payload?: ByteBuf;
    serialNumber?: number;
    terminalParameters?: TerminalParameter[];
    total?: number;
  };

  type passthroughUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
  };

  type PickUpAllocation = {
    allocationNum?: number;
    allocationTime?: string;
    hopeRcvTime?: string;
    id?: string;
    pickFlag?: string;
    pickLatitude?: string;
    pickLongitude?: string;
    pickUserTel?: string;
    repoInTime?: string;
    repoLatitude?: string;
    repoLongitude?: string;
    userId?: number;
    vehicleNum?: string;
  };

  type PositionResult = {
    altitude?: number;
    dateTime?: string;
    direction?: number;
    latitude?: number;
    longitude?: number;
    speed?: number;
  };

  type positionUsingGETParams = {
    /** terminalId */
    terminalId: string;
  };

  type queryHmiTmpByIdUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 订单号 */
    mailOrderId: string;
  };

  type queryLogisticsByIdUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 订单号 */
    mailOrderId: string;
  };

  type queryOrderDetailByOrderIdUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 订单号 */
    mailOrderId: string;
  };

  type reachUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 运单号 */
    orderId: string;
    /** 结束配送的经度 */
    endLong: string;
    /** 结束配送的纬度 */
    endLat: string;
  };

  type readWarningListUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type realTimeVideoControlUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
    /** 视频通道号，从1开始 */
    channelNo: number;
  };

  type realTimeVideoRequestUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
    /** 视频通道号，从1开始 */
    channelNo: number;
  };

  type RecordPriceForGoods = {
    /** 商品数量 */
    number?: number;
    /** 商品重量单位 */
    unitdesc?: string;
    /** 商品单价 */
    unitprice?: number;
  };

  type recvMailOrderUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 客户单位名称 */
    corporateName: string;
    /** 联系人 */
    receiver: string;
    /** 联系电话 */
    tel: string;
    /** 送达地址，省市区+街道详细信息，例如江苏省南京市江宁区弘景大道99号 */
    address: string;
    /** 客户期待送达日期，年月日，特别注意格式为yyyy-MM-dd */
    hopeRcvTime: string;
    /** 负责该订单的企业管理员id。当前用户id */
    userId: number;
  };

  type ReplayRequestParams = {
    channelNo?: number;
    endTime?: string;
    replayMutiple?: number;
    replayType?: number;
    startTime?: string;
  };

  type replayRequestUsingPOST1Params = {
    /** terminalMobile */
    terminalMobile: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type replayRequestUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
    /** 视频通道号，从1开始.replayAt为2表示结束回放其他字段无效；测试无效(replayAt为5表示拖动回放，replayTime为具体拖动时间格式为YYMMDDHHMMSS */
    channelNo: number;
  };

  type repoInUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 本次采购任务id */
    pickUpAllocationId: string;
  };

  type Result = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type ResultCurrentPosition_ = {
    code?: number;
    data?: CurrentPosition;
    msg?: string;
  };

  type ResultDriverBindConfig_ = {
    code?: number;
    data?: DriverBindConfig;
    msg?: string;
  };

  type ResultInt_ = {
    code?: number;
    data?: number;
    msg?: string;
  };

  type ResultListAllocationInfo_ = {
    code?: number;
    data?: AllocationInfo[];
    msg?: string;
  };

  type ResultListConsumerAddress_ = {
    code?: number;
    data?: ConsumerAddress[];
    msg?: string;
  };

  type ResultListDriverInfo_ = {
    code?: number;
    data?: DriverInfo[];
    msg?: string;
  };

  type ResultListGoodsInRcvOrderParam_ = {
    code?: number;
    data?: GoodsInRcvOrderParam[];
    msg?: string;
  };

  type ResultListMailOrder_ = {
    code?: number;
    data?: MailOrder[];
    msg?: string;
  };

  type ResultListOrderListByState_ = {
    code?: number;
    data?: OrderListByState[];
    msg?: string;
  };

  type ResultListPickUpAllocation_ = {
    code?: number;
    data?: PickUpAllocation[];
    msg?: string;
  };

  type ResultListPositionResult_ = {
    code?: number;
    data?: PositionResult[];
    msg?: string;
  };

  type ResultListRetSensor_ = {
    code?: number;
    data?: RetSensor[];
    msg?: string;
  };

  type ResultListString_ = {
    code?: number;
    data?: string[];
    msg?: string;
  };

  type ResultListTerminalResult_ = {
    code?: number;
    data?: TerminalResult[];
    msg?: string;
  };

  type ResultListTransportVehicleInfo_ = {
    code?: number;
    data?: TransportVehicleInfo[];
    msg?: string;
  };

  type ResultListVehicleLocation_ = {
    code?: number;
    data?: VehicleLocation[];
    msg?: string;
  };

  type ResultListVehicleResult_ = {
    code?: number;
    data?: VehicleResult[];
    msg?: string;
  };

  type ResultListWarningLog_ = {
    code?: number;
    data?: WarningLog[];
    msg?: string;
  };

  type ResultMapStringObject_ = {
    code?: number;
    data?: Record<string, any>;
    msg?: string;
  };

  type ResultString_ = {
    code?: number;
    data?: string;
    msg?: string;
  };

  type ResultTransportVehicleInfo_ = {
    code?: number;
    data?: TransportVehicleInfo;
    msg?: string;
  };

  type RetSensor = {
    co2?: number;
    doValue?: number;
    humi?: number;
    sensorType?: string;
    temp?: number;
    tempWater?: number;
    time?: string;
  };

  type searchOrderStatisticalInfoByConditionByPageUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
    /** 客户单位名称,非必填项 */
    coorporateName?: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss。起止日期必须同时存在或同时没有 */
    startTime?: string;
    /** 默认格式yyyy-MM-dd HH:mm:ss */
    endTime?: string;
    /** 获取第几页数据，默认为1，表示获取第1页数据,非必填项 */
    page?: number;
    /** 每页显示的条数,默认为10，非必填项 */
    pageSize?: number;
  };

  type searchVehicleCurrentLocationUsingGETParams = {
    /** vehicleNum */
    vehicleNum: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type sendTextUsingPOSTParams = {
    /** terminalMobile */
    terminalMobile: string;
    /** content */
    content: string;
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
  };

  type startDistributionUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 配送任务id */
    allocationId: string;
    /** 司机小程序登陆的手机号 */
    driverTel: string;
    /** 开始配送的经度 */
    startLong: string;
    /** 开始配送的纬度 */
    startLat: string;
  };

  type TemporaryMonitor = {
    interval?: number;
    payload?: ByteBuf;
    validityPeriod?: number;
  };

  type TerminalParameter = {
    bytesValue?: string;
    id?: number;
    idType?:
      | '0x0001:终端心跳发送间隔，单位为秒(s)'
      | '0x0002:TCP消息应答超时时间，单位为秒(s)'
      | '0x0003:TCP消息重传次数'
      | '0x0004:UDP消息应答超时时间，单位为秒(s)'
      | '0x0005:UDP消息重传次数'
      | '0x0006:SMS消息应答超时时间，单位为秒(s)'
      | '0x0007:SMS消息重传次数'
      | '0x0010:主服务器APN，无线通信拨号访问点。若网络制式为CDMA，则该处为PPP拨号号码'
      | '0x0011:主服务器无线通信拨号用户名'
      | '0x0012:主服务器无线通信拨号密码'
      | '0x0013:主服务器地址，IP或域名'
      | '0x0014:备份服务器APN，无线通信拨号访问点'
      | '0x0015:备份服务器无线通信拨号用户名'
      | '0x0016:备份服务器无线通信拨号密码'
      | '0x0017:备份服务器地址，IP或域名'
      | '0x0018:服务器TCP端口'
      | '0x0019:服务器UDP端口'
      | '0x0020:位置汇报策略，0：定时汇报；1：定距汇报；2：定时和定距汇报'
      | '0x0021:位置汇报方案，0：根据ACC状态；1：根据登录状态和ACC状态，先判断登录状态，若登录再根据ACC状态'
      | '0x0022:驾驶员未登录汇报时间间隔，单位为秒(s),>0'
      | '0x0027:休眠时汇报时间间隔，单位为秒(s),>0'
      | '0x0028:紧急报警时汇报时间间隔，单位为秒(s),>0'
      | '0x0029:缺省时间汇报间隔，单位为秒(s),>0'
      | '0x002C:缺省距离汇报间隔，单位为米(m),>0'
      | '0x002D:驾驶员未登录汇报距离间隔，单位为米(m),>0'
      | '0x002E:休眠时汇报距离间隔，单位为米(m),>0'
      | '0x002F:紧急报警时汇报距离间隔，单位为米(m),>0'
      | '0x0030:拐点补传角度，<180°'
      | '0x0040:监控平台电话号码'
      | '0x0041:复位电话号码，可采用此电话号码拨打终端电话让终端复位'
      | '0x0042:恢复出厂设置电话号码，可采用此电话号码拨打终端电话让终端恢复出厂设置'
      | '0x0043:监控平台SMS电话号码'
      | '0x0044:接收终端SMS文本报警号码'
      | '0x0045:终端电话接听策略，0：自动接听；1：ACC ON时自动接听，OFF时手动接听'
      | '0x0046:每次最长通话时间，单位为秒(s),0为不允许通话，0xFFFFFFFF为不限制'
      | '0x0047:当月最长通话时间，单位为秒(s),0为不允许通话，0xFFFFFFFF为不限制'
      | '0x0048:监听电话号码'
      | '0x0049:监管平台特权短信号码'
      | '0x0050:报警屏蔽字。与位置信息汇报消息中的报警标志相对应，相应位为1则相应报警被屏蔽'
      | '0x0051:报警发送文本SMS开关，与位置信息汇报消息中的报警标志相对应，相应位为1则相应报警时发送文本SMS'
      | '0x0052:报警拍摄开关，与位置信息汇报消息中的报警标志相对应，相应位为1则相应报警时摄像头拍摄'
      | '0x0053:报警拍摄存储标志，与位置信息汇报消息中的报警标志相对应，相应位为1则对相应报警时牌的照片进行存储，否则实时长传'
      | '0x0054:关键标志，与位置信息汇报消息中的报警标志相对应，相应位为1则对相应报警为关键报警'
      | '0x0055:最高速度，单位为公里每小时(km/h)'
      | '0x0056:超速持续时间，单位为秒(s)'
      | '0x0057:连续驾驶时间门限，单位为秒(s)'
      | '0x0058:当天累计驾驶时间门限，单位为秒(s)'
      | '0x0059:最小休息时间，单位为秒(s)'
      | '0x005A:最长停车时间，单位为秒(s)'
      | '0x0070:图像/视频质量，1-10,1最好'
      | '0x0071:亮度，0-255'
      | '0x0072:对比度，0-127'
      | '0x0073:饱和度，0-127'
      | '0x0074:色度，0-255'
      | '0x0080:车辆里程表读数，1/10km'
      | '0x0081:车辆所在的省域ID'
      | '0x0082:车辆所在的市域ID'
      | '0x0083:公安交通管理部门颁发的机动车号牌'
      | '0x0084:车牌颜色，按照JT/T415-2006的5.4.12'
      | 'GNSS 定位模式'
      | 'GNSS 波特率'
      | 'GNSS 模块详细定位数据输出频率'
      | 'GNSS 模块详细定位数据采集频率，单位为秒，默认为 1。'
      | 'GNSS 模块详细定位数据上传方式'
      | 'GNSS 模块详细定位数据上传设置'
      | 'CAN 总线通道 1 采集时间间隔(ms)，0 表示不采集'
      | 'CAN 总线通道 1 上传时间间隔(s)，0 表示不上传'
      | 'CAN 总线通道 2 采集时间间隔(ms)，0 表示不采集'
      | 'CAN 总线通道 2 上传时间间隔(s)，0 表示不上传'
      | 'CAN 总线 ID 单独采集设置';
    length?: number;
    payload?: ByteBuf;
    value?: Record<string, any>;
  };

  type TerminalResult = {
    id?: string;
    licensePlateNumber?: string;
    manufacturerId?: string;
    mobileNumber?: string;
    registerTime?: string;
    state?: string;
  };

  type testUsingGETParams = {
    /** mobileNum */
    mobileNum: string;
  };

  type trackUsingPOSTParams = {
    /** terminalId */
    terminalId: string;
  };

  type TransportVehicleInfo = {
    coldStorageFlag?: boolean;
    id?: number;
    joinSysTime?: string;
    licensePlateColor?: number;
    licensePlateNumber?: string;
    loadWeight?: number;
    userId?: number;
    vehicleType?: string;
  };

  type unbindSensorUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
    /** 传感器id */
    sensorId: string;
  };

  type unbindVehicleUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 终端SIM卡号,不足12位第1位补0 */
    terminalMobile: string;
  };

  type unBindVehicleUsingPOSTParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 车牌 */
    vehicleNum: string;
    /** 司机手机号 */
    driverTel: string;
  };

  type updateHostParametersUsingPOSTParams = {
    /** terminalId */
    terminalId: string;
    /** newIp */
    newIp: string;
    /** newPort */
    newPort: number;
  };

  type updateIntervalParametersUsingPOSTParams = {
    /** terminalId */
    terminalId: string;
    /** intervalSeconds */
    intervalSeconds: number;
  };

  type updateVehicleNumParametersUsingPOSTParams = {
    /** terminalId */
    terminalId: string;
    /** vehicleNum */
    vehicleNum: string;
  };

  type VehicleLocation = {
    coldStorageFlag?: boolean;
    id?: number;
    joinSysTime?: string;
    lastOnLineTime?: string;
    latitude?: number;
    licensePlateColor?: number;
    licensePlateNumber?: string;
    loadWeight?: number;
    longitude?: number;
    speed?: number;
    terminalMobile?: string;
    vehicleType?: string;
  };

  type VehicleResult = {
    coldStorageFlag?: boolean;
    id?: number;
    joinSysTime?: string;
    licensePlateColor?: number;
    licensePlateNumber?: string;
    loadWeight?: number;
    state?: string;
    terminalMobile?: string;
    vehicleType?: string;
  };

  type waitDeliveryOrderListUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
  };

  type waitPickOrderListUsingGETParams = {
    /** 该参数值（value='Bearer {token}'）在request header中 */
    Authorization?: string;
    /** 物流企业管理员id */
    userId: number;
  };

  type WarningLog = {
    distributionId?: string;
    id?: number;
    readFlag?: boolean;
    sensorAddress?: string;
    terminalNum?: string;
    time?: string;
    vehicleNum?: string;
    warnDesc?: string;
  };
}
