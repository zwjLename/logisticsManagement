// @ts-ignore
import { Link } from 'umi';
import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormText
} from '@ant-design/pro-components';
import styles from './index.less';
// import { baseReq } from '@/services/base';
import { history, request, useModel } from '@umijs/max';
import ls from "store"
import { System } from '@/constants';

export default () => {
const {setUser} = useModel('global');

   const submit = async (params: {username: string, password: string}) => {
    const {data = {}} = await request('/auth/login',{params, method: 'POST'})
    console.log('%c [ data ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    const {username = '', id = 0, token = '', tel = ''} = data;
    setUser({
        userName: username,
        userId: id,
        userTel: tel
    })
    ls.set(`${System}-token`, token);
    ls.set(`${System}-user`, {
        userName: username,
        userId: id,
        userTel: tel
    });
    setTimeout(() => {
        history.push('/manipulate/purchase')
    }, 0)
   }

    return (
        <div>
            <LoginForm
                title="登录"
                subTitle="物流监控平台"
                onFinish={submit}
            >
                <ProFormText
                    name="username"
                    fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'用户名'}
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                    ]}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'密码'}
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                    ]}
                />

            </LoginForm>

            <div className={styles[`flex-center`]}>还没有账号，<Link to="/registry">点击注册</Link></div>
        </div>
    );



};