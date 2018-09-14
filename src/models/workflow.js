export default {
    namespace: 'workflow',
    workflows: [],
    effects: {
        * listWorkflows(action, { call, put }) {
            yield put({ type: 'add' });
        },
    },
    reducers: {
        add(state) {
            return state + 1;
        },
        minus(state) {
            return state - 1;
        },
    },
};
