import { notification, message } from 'antd';


// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

export function noticeFunc(type: 'success', {msg, title}: {msg?: string; title?: string}) {
  notification[type]({
    message: title,
    description: msg,
  })
}
export function errorNotice({msg = '', title = '服务器错误'}) {
  notification.error({
    message: title,
    description: msg,
    placement: 'topRight'
  });
}
