import React from 'react';
import dynamic from 'dva/dynamic';
import propTypes from 'prop-types';
import { Route, routerRedux, Switch } from 'dva/router';

// models
import Count from './models/count';

// layouts
import BasicLayout from './layouts/BasicLayout';

// components
import AppComponent from './router/App/App';

const { ConnectedRouter } = routerRedux;

function router({ history, app }) {
    const App = dynamic({
        app,
        models: () => [Count],
        component: () => AppComponent,
    });

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={BasicLayout} />
                <Route path="/app" component={App} />
            </Switch>
        </ConnectedRouter>
    );
}

router.propTypes = {
    history: propTypes.isRequired,
    app: propTypes.element.isRequired,
};

export default router;
