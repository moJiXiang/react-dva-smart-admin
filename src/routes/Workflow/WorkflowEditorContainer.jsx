// @flow
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import WorkflowEditor from './WorkflowEditor';
// import WorkflowPalette from './WorkflowPalette';

export default class WorkflowEditorContainer extends React.Component<any> {
    componentDidMount() {
        console.log('did mount');
    }


    componentDidUpdate() {
        console.log('component did update');
    }

    render() {
        const {
            setDiagramsMap, openCmpConfigModal, workflowShowList, currentWorkflowId,
        } = this.props;

        if (workflowShowList.length > 0) {
            let showIndex = 0;
            for (let index = 0; index < workflowShowList.length; index++) {
                if (workflowShowList[index]._id === currentWorkflowId) showIndex = index;
            }
            console.log(showIndex);
            return (
                <Tabs defaultActiveKey={showIndex} className="workflow-editor-container">
                    {
                        workflowShowList.map((workflow, idx) => {
                            const diagramId = `diagram_${workflow._id}`;
                            return (
                                <Tab key={diagramId} eventKey={idx} title={workflow.name}>
                                    <WorkflowEditor
                                        workflow={workflow}
                                        diagramId={diagramId}
                                        setDiagramsMap={setDiagramsMap}
                                        openCmpConfigModal={openCmpConfigModal}
                                    />
                                </Tab>
                            );
                        })
                    }
                </Tabs>
            );
        }
        return <div />;
    }
}
