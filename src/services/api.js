// @flow
import request from '../utils/request';
import type { loginType } from '../utils/flowtype';

const APIURL = '/api-v1';
// const APIURL = 'http://portal.opsmind.com:8000/api-v1';

// auth api
export async function login(params: loginType) {
    return request(`${APIURL}/auth/login`, {
        method: 'POST',
        body: params,
    });
}

export async function listWorkflows(params: any) {
    return request(`${APIURL}/workflows`);
}
