import React from 'react';

export default class NodesChild extends React.Component<any, any> {
    // static getDerivedStateFromProps()
    componentDidMount() {

    }

    render() {
        const { workflow: { nodeArray } } = this.props;
        console.log(nodeArray);
        return (
            <div>
                <h4>nodes child</h4>
                <ul>
                    {nodeArray.map(node => <li>{node.key}</li>)}
                </ul>
            </div>
        );
    }
}
