import { defineConfig } from '@umijs/max';

const proxyContent = {
  'target': 'https://111.229.163.181:8443',
      'changeOrigin': true,
      secure: false,
}
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  valtio: {},
  layout: {
    title: '物流监控平台',
  },
  routes: [
    {
      path: '/',
      layout: false,
      redirect: 'monitor/vehicleMonitor'
    },
    {
      path: '/registry',
      layout: false,
      component: './Registry'
    },
    {
      path: '/login',
      layout: false,
      component: './Login'
    },
    {
      name: '监控中心',
      path: '/monitor',
      routes: [{
        path: 'vehicleMonitor',
        name: '车辆分布',
        component: './Monitor/VehicleMonitor'
      },
      // {
      //   path: 'carbinMonitor',
      //   name: '车厢监控',
      //   component: './Monitor/CarbinMonitor'
      // },
      {
        path: 'trackMonitor',
        name: '定位跟踪',
        component: './Monitor/TrackMonitor'
      }]
    },
    {
      name: '操控台',
      path: '/manipulate',
      routes: [{
        path: 'purchase',
        name: '采购分派',
        component: './Manipulate/Purchase'
      }, {
        path: 'deliver',
        name: '配送调度',
        component: './Manipulate/Deliver'
      }, {
        path: 'dialog',
        name: '司机对话',
        component: './Manipulate/Dialog'
      }]
    },
    {
      name: '数据眼',
      path: '/dataeye',
      routes: [{
        path: 'allOrders',
        name: '所有订单',
        component: './DataEye/AllOrders'
      },{
        path: 'deliverTask',
        name: '配送任务',
        component: './DataEye/DeliverTask'
      }, {
        path: 'vehicleData',
        name: '车辆轨迹',
        component: './DataEye/VehicleData'
      }, {
        path: 'carbinEnv',
        name: '车厢环境',
        component: './DataEye/CarbinEnv'
      }, {
        path: 'carbinData',
        name: '告警历史',
        component: './DataEye/CarbinData'
      }]
    },
    {
        name: '配置',
        path: '/config',
        routes: [{
          path: 'client',
          name: '客户单位',
          component: './Config/Client'
        }, {
          path: 'member',
          name: '人员',
          component: './Config/Member'
        }, {
          path: 'vehicle',
          name: '车辆',
          component: './Config/Vehicle'
        }, {
          path: 'terminal',
          name: '终端',
          component: './Config/Terminal'
        }]
        // component: './Table',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/micro-vehicles-test': proxyContent,
    '/micro-vehicles': proxyContent,
    '/authority': proxyContent,
    '/auth': proxyContent
  },
  plugins: [require.resolve("@umijs/max-plugin-openapi")], // './src/plugins/mapplugin.ts'
  openAPI: {
    requestLibPath: "import { request } from '@umijs/max'",
    // 这里使用服务端提供的url
    schemaPath:
      "https://111.229.163.181:8443/micro-vehicles-test/v2/api-docs",
    mock: false,
  },
  mock: false
});

