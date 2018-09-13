import utils from '../helpers/utils';

const { delay } = utils;

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
