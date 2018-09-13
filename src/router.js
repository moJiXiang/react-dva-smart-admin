import React from 'react';
import dynamic from 'dva/dynamic';
import propTypes from 'prop-types';
import { routerRedux, Switch } from 'dva/router';

// models
import Count from './models/count';

// layouts
import BasicLayout from './layouts/BasicLayout';

// components
import AppComponent from './router/App/App';
import WorkflowComponent from './router/Workflow/Workflow';

const { ConnectedRouter } = routerRedux;

function router({ history, app }) {
    const App = dynamic({
        app,
        models: () => [Count],
        component: () => AppComponent,
    });

    const Workflow = dynamic({
        app,
        models: () => [Count],
        component: () => WorkflowComponent,
    });

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <BasicLayout path="/app" component={App} />
                <BasicLayout path="/workflow" component={Workflow} />
            </Switch>
        </ConnectedRouter>
    );
}

router.propTypes = {
    history: propTypes.isRequired,
    app: propTypes.element.isRequired,
};

export default router;
