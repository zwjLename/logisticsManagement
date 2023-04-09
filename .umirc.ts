import { defineConfig } from '@umijs/max';

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
      }, {
        path: 'carbinMonitor',
        name: '车厢监控',
        component: './Monitor/CarbinMonitor'
      }, {
        path: 'trackMonitor',
        name: '定位跟踪',
        component: 'Monitor/TrackMonitor'
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
        path: 'vehicleData',
        name: '车辆分布',
        component: './DataEye/VehicleData'
      }, {
        path: 'carbinData',
        name: '车厢监控',
        component: './DataEye/CarbinData'
      }]
    },
    {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      'target': 'https://111.229.163.181:8443',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
      secure: false,
    },
  },
});

