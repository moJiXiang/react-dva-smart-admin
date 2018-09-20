import { routerRedux } from 'dva/router';
import { delay } from '../utils/helpers';
import { login } from '../services/api';

export default {
    namespace: 'auth',
    state: 0,
    effects: {
        * login({ payload }, { call, put }) {
            yield call(delay, 1000);
            const ret = yield call(login, payload);
            console.log(ret);
            yield put(routerRedux.push('/'));
        },
    },
    reducers: {

    },
};
