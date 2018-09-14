// @flow
import React from 'react';
import { connect } from 'dva';
import type { AppProps, AppState } from './App.flow';
import Test from './Test';
import Notification from '../../components/common/Notification';
import Style from './App.scss';

export class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            aa: 0,
            nn: {
                newNodes: [],
            },
        };
    }

    handleButtonClick = () => {
        // const { dispatch } = this.props;
        // this.setState(prevState => ({
        //     nn: prevState.nn + 1,
        // }));
        this.setState((prevState) => {
            const newAddNodes = {
                newNodes: [
                    { n: 1, edge: 1 },
                    { n: 2, edge: 2 },
                ],
            };
            // const newVal = prevState.nn + 1;
            return {
                nn: Object.assign(prevState.nn, newAddNodes),
            };
            // return {
            //     nn: { ...prevState.nn, ...newAddNodes },
            // };
        });
        // dispatch({
        //     type: 'count/addWithDelay',
        // });
    }

    showNotification = () => {
        Notification.info({
            message: 'test',
            title: 'test',
        });
    }

    render() {
        const { aa, nn } = this.state;
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
                    {aa}
                    <button type="button" onClick={this.handleButtonClick}>+</button>
                    <Test
                        nn={nn}
                    />
                    <button type="button" onClick={this.showNotification}>显示</button>
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
