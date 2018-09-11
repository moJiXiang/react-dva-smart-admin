import dva from 'dva';
import createLoading from 'dva-loading';

import router from './router';
import registerServiceWorker from './registerServiceWorker';
import './index.scss';

const app = dva();

app.use(createLoading());

app.router(router);

app.start('#root');

registerServiceWorker();
