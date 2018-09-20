import axios from 'axios';
// import request from '../utils/request';

require('./cmdb.js');

export function listWorkflows() {
    // return request('http://workflows.json');
    return axios.get('http://workflows.json');
}

export function listComponents() {
    return axios.get('http://components.json');
}
