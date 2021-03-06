// import { listWorkflows } from '../services/api';
import { listWorkflows } from '../mock/api';

export default {
    namespace: 'workflow',

    state: {
        list: [],
    },

    effects: {
        * listWorkflows({ payload }, { call, put }) {
            const ret = yield call(listWorkflows, payload);
            yield put({
                type: 'initWorkflows',
                payload: {
                    list: ret.data.list,
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
