import { request } from '@umijs/max';


export async function addUserUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/admin/add', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}