import React from 'react';
import WorkflowEditor from './WorkflowEditor';

export default class WorkflowJobs extends React.PureComponent<any> {
    componentDidMount() {

    }


    render() {
        return (
            <div id="content">
                <div className="row">
                    <div className="col-lg-12">
                        <WorkflowEditor
                            diagramElementId="workflowJob"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
