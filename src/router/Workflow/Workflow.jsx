// @flow
import React from 'react';
import { connect } from 'dva';

import WorkflowEditor from './WorkflowEditor';
import Style from './Workflow.scss';

class WorkFlow extends React.PureComponent<any, any> {
    componentDidMount() {
        this.state = {
            count: 0,
        };
    }

    addNodes = () => {
        this.setState(prevState => ({
            count: prevState.count + 1,
        }));
    }

    addWorkflow = () => {

    }

    render() {
        return (
            <div id="content">
                <div className="workflow-body no-content-padding">
                    <div className="inbox-side-bar">
                        <h6>
                            WORKFLOW LIST
                            <a className="pull-right text-color-darken" onClick={this.addWorkflow}>
                                <i className="fa fa-plus" />
                            </a>
                        </h6>
                        <ul className="inbox-menu-lg">
                            <li><a href="https://opsmind.com">a_1</a></li>
                            <li><a href="https://opsmind.com">a_2</a></li>
                            <li><a href="https://opsmind.com">a_3</a></li>
                            <li><a href="https://opsmind.com">a_4</a></li>
                            <li><a href="https://opsmind.com">a_5</a></li>
                        </ul>
                    </div>
                    <div className={Style['workflow-editor']}>
                        <WorkflowEditor />
                    </div>
                    <div className={Style['workflow-components-list']}>
                        <h6>
                            COMPONENT LIST
                            <a href="" className="pull-right text-color-darken">
                                <i className="fa fa-refresh" />
                            </a>
                        </h6>
                        <ul className="inbox-menu-lg">
                            <li><a href="">a_1</a></li>
                            <li><a href="">a_2</a></li>
                            <li><a href="">a_3</a></li>
                            <li><a href="">a_4</a></li>
                            <li><a href="">a_5</a></li>
                        </ul>
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

export default connect(mapStateToProps)(WorkFlow);
