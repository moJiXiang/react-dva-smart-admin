// @flow
import React from 'react';
import Style from './DiagramButtons.scss';

type Props = {
    onInit: Function,
    onUpdateColor: Function,
    onAddNode: Function,
};

export default function DiagramButton(props: Props) {
    const { onInit, onUpdateColor, onAddNode } = props;
    return (
        <div className={Style['centered-container']}>
            <div className={Style['inline-element']}>
                <button type="button" onClick={onInit}>
                    Init diagram
                </button>
            </div>
            <div className={Style['inline-element']}>
                <button type="button" onClick={onUpdateColor}>
                    Update node color
                </button>
            </div>
            <div className={Style['inline-element']} onClick={onAddNode}>
                <button type="button">Add node with selected node(s) as parent(s)</button>
            </div>
        </div>
    );
}
