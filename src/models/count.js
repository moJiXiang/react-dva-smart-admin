import { delay } from '../utils/helpers';

export default {
    namespace: 'count',
    state: 0,
    effects: {
        * addWithDelay(action, { call, put }) {
            yield call(delay, 500);
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
