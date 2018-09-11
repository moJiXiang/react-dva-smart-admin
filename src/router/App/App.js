// @flow
import React from 'react';
import { connect } from 'dva';

import type { AppProps, AppState } from './App.flow';
import Style from './App.scss';

export class App extends React.Component<AppProps, AppState> {
    handleButtonClick = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'count/addWithDelay',
        });
    }

    render() {
        const { count, submitting } = this.props;
        return (
            <div className={Style.App}>
                <header className={Style['App-header']}>
                    <h1 className={Style['App-title']}>Welcome to React</h1>
                </header>
                <div>
                    {submitting ? 'loading...' : ''}
                    Count:
                    {count}
                    <button type="button" onClick={this.handleButtonClick}>+</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ count, loading }) => ({
    count,
    submitting: loading.effects['count/addWithDelay'],
});

export default connect(mapStateToProps)(App);
