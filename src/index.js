import dva from 'dva';
import createLoading from 'dva-loading';

import router from './router';
import registerServiceWorker from './registerServiceWorker';

import './assets/scss/smartadmin-production.scss';
import './assets/scss/smartadmin-react.scss';
import 'react-notifications/lib/notifications.css';
import './index.scss';

const app = dva();

app.use(createLoading());

app.router(router);

app.start('#root');

registerServiceWorker();
