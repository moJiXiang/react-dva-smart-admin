export const loginJsonSchema = {
    schema: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: {
                type: 'string',
                title: '用户名',
                messages: {
                    required: '用户名未填写！',
                },
            },
            password: {
                type: 'string',
                title: '密码',
                messages: {
                    required: '密码未填写！',
                },
            },
        },
    },
    uiSchema: {
        username: {
            'ui:autofocus': true,
            'ui:help': '请填写用户名！',
        },
        password: {
            'ui:widget': 'password',
            'ui:help': '请填写密码！',
        },
    },
};

export const componentSchema = {
    schema: {
        title: '节点属性',
        type: 'object',
        properties: {
            name: {
                type: 'string',
                title: '节点名称',
            },
            descr: {
                type: 'string',
                title: '节点描述',
            },
            config: {
                title: '节点配置',
                type: 'object',
                properties: {
                    cloudprovider: {
                        type: 'string',
                        title: '云厂商',
                    },
                    cpu: {
                        type: 'number',
                        title: 'CPU 核数',
                    },
                    memory: {
                        type: 'number',
                        title: '内存',
                    },
                },
            },
        },
    },
    uiSchema: {

    },
};

export const componentConfigSchema = {
    schema: {
        title: '节点配置',
        type: 'object',
        properties: {
            cloudprovider: {
                type: 'string',
                title: '云厂商',
            },
        },
    },
    uiSchema: {},
};
