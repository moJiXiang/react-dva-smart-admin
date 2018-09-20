import React from 'react';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export default class AppChild extends React.Component<any> {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
            nodes: cloneDeep(props.nodes),
        };
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(nextProps, prevState);
    //     if (nextProps.count !== prevState.count || !isEqual(nextProps.nodes, prevState.nodes)) {
    //         return {
    //             count: cloneDeep(nextProps.count),
    //             nodes: nextProps.nodes,
    //         };
    //     }
    //     return null;
    // }
    componentWillReceiveProps(nextProps) {
        const { count, nodes } = this.props;
        console.log(nextProps.nodes, nodes);
        if (nextProps.count !== count || !isEqual(nextProps.nodes, nodes)) {
            this.setState({
                count: nextProps.count,
                nodes: nextProps.nodes,
            });
        }
    }

    addCount = () => {
        this.setState(prevState => ({
            count: prevState.count + 2,
        }));
    }

    render() {
        const { count, nodes } = this.state;
        console.log('render', count);
        return (
            <div>
                appchild:
                {' '}
                {count}
                <button type="button" onClick={this.addCount}>appchild 增加</button>

                <ul>
                    {
                        nodes.map((node, idx) => <li key={idx}>{node.id}</li>)
                    }
                </ul>
            </div>
        );
    }
}
