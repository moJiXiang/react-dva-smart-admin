import Mock from 'mockjs';

Mock.mock('http://workflows.json', 'get', {
    list: [{
        extern_id: 'AB42C54C-DFF9-425D-9D2E-404BFA558606',
        inode: {
            ctime: 1536751878,
            id: 'cmdb_server-18s8etu8djxqq',
            last_editor: 'TODO',
            mtime: 1536751878,
            org: '2fsiml578lbqj',
            type: 'cmdb_server',
        },
        is_deleted: false,
        name: '开一台虚拟机',
        model: {
            nodeDataArray: [
                { key: 1, text: 'Loading Screen', category: 'Loading' },
                { key: 2, text: 'Beginning' },
                { key: 3, text: 'Segment 1' },
                { key: 4, text: 'Segment 2' },
                { key: 5, text: 'Segment 3' },
                { key: 6, text: 'End Screen', category: 'End' },
            ],
            linkDataArray: [
                { from: 1, to: 2 },
                { from: 2, to: 3 },
                { from: 2, to: 5 },
                { from: 3, to: 4 },
                { from: 4, to: 6 },
            ],
        },
        _id: '145b98f9068c5df6b3ceccc4ee',
    }, {
        extern_id: 'AB42C54C-DFF9-425D-9D2E-404BFA558606',
        inode: {
            ctime: 1536751878,
            id: 'cmdb_server-18s8etu8djxqq',
            last_editor: 'TODO',
            mtime: 1536751878,
            org: '2fsiml578lbqj',
            type: 'cmdb_server',
        },
        is_deleted: false,
        name: '开虚拟机工作流',
        model: {
            nodeDataArray: [
                { key: 1, text: 'Loading Screen', category: 'Loading' },
                { key: 2, text: 'Beginning' },
                { key: 3, text: 'Segment 1' },
                { key: 4, text: 'Segment 2' },
                { key: 5, text: 'Segment 3' },
                { key: 6, text: 'End Screen', category: 'End' },
            ],
            linkDataArray: [
                { from: 1, to: 2 },
                { from: 2, to: 3 },
                { from: 2, to: 5 },
                { from: 3, to: 4 },
                { from: 4, to: 6 },
            ],
        },
        _id: '235b98f9068c5df6b3ceccc4ee',
    }, {
        extern_id: 'AB42C54C-DFF9-425D-9D2E-404BFA558606',
        inode: {
            ctime: 1536751878,
            id: 'cmdb_server-18s8etu8djxqq',
            last_editor: 'TODO',
            mtime: 1536751878,
            org: '2fsiml578lbqj',
            type: 'cmdb_server',
        },
        is_deleted: false,
        name: '删除ngxin日志工作流',
        model: {
            nodeDataArray: [
                { key: 1, text: 'Loading Screen', category: 'Loading' },
                { key: 2, text: 'Beginning' },
                { key: 3, text: 'Segment 1' },
                { key: 4, text: 'Segment 2' },
                { key: 5, text: 'Segment 3' },
                { key: 6, text: 'End Screen', category: 'End' },
            ],
            linkDataArray: [
                { from: 1, to: 2 },
                { from: 2, to: 3 },
                { from: 2, to: 5 },
                { from: 3, to: 4 },
                { from: 4, to: 6 },
            ],
        },
        _id: '325b98f9068c5df6b3ceccc4ee',
    }, {
        extern_id: 'AB42C54C-DFF9-425D-9D2E-404BFA558606',
        inode: {
            ctime: 1536751878,
            id: 'cmdb_server-18s8etu8djxqq',
            last_editor: 'TODO',
            mtime: 1536751878,
            org: '2fsiml578lbqj',
            type: 'cmdb_server',
        },
        is_deleted: false,
        name: '删除duckducksts日志工作流',
        model: {
            nodeDataArray: [
                { key: 1, text: 'Loading Screen', category: 'Loading' },
                { key: 2, text: 'Beginning' },
                { key: 3, text: 'Segment 1' },
                { key: 4, text: 'Segment 2' },
                { key: 5, text: 'Segment 3' },
                { key: 6, text: 'End Screen', category: 'End' },
            ],
            linkDataArray: [
                { from: 1, to: 2 },
                { from: 2, to: 3 },
                { from: 2, to: 5 },
                { from: 3, to: 4 },
                { from: 4, to: 6 },
            ],
        },
        _id: '415b98f9068c5df6b3ceccc4ee',
    }],
});

Mock.mock('http://components.json', 'get', {
    list: [{
        extern_id: 'AB42C54C-DFF9-425D-9D2E-404BFA558606',
        inode: {
            ctime: 1536751878,
            id: 'cmdb_server-18s8etu8djxqq',
            last_editor: 'TODO',
            mtime: 1536751878,
            org: '2fsiml578lbqj',
            type: 'cmdb_server',
        },
        is_deleted: false,
        name: '删除 nginx 日志脚本',
        _id: '45b98f9068c5df6b3ceccc4ee',
    }, {
        extern_id: 'AB42C54C-DFF9-425D-9D2E-404BFA558606',
        inode: {
            ctime: 1536751878,
            id: 'cmdb_server-18s8etu8djxqq',
            last_editor: 'TODO',
            mtime: 1536751878,
            org: '2fsiml578lbqj',
            type: 'cmdb_server',
        },
        is_deleted: false,
        name: '新增云主机',
        _id: '35b98f9068c5df6b3ceccc4ee',
    }, {
        extern_id: 'AB42C54C-DFF9-425D-9D2E-404BFA558606',
        inode: {
            ctime: 1536751878,
            id: 'cmdb_server-18s8etu8djxqq',
            last_editor: 'TODO',
            mtime: 1536751878,
            org: '2fsiml578lbqj',
            type: 'cmdb_server',
        },
        is_deleted: false,
        name: '部署 nginx 脚本',
        _id: '25b98f9068c5df6b3ceccc4ee',
    }, {
        extern_id: 'AB42C54C-DFF9-425D-9D2E-404BFA558606',
        inode: {
            ctime: 1536751878,
            id: 'cmdb_server-18s8etu8djxqq',
            last_editor: 'TODO',
            mtime: 1536751878,
            org: '2fsiml578lbqj',
            type: 'cmdb_server',
        },
        is_deleted: false,
        name: '部署 docker 脚本',
        _id: '15b98f9068c5df6b3ceccc4ee',
    }],
});

Mock.mock('http://component.post.one.json', 'post', {
    extern_id: 'AB42C54C-DFF9-425D-9D2E-404BFA558606',
    inode: {
        ctime: 1536751878,
        id: 'cmdb_server-18s8etu8djxqq',
        last_editor: 'TODO',
        mtime: 1536751878,
        org: '2fsiml578lbqj',
        type: 'cmdb_server',
    },
    is_deleted: false,
    name: '删除ngxin日志工作流',
    model: {
        nodeDataArray: [
            { key: 1, text: 'Loading Screen', category: 'Loading' },
            { key: 2, text: 'Beginning' },
            { key: 3, text: 'Segment 1' },
            { key: 4, text: 'Segment 2' },
            { key: 5, text: 'Segment 3' },
            { key: 6, text: 'End Screen', category: 'End' },
            { key: -2, category: 'Recycle' },
        ],
        linkDataArray: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 2, to: 5 },
            { from: 3, to: 4 },
            { from: 4, to: 6 },
        ],
    },
    _id: '325b98f9068c5df6b3ceccc4ee',
});
