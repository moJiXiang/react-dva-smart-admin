// @flow
import React from 'react';
import * as go from 'gojs';
import { GojsDiagram } from 'react-gojs';

type State = {
    model: Object,
}

export default class WorkflowPalette extends React.PureComponent<any, State> {
    constructor() {
        super();
        this.state = {
            model: {
                nodeDataArray: [
                    { key: 2, text: 'Beginning' },
                    { key: 3, text: 'Segment 1' },
                    { key: 4, text: 'Segment 2' },
                    { key: 5, text: 'Segment 3' },
                ],
                linkDataArray: [],
            },
        };
    }

    createPalette = (diagramId: string) => {
        const { nodeTemplate } = this.props;
        const $ = go.GraphObject.make;

        const palette = $(go.Palette, diagramId, {
            layout: $(go.GridLayout, { alignment: go.GridLayout.Location }),
        });

        const graygrad = $(go.Brush, 'Linear');

        palette.nodeTemplate = $(go.Node, 'Spot',
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
                        editable: true,
                        margin: new go.Margin(3, 3 + 11, 3, 3 + 4),
                        alignment: go.Spot.Left,
                    },
                    new go.Binding('text').makeTwoWay()),
            ),
        );

        palette.click = (e) => {
            console.log('click palette');
        };

        palette.mouseDrop = (e) => {
            console.log(e);
        };

        palette.mouseUp = (e) => {
            console.log(e);
        };

        palette.mouseDragOver = () => {
            console.log('mouse drag over');
        };

        palette.nodeTemplate = nodeTemplate;

        return palette;
    }

    render() {
        const { model } = this.state;
        return (
            <GojsDiagram
                key="gojsPalette"
                diagramId="paletteDiv"
                className="diagramPalette"
                model={model}
                createDiagram={this.createPalette}
            />
        );
    }
}
