import Mock from 'mockjs';

const apiUrl = 'http://opsmind.com:8001/api-v1';

Mock.mock(`${apiUrl}/workflow.json`, 'get', {
    'list|4': [{
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
        _id: '5b98f9068c5df6b3ceccc4ee',
    }],
});
