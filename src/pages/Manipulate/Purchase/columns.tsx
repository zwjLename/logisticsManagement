import { ProDescriptionsItemProps } from "@ant-design/pro-components";
import { Divider } from "antd";

export const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
        title: '客户单位',
        dataIndex: 'name',
        tip: '名称是唯一的 key',
    },
    {
        title: '目的地',
        dataIndex: 'destination',
        valueType: 'text',
    },
    {
        title: '送达日期',
        dataIndex: 'date',
        valueType: 'date',
    }, {
        title: '联系人',
        dataIndex: 'people'
    }, {
        title: '电话',
        dataIndex: 'tel'
    },
    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => (
            <>
                <a
                    onClick={() => {
                    }}
                >
                    详情
                </a>
                <Divider type="vertical" />
                <a href="">修改</a>
            </>
        ),
    },
];