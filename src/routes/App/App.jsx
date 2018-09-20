// @flow
import React from 'react';
import { connect } from 'dva';
import Notification from '../../components/common/Notification';
import Style from './App.scss';
import AppChild from './AppChild';
import NodesChild from './NodesChild';
import { genNanoid } from '../../utils/helpers';

export class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            aa: 0,
            nodes: [],
            workflow: {
                nodeArray: [],
            },
        };
    }

    handleButtonClick = () => {
        // const { dispatch } = this.props;
        // this.setState(prevState => ({
        //     nn: prevState.nn + 1,
        // }));
        this.setState(prevState => ({
            aa: prevState.aa + 1,
            nodes: [...prevState.nodes, { id: genNanoid() }],
        }));
        // dispatch({
        //     type: 'count/addWithDelay',
        // });
    }

    handleWfBtnClick = () => {
        this.setState(prevState => ({
            workflow: {
                ...prevState.workflow,
                nodeArray: [...prevState.workflow.nodeArray, { key: genNanoid() }],
            },
        }));
    }

    showNotification = () => {
        Notification.info({
            message: 'test',
            title: 'test',
        });
    }

    render() {
        const { aa, nodes, workflow } = this.state;
        console.log('aa', aa);
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

                    <button type="button" onClick={this.showNotification}>显示</button>
                    <i>App child</i>
                    <AppChild
                        count={aa}
                        nodes={nodes}
                    />
                </div>

                <div id="content">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>测试props传值</h3>
                            <button type="button" onClick={this.handleWfBtnClick}>add node</button>
                            <NodesChild
                                workflow={workflow}
                            />
                        </div>
                    </div>
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
