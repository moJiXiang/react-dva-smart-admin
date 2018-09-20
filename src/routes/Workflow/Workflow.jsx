// @flow
import React from 'react';
import { connect } from 'dva';
import { HotTable } from '@handsontable-pro/react';
import includes from 'lodash/includes';
import cloneDeep from 'lodash/cloneDeep';
// import * as go from 'gojs';

import WorkflowEditorContainer from './WorkflowEditorContainer';
// import WorkflowEditor from './WorkflowEditor';
import EditCmpConfigModal from './EditCmpConfigModal';
import Style from './Workflow.scss';
import { genNanoid } from '../../utils/helpers';

class WorkFlow extends React.Component<any, any> {
    dragged= null

    constructor(props) {
        super(props);
        this.state = {
            cmpConfigModalShow: false,
            workflowShowList: [],
            currentWorkflowId: null,
            diagramsMap: {},
            cmpConfig: {},
            count: 0,
        };
        this.data = [
            ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
            ['2016', 10, 11, 12, 13],
            ['2017', 20, 11, 14, 13],
            ['2018', 30, 15, 12, 13],
        ];
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'cmdb/listWorkflows',
        });

        dispatch({
            type: 'cmdb/listComponents',
        });

        document.addEventListener('dragstart', (e: any) => {
            console.log('begin drag');
            this.dragged = e.target;
            e.target.style.border = '2px solid red';
        }, false);

        document.addEventListener('dragend', (e: any) => {
            e.target.style.border = '';
        }, false);
    }

    // ================== workflow 相关方法 ================== //
    addNodes = () => {
        this.setState(prevState => ({
            count: prevState.count + 1,
        }));
    }

    addWorkflow = () => {

    }

    newWorkflow = () => {
        const newWorkflow = {
            model: {
                nodeDataArray: [],
                linkDataArray: [],
            },
            _id: genNanoid(),
            name: '新建工作流',
        };

        this.setState(prevState => ({
            workflowShowList: [...prevState.workflowShowList, newWorkflow],
            currentWorkflowId: newWorkflow._id,
        }));
    }

    updateWorkflowCmpConfig = (cmpConfig) => {
        console.log('cmpConfig', cmpConfig);
        const { currentWorkflowId, workflowShowList } = this.state;
        const __workflowShowList = cloneDeep(workflowShowList);
        for (let index = 0; index < __workflowShowList.length; index++) {
            const workflow = __workflowShowList[index];
            if (currentWorkflowId === workflow._id) {
                for (let j = 0; j < workflow.model.nodeDataArray.length; j++) {
                    if (workflow.model.nodeDataArray[j]._id === cmpConfig._id) {
                        workflow.model.nodeDataArray[j] = { ...workflow.model.nodeDataArray[j], ...cmpConfig, text: cmpConfig.name };
                    }
                }
            }
        }
        this.setState({
            workflowShowList: __workflowShowList,
        }, () => this.handleClose());
    }

    modifyWorkflow = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'workflow/update',
        });
    }

    showWorkflow = (workflow) => {
        this.setState({
            // currentWorkflowId: workflow._id,
        });
    }

    addToWorkflowShowList = (workflow) => {
        const { workflowShowList } = this.state;
        if (includes(workflowShowList, workflow)) return;
        this.setState(prevState => ({
            currentWorkflowId: workflow._id,
            workflowShowList: [...prevState.workflowShowList, workflow],
        }));
    }

    //  ==================== 组件相关接口 =================== //
    selectComponent = (cmp) => {
        console.log('cmp====', cmp);
        this.setState({
            cmpConfig: cmp,
        });
    }

    addComponent = () => {

    }

    modifyComponentConfig = () => {

    }

    dragComponentToEditor = () => {
        console.log('drag component to editor');
    }

    // workflow diagram 相关方法
    setDiagramsMap = (diagramId, diagramInstance) => {
        this.setState(prevState => ({
            diagramsMap: { ...prevState.diagramsMap, [diagramId]: diagramInstance },
        }), () => this.bindDragDropEvent(diagramId));
    }

    // 绑定 html5 drag drop 事件
    bindDragDropEvent = (currentDiagramId) => {
        // workflow palette
        const { diagramsMap, currentWorkflowId } = this.state;
        const currentDiagramInstance = diagramsMap[currentDiagramId];
        const currentDiagramInstanceDiv = document.getElementById(currentDiagramId);
        currentDiagramInstanceDiv.addEventListener('dragover', (e: any) => {
            console.log('enter to diagram');
            const can = e.target;
            if (!(can instanceof HTMLCanvasElement)) return;
            e.preventDefault();
        }, false);

        currentDiagramInstanceDiv.addEventListener('drop', (e: any) => {
            console.log('drop to the diagram');
            e.preventDefault();
            const can = e.target;
            if (!(can instanceof HTMLCanvasElement)) return;

            // const { clientX, clientY } = e;
            // const point = currentDiagramInstance.transformViewToDoc(new go.Point(clientX, clientY));
            // currentDiagramInstance.startTransaction('new node');
            // currentDiagramInstance.model.addNodeData({
            //     location: point,
            //     text: this.dragged.textContent,
            //     color: 'lightyellow',
            // });
            const { workflowShowList, cmpConfig } = this.state; // 保证每次拿到的都是最新的workflowShowList
            const __workflowShowList = cloneDeep(workflowShowList);
            for (let index = 0; index < __workflowShowList.length; index++) {
                if (__workflowShowList[index]._id === currentWorkflowId) {
                    const workflow = __workflowShowList[index];
                    console.log('current workflow', workflow);
                    const len = workflow.model.nodeDataArray.length;
                    const newNode = { ...cmpConfig, text: cmpConfig.name, key: len + 1 };
                    workflow.model.nodeDataArray.push(newNode);
                    break;
                }
            }
            this.setState({
                cmpConfigModalShow: true,
                workflowShowList: __workflowShowList,
            });
            currentDiagramInstance.commitTransaction('new node');
        }, false);
    }

    // ================= 编辑 component config modal =================
    openCmpConfigModal = () => {
        this.setState({
            cmpConfigModalShow: true,
        });
    }

    handleClose = () => {
        this.setState({
            cmpConfigModalShow: false,
        });
    }

    render() {
        const { data } = this;
        const { cmdb: { workflowsList, componentsList } } = this.props;
        const {
            currentWorkflowId, cmpConfigModalShow, workflowShowList, count, cmpConfig,
        } = this.state;
        console.log('Workflow render');

        // const currentWorkflow = workflowsList.filter(wk => wk._id === currentWorkflowId)[0];
        return (
            <div id="content">
                <div className="row">
                    <div className={Style['workflow-body']}>
                        <div className="inbox-side-bar">
                            <h6>
                                工作流列表
                                <a className="pull-right text-color-darken" onClick={this.addWorkflow}>
                                    <i className="fa fa-plus" onClick={this.newWorkflow} />
                                </a>
                            </h6>
                            <ul className="inbox-menu-lg">
                                {workflowsList.map(workflow => (
                                    <li key={workflow._id}>
                                        <a href-void="true" onClick={() => this.addToWorkflowShowList(workflow)}>{workflow.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={Style['workflow-editor']}>
                            {/* 工作流编辑器 */}
                            <WorkflowEditorContainer
                                currentWorkflowId={currentWorkflowId}
                                workflowShowList={workflowShowList}
                                count={count}
                                setDiagramsMap={this.setDiagramsMap}
                                openCmpConfigModal={this.openCmpConfigModal}
                            />
                            {/* <WorkflowEditor
                                workflow={currentWorkflow}
                                diagramId="workflowDiagram"
                                setDiagramsMap={this.setDiagramsMap}
                                newNode={newNode}
                            /> */}
                            <HotTable data={data} colHeaders="true" rowHeaders="true" width="600" height="300" stretchH="all" />
                        </div>
                        <div className={Style['workflow-components-list']}>
                            <h6>
                                组件列表
                                <a href="#" className="pull-right text-color-darken" onClick={this.addComponent}>
                                    <i className="fa fa-plus" />
                                </a>
                            </h6>
                            <ul className="inbox-menu-lg">
                                {componentsList.map(cmp => (
                                    <li key={cmp._id}>
                                        <a href-void="true" draggable="true" onDragStart={() => this.selectComponent(cmp)}>{cmp.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <EditCmpConfigModal
                    cmpConfigModalShow={cmpConfigModalShow}
                    cmpConfig={cmpConfig}
                    updateWorkflowCmpConfig={this.updateWorkflowCmpConfig}
                    handleClose={this.handleClose}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ workflow, cmdb, loading }) => ({
    workflow,
    cmdb,
    submitting: loading.effects['count/addWithDelay'],
});

export default connect(mapStateToProps)(WorkFlow);
