// @flow
import React from 'react';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
// import { connect } from 'dva';
import * as go from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';

import DiagramButtons from './DiagramButtons';
// import SelectionDetails from './SelectionDetails';
import { getRandomColor } from '../../utils/helpers';
import './Workflow.scss?global';

// const { ToolManager } = go;

// Define a custom tool that changes a drag operation on a Link to a relinking operation,
class DragLinkingTool extends go.DraggingTool {
    constructor() {
        super();
        this.isGridSnapEnabled = true;

        this.isGridSnapRealtime = false;

        this.gridSnapCellSize = new go.Size(182, 1);

        this.gridSnapOrigin = new go.Point(5.5, 0);
    }

    // Handle dragging a link specially -- by starting the RelinkingTool on that Link
    doActivate() {
        const { diagram } = this;
        if (diagram === null) return;
        this.standardMouseSelect();
        const main = this.currentPart; // this is set by the standardMouseSelect
        if (main instanceof go.Link) { // maybe start relinking instead of dragging
            const relinkingtool = diagram.toolManager.relinkingTool;
            // tell the RelinkingTool to work on this Link, not what is under the mouse
            relinkingtool.originalLink = main;
            // start the RelinkingTool
            diagram.currentTool = relinkingtool;
            // can activate it right now, because it already has the originalLink to reconnect
            relinkingtool.doActivate();
            relinkingtool.doMouseMove();
        } else {
            go.DraggingTool.prototype.doActivate.call(this);
        }
    }
}

type Props = {
    workflow: Object,
    diagramId: string,
    setDiagramsMap: Function,
    openCmpConfigModal: Function,
}

export default class WorkflowEditor extends React.Component<Props, any> {
    nodeId = 0;

    constructor(props: Object) {
        super(props);
        this.state = {
            count: 0,
            selectedNodeKeys: [],
            // model: {
            //     nodeDataArray: [],
            //     linkDataArray: [],
            // },
            // model: cloneDeep(props.workflow.model),
            workflow: cloneDeep(props.workflow),
        };
    }

    // static getDerivedStateFromProps(nextProps: Props, prevState: any) {
    //     if (!isEqual(nextProps.workflow, prevState.workflow)) {
    //         return {
    //             workflow: cloneDeep(nextProps.workflow),
    //         };
    //     }
    //     return null;
    // }
    componentWillReceiveProps(nextProps: any) {
        const { workflow } = this.props;
        console.log(nextProps.workflow, workflow, isEqual(nextProps.workflow, workflow));
        if (!isEqual(nextProps.workflow, workflow)) {
            this.setState({
                workflow: cloneDeep(nextProps.workflow),
            });
        }
    }

    componentDidUpdate() {
        console.log('workflow editor update');
    }

    initModelHandler = () => {
        this.setState((prevState) => {
            const initModel = {
                nodeDataArray: [
                    { key: '1', text: 'Loading Screen', category: 'Loading' },
                    { key: '2', text: 'Beginning' },
                    { key: '3', text: 'Segment 1' },
                    { key: '4', text: 'Segment 2' },
                    { key: '5', text: 'Segment 3' },
                    { key: '6', text: 'End Screen', category: 'End' },
                    { key: -2, category: 'Recycle' },
                ],
                linkDataArray: [
                    { from: 1, to: 2 },
                    { from: 2, to: 3 },
                    { from: 2, to: 5 },
                    { from: 3, to: 4 },
                    { from: 4, to: 6 },
                ],
            };
            return { model: { ...prevState.model, ...initModel } };
            // return {
            //     workflow: {
            //         ...prevState.workflow,
            //         ...{
            //             model: {
            //                 ...prevState.model,
            //                 ...initModel,
            //             },
            //         },
            //     },
            // };
        });
    }

    updateColorHandler = () => {
        const { workflow: { model } } = this.state;
        const updatedNodes = model.nodeDataArray.map(node => ({
            ...node,
            color: getRandomColor(),
        }));

        this.setState(prevState => ({
            model: { ...prevState.model, nodeDataArray: updatedNodes },
        }));
    }

    createDiagram = (diagramId: string) => {
        const { openCmpConfigModal } = this.props;
        const that = this;
        const $ = go.GraphObject.make;

        const workflowDiagram = $(go.Diagram, diagramId, {
            allowCopy: false,
            allowDrop: true,
            scrollsPageOnFocus: false,
            initialContentAlignment: go.Spot.Center,
            layout:
                $(go.LayeredDigraphLayout),
            validCycle: go.Diagram.CycleNotDirected,
            'undoManager.isEnabled': true,
        });

        const graygrad = $(go.Brush, 'Linear', {
            0: 'white', 0.1: 'whitesmoke', 0.9: 'whitesmoke', 1: 'lightgray',
        });

        // function addNodeAndLink(e, obj) {
        //     console.log('add node and link');
        //     const fromNode = obj.part;
        //     const { diagram } = fromNode;
        //     diagram.startTransaction('Add State');
        //     const fromData = fromNode.data;
        //     const p = fromNode.location.copy();
        //     p.x += diagram.toolManager.draggingTool.gridSnapCellSize.width;
        //     const toData = {
        //         text: 'new',
        //         loc: go.Point.stringify(p),
        //     };
        //     const { model } = diagram;
        //     model.addNodeData(toData);
        //     const linkdata = {
        //         from: model.getKeyForNodeData(fromData),
        //         to: model.getKeyForNodeData(toData),
        //     };
        //     model.addLinkData(linkdata);
        //     const newnode = diagram.findNodeForData(toData);
        //     newnode.location = diagram.toolManager.draggingTool.computeMove(newnode, p);
        //     // shiftNodesToEmptySpaces();
        //     diagram.commitTransaction('Add State');
        // }

        function addNodeAndLink() {
            that.addNode();
        }

        function nodeDoubleClick() {
            openCmpConfigModal();
        }

        workflowDiagram.nodeTemplate = $(go.Node, 'Spot',
            { doubleClick: nodeDoubleClick },
            { selectionAdorned: false, textEditable: true, locationObjectName: 'Body' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'Body' },
                $(go.Shape, 'Rectangle',
                    { fill: graygrad, stroke: 'gray', minSize: new go.Size(120, 21) },
                    new go.Binding('fill', 'isSelected', s => (s ? 'dodgerblue' : graygrad)).ofObject()),
                $(go.TextBlock,
                    {
                        stroke: 'black',
                        font: '12px sans-serif',
                        editable: false,
                        margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
                        alignment: go.Spot.Left,
                    },
                    new go.Binding('text').makeTwoWay()),
            ),
            $(go.Panel, 'Auto',
                {
                    alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer', click: addNodeAndLink,
                },
                $(go.Shape, 'Circle',
                    {
                        width: 22, height: 22, fill: 'white', stroke: 'dodgerblue', strokeWidth: 3,
                    }),
                $(go.Shape, 'PlusLine',
                    {
                        width: 11, height: 11, fill: null, stroke: 'dodgerblue', strokeWidth: 3,
                    }),
            ),
            $(go.Panel, 'Auto',
                { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
                $(go.Shape, 'Circle',
                    {
                        width: 8, height: 8, fill: 'white', stroke: 'gray',
                    }),
                $(go.Shape, 'Circle',
                    {
                        width: 4, height: 4, fill: 'dodgerblue', stroke: null,
                    }),
            ),
        );

        workflowDiagram.nodeTemplate.contextMenu = $(go.Adornment, 'Vertical',
            $('ContextMenuButton',
                $(go.TextBlock, 'Rename'),
                { click: e => e.diagram.commandHandler.editTextBlock() },
                new go.Binding('visible', '', o => o.diagram && o.diagram.commandHandler.canEditTextBlock()).ofObject(),
            ),
            $('ContextMenuButton',
                $(go.TextBlock, 'Delete'),
                { click: e => e.diagram.commandHandler.deleteSelection() },
                new go.Binding('visible', '', o => o.diagram && o.diagram.commandHandler.canDeleteSelection()).ofObject(),
            ),
        );

        workflowDiagram.nodeTemplateMap.add('Loading',
            $(go.Node, 'Spot',
                { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Panel, 'Auto',
                    { name: 'BODY' },
                    $(go.Shape, 'Rectangle',
                        { fill: graygrad, stroke: 'gray', minSize: new go.Size(120, 21) },
                        new go.Binding('fill', 'isSelected', s => (s ? 'dodgerblue' : graygrad)).ofObject(),
                    ),
                    $(go.TextBlock,
                        {
                            stroke: 'black',
                            font: '12px sans-serif',
                            editable: true,
                            margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
                            alignment: go.Spot.Left,
                        },
                        new go.Binding('text', 'text'),
                    ),
                ),
                $(go.Panel, 'Auto',
                    {
                        alignment: go.Spot.Right, portId: 'from', fromLinkable: true, click: addNodeAndLink,
                    },
                    $(go.Shape, 'Circle',
                        {
                            width: 22, height: 2, fill: 'white', stroke: 'dodgerblue', strokeWidth: 3,
                        },
                    ),
                    $(go.Shape, 'PlusLine',
                        {
                            width: 11, height: 11, fill: null, stroke: 'dodgerblue', strokeWidth: 3,
                        },
                    ),
                ),
            ),
        );

        workflowDiagram.nodeTemplateMap.add('End',
            $(go.Node, 'Spot',
                { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Panel, 'Auto',
                    { name: 'BODY' },
                    $(go.Shape, 'Rectangle',
                        { fill: graygrad, stroke: 'gray', minSize: new go.Size(120, 21) },
                        new go.Binding('fill', 'isSelected', s => (s ? 'dodgerblue' : graygrad)).ofObject(),
                    ),
                    $(go.TextBlock,
                        {
                            stroke: 'black',
                            font: '12px sans-serif',
                            editable: true,
                            margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
                            alignment: go.Spot.Left,
                        },
                        new go.Binding('text', 'text'),
                    ),
                ),
                $(go.Panel, 'Auto',
                    { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
                    $(go.Shape, 'Circle',
                        {
                            width: 8, height: 8, fill: 'white', stroke: 'gray',
                        },
                    ),
                    $(go.Shape, 'Circle',
                        {
                            width: 4, height: 4, fill: 'dodgerblue', stroke: null,
                        },
                    ),
                ),
            ),
        );

        workflowDiagram.nodeTemplateMap.add('Recycle',
            $(go.Node, 'Auto',
                {
                    portId: 'to',
                    toLinkable: true,
                    deletable: false,
                    layerName: 'Background',
                    locationSpot: go.Spot.Center,
                },
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                { dragComputation(node, pt) { return pt; } },
                { mouseDrop() { workflowDiagram.commandHandler.deleteSelection(); } },
                $(go.Shape,
                    { fill: 'lightgray', stroke: 'gray' }),
                $(go.TextBlock, 'Drop Here\nTo Delete',
                    { margin: 5, textAlign: 'center' }),
            ));

        let OldTarget = null; // remember the last highlit port
        function lowlight() { // remove any highlight
            if (OldTarget) {
                OldTarget.scale = 1.0;
                OldTarget = null;
            }
        }
        function highlight(port) {
            if (OldTarget !== port) {
                lowlight(); // remove highlight from any old port
                OldTarget = port;
                port.scale = 1.3; // highlight by enlarging
            }
        }
        // Connecting a link with the Recycle node removes the link
        workflowDiagram.addDiagramListener('LinkDrawn', (e) => {
            const link = e.subject;
            if (link.toNode.category === 'Recycle') workflowDiagram.remove(link);
            lowlight();
        });

        // workflowDiagram.mouseDrop = (e) => {
        //     console.log(e);
        //     // handleMouseDrop();
        // };

        // workflowDiagram.mouseDragOver = (e) => {
        //     console.log('mouse drag over', e);
        //     handleMouseDrop();
        // };

        workflowDiagram.addDiagramListener('LinkRelinked', (e) => {
            const link = e.subject;
            if (link.toNode.category === 'Recycle') workflowDiagram.remove(link);
            lowlight();
        });

        workflowDiagram.linkTemplate = $(go.Link,
            {
                selectionAdorned: false, fromPortId: 'from', toPortId: 'to', relinkableTo: true,
            },
            $(go.Shape,
                { stroke: 'gray', strokeWidth: 2 },
                {
                    mouseEnter: (e, obj) => {
                        obj.strokeWidth = 5;
                        obj.stroke = 'dodgerblue';
                    },
                    mouseLeave: (e, obj) => {
                        obj.strokeWidth = 2;
                        obj.stroke = 'gray';
                    },

                },
            ),
        );

        workflowDiagram.linkTemplate = $(go.Link,
            {
                selectionAdorned: false, fromPortId: 'from', toPortId: 'to', relinkableTo: true,
            },
            $(go.Shape,
                { stroke: 'gray', strokeWidth: 2 },
                {
                    mouseEnter(e, obj) { obj.strokeWidth = 5; obj.stroke = 'dodgerblue'; },
                    mouseLeave(e, obj) { obj.strokeWidth = 2; obj.stroke = 'gray'; },
                }),
        );

        function commonLinkingToolInit(tool) {
        // the temporary link drawn during a link drawing operation (LinkingTool) is thick and blue
            tool.temporaryLink = $(go.Link, { layerName: 'Tool' },
                $(go.Shape, { stroke: 'dodgerblue', strokeWidth: 5 }));
            // change the standard proposed ports feedback from blue rectangles to transparent circles
            tool.temporaryFromPort.figure = 'Circle';
            tool.temporaryFromPort.stroke = null;
            tool.temporaryFromPort.strokeWidth = 0;
            tool.temporaryToPort.figure = 'Circle';
            tool.temporaryToPort.stroke = null;
            tool.temporaryToPort.strokeWidth = 0;
            // provide customized visual feedback as ports are targeted or not
            tool.portTargeted = (realnode, realport, tempnode, tempport, toend) => {
                if (realport === null) { // no valid port nearby
                    lowlight();
                } else if (toend) {
                    highlight(realport);
                }
            };
        }

        const ltool = workflowDiagram.toolManager.linkingTool;
        commonLinkingToolInit(ltool);
        // do not allow links to be drawn starting at the "to" port
        ltool.direction = go.LinkingTool.ForwardsOnly;
        const rtool = workflowDiagram.toolManager.relinkingTool;
        commonLinkingToolInit(rtool);
        // change the standard relink handle to be a shape that takes the shape of the link
        rtool.toHandleArchetype = $(go.Shape,
            {
                isPanelMain: true, fill: null, stroke: 'dodgerblue', strokeWidth: 5,
            });
        // use a special DraggingTool to cause the dragging of a Link to start relinking it
        workflowDiagram.toolManager.draggingTool = new DragLinkingTool();
        // detect when dropped onto an occupied cell
        function shiftNodesToEmptySpaces() {
            workflowDiagram.selection.each((node) => {
                if (!(node instanceof go.Node)) return;
                while (true) {
                    const exist = workflowDiagram.findObjectsIn(node.actualBounds,
                        obj => obj.part,
                        part => part instanceof go.Node && part !== node,
                        true,
                    ).first();
                    if (exist === null) break;
                    node.position = new go.Point(
                        node.actualBounds.x, exist.actualBounds.bottom + 10,
                    );
                }
            });
        }
        workflowDiagram.addDiagramListener('SelectionMoved', shiftNodesToEmptySpaces);

        workflowDiagram.addDiagramListener('SelectionMoved', shiftNodesToEmptySpaces);

        workflowDiagram.addDiagramListener('LayoutCompleted', () => {
            workflowDiagram.nodes.each((node) => {
                if (node.category === 'Recycle') return;
                node.minLocation = new go.Point(node.location.x, -Infinity);
            });
        });


        const { setDiagramsMap } = this.props;
        setDiagramsMap(diagramId, workflowDiagram);

        return workflowDiagram;
    }

    modelChangeHandler = (event: Object) => {
        switch (event.eventType) {
        case ModelChangeEventType.Remove:
            if (event.nodeData) {
                this.removeNode(event.nodeData.key);
            }
            if (event.linkData) {
                this.removeLink(event.linkData);
            }
            break;
        default:
            break;
        }
    }

    addNode = () => {
        console.log('add node.....');
        const { selectedNodeKeys, workflow: { model } } = this.state;
        const newNodeId = `node${this.nodeId}`;
        const linksToAdd = selectedNodeKeys.map(parent => ({
            from: parent,
            to: newNodeId,
        }));
        // this.setState(prevState => ({
        //     model: {
        //         ...prevState.model,
        //         nodeDataArray: [
        //             ...model.nodeDataArray,
        //             { key: newNodeId, color: getRandomColor() },
        //         ],
        //         linkDataArray:
        //             linksToAdd.length > 0
        //                 ? [...model.linkDataArray].concat(linksToAdd)
        //                 : [...model.linkDataArray],
        //     },
        // }));
        this.setState((prevState) => {
            const workflow = {
                ...prevState.workflow,
                model: {
                    ...model,
                    nodeDataArray: [
                        ...model.nodeDataArray,
                        { key: newNodeId, color: getRandomColor() },
                    ],
                    linkDataArray:
                        linksToAdd.length > 0
                            ? [...model.linkDataArray].concat(linksToAdd)
                            : [...model.linkDataArray],
                },
            };
            console.log('workflow', workflow);
            // workflow: {
            //     ...prevState.workflow,
            //     model: {
            //         ...model,
            //         nodeDataArray: [
            //             ...model.nodeDataArray,
            //             { key: newNodeId, color: getRandomColor() },
            //         ],
            //         linkDataArray:
            //             linksToAdd.length > 0
            //                 ? [...model.linkDataArray].concat(linksToAdd)
            //                 : [...model.linkDataArray],
            //     },
            // },
            return { workflow };
        });

        this.nodeId += 1;
    }

    removeNode = (nodeKey: string) => {
        const { workflow: { model } } = this.state;
        const nodeToRemoveIndex = model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToRemoveIndex === -1) {
            return;
        }
        // this.setState(prevState => ({
        //     model: {
        //         ...prevState.model,
        //         nodeDataArray: [
        //             ...prevState.model.nodeDataArray.slice(0, nodeToRemoveIndex),
        //             ...prevState.model.nodeDataArray.slice(nodeToRemoveIndex + 1),
        //         ],
        //     },
        // }));

        this.setState(prevState => ({
            workflow: {
                ...prevState.workflow,
                model: {
                    ...model,
                    nodeDataArray: [
                        ...model.nodeDataArray.slice(0, nodeToRemoveIndex),
                        ...model.nodeDataArray.slice(nodeToRemoveIndex + 1),
                    ],
                },
            },
        }));
    }

    removeLink = (linKToRemove: Object) => {
        const { workflow } = this.state;
        const linkToRemoveIndex = workflow.model.linkDataArray.findIndex(
            link => link.from === linKToRemove.from && link.to === linKToRemove.to,
        );
        if (linkToRemoveIndex === -1) {
            return;
        }
        // return {
        //     ...this.state,
        //     model: {
        //         ...model,
        //         linkDataArray: [
        //             ...model.linkDataArray.slice(0, linkToRemoveIndex),
        //             ...model.linkDataArray.slice(linkToRemoveIndex + 1),
        //         ],
        //     },
        // };
        return {
            ...this.state,
            workflow: {
                ...workflow,
                model: {
                    ...workflow.model,
                    linkDataArray: [
                        ...workflow.model.linkDataArray.slice(0, linkToRemoveIndex),
                        ...workflow.model.linkDataArray.slice(linkToRemoveIndex + 1),
                    ],
                },
            },
        };
    }

    nodeSelectionHandler = (nodeKey: any, isSelected: any) => {
        const { selectedNodeKeys } = this.state;
        if (isSelected) {
            this.setState(prevState => ({
                selectedNodeKeys: [...prevState.selectedNodeKeys, nodeKey],
            }));
        } else {
            const nodeIndexToRemove = selectedNodeKeys.findIndex(key => key === nodeKey);
            if (nodeIndexToRemove === -1) {
                return;
            }
            this.setState(prevState => ({
                selectedNodeKeys: [
                    ...prevState.selectedNodeKeys.slice(0, nodeIndexToRemove),
                    ...prevState.selectedNodeKeys.slice(nodeIndexToRemove + 1),
                ],
            }));
        }
    }

    render() {
        const { workflow: { model } } = this.state;
        // const { model } = this.state;
        // const { workflow: { model } } = this.props;
        console.log('model====>', model);

        const { diagramId } = this.props;
        return (
            <div>
                <DiagramButtons
                    key="diagramButtons"
                    onInit={this.initModelHandler}
                    onUpdateColor={this.updateColorHandler}
                    onAddNode={this.addNode}
                />
                {/* <SelectionDetails key="selectionDetails" selectedNodes={selectedNodeKeys} /> */}

                <GojsDiagram
                    key="gojsDiagram"
                    diagramId={diagramId}
                    className="workflowDiagram"
                    model={model}
                    createDiagram={this.createDiagram}
                    onModelChange={this.modelChangeHandler}
                />

            </div>
        );
    }
}
