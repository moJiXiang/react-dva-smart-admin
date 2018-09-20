// import { listWorkflows } from '../services/api';
import { listWorkflows, listComponents } from '../mock/api';

export default {
    namespace: 'cmdb',

    state: {
        workflowsList: [],
        componentsList: [],
    },

    effects: {
        * listWorkflows({ payload }, { call, put }) {
            const ret = yield call(listWorkflows, payload);
            yield put({
                type: 'initWorkflows',
                payload: {
                    workflowsList: ret.data.list,
                },
            });
        },
        * listComponents({ payload }, { call, put }) {
            const ret = yield call(listComponents, payload);
            yield put({
                type: 'initWorkflows',
                payload: {
                    componentsList: ret.data.list,
                },
            });
        },
    },
    reducers: {
        initWorkflows(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
