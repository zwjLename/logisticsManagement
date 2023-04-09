// 运行时配置
// @ts-ignore
import type { RequestConfig } from 'umi';
import { errorNotice } from './utils/format';
import { RunTimeLayoutConfig, history, useModel } from '@umijs/max';
import { Dropdown } from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { baseReq } from './services/base';
import ls from "store";

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  return { name: '物流监控平台' };

}

export const layout: RunTimeLayoutConfig = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {userName} = useModel('global')
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
      render: (props, dom) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                  onClick: async () =>  {
                    await baseReq({url: '/api/auth/logout', method: 'GET'})
                    history.push('/login')
                  }
                },
              ],
            }}
          >
            <>{dom}</>
          </Dropdown>
        );
      },
    }
  };
};

export const request: RequestConfig = {
  timeout: 10000,
  headers: ls.get('token') ? {Authorization: ls.get('token')} : {},
  errorConfig: {
    errorHandler() {
    },
    errorThrower() {
    }
  },
  requestInterceptors: [],
  responseInterceptors: [(response: any) => {
    const { data = {} } = response;
    const { code, message, msg } = data;
    if (code) {
      errorNotice({ msg: message || msg })
    }
    return response;
  }]
};