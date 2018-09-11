import dva from 'dva';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

const app = dva()

app.router(require('./router').default)

app.start('#root')

registerServiceWorker();
