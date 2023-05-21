// @ts-ignore
import { Link, history } from 'umi';
import {
    LockOutlined,
    UserOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import {
    LoginForm,
    ProFormText,
    ProFormMoney
} from '@ant-design/pro-components';
import styles from './index.less';
import { errorNotice, noticeFunc } from '@/utils/format';
import { SUCCESS_CODE } from '@/constants';
import { request } from '@umijs/max';


export default () => {
    const submit = async (values: any) => {
        const { password, repassword, username, tel } = values;
        if (password !== repassword) {
            errorNotice({ title: '两次密码不一致' });
            return;
        }
        const { data, code } = await request('/auth/signup',{ data: { password, username, tel }});
        if (code === SUCCESS_CODE) {
            noticeFunc('success', {title: '注册成功！去登录'});
            history.push('/login')
        }

    }
    return (
        <div>
            <LoginForm
                title="注册"
                subTitle="物流监控平台"
                onFinish={submit}
                submitter={{
                    searchConfig:{submitText: '注册'}
                }}
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
                <ProFormMoney
                    name="tel"
                    placeholder={"手机号码"}
                    rules={[{ required: true, message: '请输入手机号码' }]}
                    fieldProps={{
                        prefix: <PhoneOutlined className={'prefixIcon'} />,
                        moneySymbol: false
                    }}
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
                <ProFormText.Password
                    name="repassword"
                    fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined className={'prefixIcon'} />,
                    }}
                    placeholder={'再次输入密码'}
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码！',
                        },
                    ]}
                />
            </LoginForm>

            <div className={styles['flex-center']}>已有账号，<Link to="/login">点击登录</Link></div>
        </div>
    );



};