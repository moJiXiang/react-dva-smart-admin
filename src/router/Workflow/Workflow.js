// @flow
import React from 'react';
import { connect } from 'dva';
import * as go from 'gojs';
import { GojsDiagram, ModelChangeEventType } from 'react-gojs';

import DiagramButtons from './DiagramButtons';
import SelectionDetails from './SelectionDetails';
import utils from '../../helpers/utils';
import './Workflow.scss?global';

const { ToolManager, Diagram } = go;
const { getRandomColor } = utils;

export class Workflow extends React.Component<any, any> {
    nodeId = 0;

    constructor(props: Object) {
        super(props);
        this.state = {
            selectedNodeKeys: [],
            model: {
                nodeDataArray: [{ key: 'Alpha', color: 'lightblue' }],
                linkDataArray: [],
            },
        };
    }

    initModelHandler = () => {
        this.setState((prevState) => {
            const initModel = {
                nodeDataArray: [
                    { key: 'Alpha', color: 'lightblue' },
                    { key: 'Beta', color: 'orange' },
                    { key: 'Gamma', color: 'lightgreen' },
                    { key: 'Delta', color: 'pink' },
                    { key: 'Omega', color: 'grey' },
                ],
                linkDataArray: [
                    { from: 'Alpha', to: 'Beta' },
                    { from: 'Alpha', to: 'Gamma' },
                    { from: 'Beta', to: 'Delta' },
                    { from: 'Gamma', to: 'Omega' },
                ],
            };
            return { model: { ...prevState.model, ...initModel } };
        });
    }

    updateColorHandler = () => {
        const { model } = this.state;
        const updatedNodes = model.nodeDataArray.map(node => ({
            ...node,
            color: getRandomColor(),
        }));

        this.setState(prevState => ({
            model: { ...prevState.model, nodeDataArray: updatedNodes },
        }));
    }

    createDiagram = (diagramId: string) => {
        const $ = go.GraphObject.make;

        const myDiagram = $(go.Diagram, diagramId, {
            initialContentAlignment: go.Spot.LeftCenter,
            layout: $(go.TreeLayout, {
                angle: 0,
                arrangement: go.TreeLayout.ArrangementVertical,
                treeStyle: go.TreeLayout.StyleLayered,
            }),
            isReadOnly: false,
            allowHorizontalScroll: true,
            allowVerticalScroll: true,
            allowZoom: false,
            allowSelect: true,
            autoScale: Diagram.Uniform,
            contentAlignment: go.Spot.LeftCenter,
        });

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        myDiagram.nodeTemplate = $(
            go.Node,
            'Auto',
            {
                selectionChanged: node => this.nodeSelectionHandler(node.key, node.isSelected),
            },
            $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, new go.Binding('fill', 'color')),
            $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'key')),
        );

        return myDiagram;
    }

    modelChangeHandler = (event: Object) => {
        console.log(event, event.eventType);
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
        const { selectedNodeKeys, model } = this.state;
        const newNodeId = `node${this.nodeId}`;
        const linksToAdd = selectedNodeKeys.map(parent => ({
            from: parent,
            to: newNodeId,
        }));
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                nodeDataArray: [
                    ...model.nodeDataArray,
                    { key: newNodeId, color: getRandomColor() },
                ],
                linkDataArray:
                    linksToAdd.length > 0
                        ? [...model.linkDataArray].concat(linksToAdd)
                        : [...model.linkDataArray],
            },
        }));
        this.nodeId += 1;
    }

    removeNode = (nodeKey: string) => {
        const { model } = this.state;
        const nodeToRemoveIndex = model.nodeDataArray.findIndex(node => node.key === nodeKey);
        if (nodeToRemoveIndex === -1) {
            return;
        }
        this.setState(prevState => ({
            model: {
                ...prevState.model,
                nodeDataArray: [
                    ...prevState.model.nodeDataArray.slice(0, nodeToRemoveIndex),
                    ...prevState.model.nodeDataArray.slice(nodeToRemoveIndex + 1),
                ],
            },
        }));
    }

    removeLink = (linKToRemove: Object) => {
        const { model } = this.state;
        const linkToRemoveIndex = model.linkDataArray.findIndex(
            link => link.from === linKToRemove.from && link.to === linKToRemove.to,
        );
        if (linkToRemoveIndex === -1) {
            return;
        }
        return {
            ...this.state,
            model: {
                ...model,
                linkDataArray: [
                    ...model.linkDataArray.slice(0, linkToRemoveIndex),
                    ...model.linkDataArray.slice(linkToRemoveIndex + 1),
                ],
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
        const { model, selectedNodeKeys } = this.state;
        return [
            <DiagramButtons
                key="diagramButtons"
                onInit={this.initModelHandler}
                onUpdateColor={this.updateColorHandler}
                onAddNode={this.addNode}
            />,
            <SelectionDetails key="selectionDetails" selectedNodes={selectedNodeKeys} />,
            <GojsDiagram
                key="gojsDiagram"
                diagramId="myDiagramDiv"
                className="myDiagram"
                model={model}
                createDiagram={this.createDiagram}
                onModelChange={this.modelChangeHandler}
            />,
        ];
    }
}

const mapStateToProps = ({ count, loading }) => ({
    count,
    submitting: loading.effects['count/addWithDelay'],
});

export default connect(mapStateToProps)(Workflow);
