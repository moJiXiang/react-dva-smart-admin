// @flow
import React from 'react';

type Props = {
    selectedNodes: Array<any>,
};

export default function SelectionDetails(props: Props) {
    const { selectedNodes } = props;
    const message = selectedNodes.reduce((result, current) => `${result} ${current}`, '');
    return <div>{selectedNodes.length === 0 ? 'No selection' : `Selection: ${message}`}</div>;
}
