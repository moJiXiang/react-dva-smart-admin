// @flow
import React from 'react';

type Props = {
    nn: Object,
}

export default class Text extends React.Component<Props> {
    componentWillReceiveProps(nextProps) {
        console.log('will receive props=====');
        console.log(nextProps, this.props);
    }

    render() {
        const { nn } = this.props;
        return (
            <div>
                {nn.newNodes.map(n => <div key={n.n}>{n.edge}</div>)}
            </div>
        );
    }
}
