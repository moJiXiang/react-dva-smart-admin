import React from 'react';
import dynamic from 'dva/dynamic';
import propTypes from 'prop-types';
import { Route, routerRedux, Switch } from 'dva/router';

// models
import auth from './models/auth';
import count from './models/count';
import workflow from './models/workflow';
import cmdb from './models/cmdb';

// layouts
import BasicLayout from './layouts/BasicLayout';

// components
import RouterLogin from './routes/Auth/Login';
import RouterApp from './routes/App/App';
import RouterWorkflow from './routes/Workflow/Workflow';
import RouterWorkflowJobs from './routes/Workflow/WorkflowJobs';

const { ConnectedRouter } = routerRedux;

function router({ history, app }) {
    const Login = dynamic({
        app,
        models: () => [auth],
        component: () => RouterLogin,
    });

    const App = dynamic({
        app,
        models: () => [count],
        component: () => RouterApp,
    });

    const Workflow = dynamic({
        app,
        models: () => [workflow, cmdb],
        component: () => RouterWorkflow,
    });

    const WorkflowJobs = dynamic({
        app,
        models: () => [],
        component: () => RouterWorkflowJobs,
    });

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/login" component={Login} />
                <BasicLayout exact path="/app" component={App} />
                <BasicLayout exact path="/workflow" component={Workflow} />
                <BasicLayout path="/workflow/jobs" component={WorkflowJobs} />
            </Switch>
        </ConnectedRouter>
    );
}

router.propTypes = {
    history: propTypes.isRequired,
    app: propTypes.element.isRequired,
};

export default router;
