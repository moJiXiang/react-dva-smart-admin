import request from 'then-request';

export default function (url) {
    return new Promise((resolve, reject) => {
        request('GET', url, { json: true }).then((res) => {
            resolve(JSON.parse(res.getBody()));
        }).catch(reject);
    });
}
