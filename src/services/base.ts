import { RequestData } from '@ant-design/pro-components';
import { AxiosResponse, request } from '@umijs/max';

interface ResType<T> {
  code: number,
  data: T,
  msg: string
}
export const baseReq = async <T>({ url, params, data, method = 'POST' }: { url: string, params?: any, data?: any, method?: string }): Promise<T> => {
  return request(url, {
    method,
    params,
    data,
  })
}