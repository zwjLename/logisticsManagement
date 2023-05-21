// 运行时配置
// @ts-ignore
import type { RequestConfig } from 'umi';
import { errorNotice } from './utils/format';
import { RunTimeLayoutConfig, history, useModel, request as baseReq } from '@umijs/max';
import queryString from 'query-string';
import { Dropdown } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import ls from "store";
import { System } from './constants';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {

  return { name: '物流监控平台' };

}



export const layout: RunTimeLayoutConfig = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useModel('global')
  const { userName } = user || {};

  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    layout: 'mix',
    fixedHeader: true,
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      size: 'small',
      title: userName,
      render: (_props: any, dom: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                  onClick: async () => {
                    await baseReq('/auth/logout', { method: 'GET' })
                    history.push('/login')
                  }
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    }
  };
};


export const request: RequestConfig = {
  timeout: 10000,
  paramsSerializer(params: Record<string, any>) {
     return queryString.stringify(params);
  },
  errorConfig: {
    errorHandler() {
    },
    errorThrower() {
    }
  },
  requestInterceptors: [(config: any) => {
    // console.log("...header",config.headers.common)
    if (ls.get(`${System}-token`) && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/registry')) {
      config.headers['Authorization'] = ls.get(`${System}-token`)
    } else {
      delete config.headers.Authorization
    }
    // TODO 暂时把视屏的切到micro-vehicles
    return {
      ...config,
      url: config.url.includes('/auth/') ? config.url : config.url.includes('/request') || config.url.includes('/control') ? `/micro-vehicles${config.url}` :  config.url.includes('/admin/add') ? `/authority${config.url}` : `/micro-vehicles-test${config.url}`,
     
    }
  }],
  responseInterceptors: [(response: any) => {
    const { data = {} } = response;
    const { code, message, msg } = data;
    if (code === 50006) {
      ls.set(`${System}-token`, null);
      history.replace('/login');
      return ;
    }
    if (code) {
      errorNotice({ msg: message || msg });
      return Promise.reject()
    }
    return response;
  }]
};