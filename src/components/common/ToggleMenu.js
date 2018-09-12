// @flow
import React from 'react';

type Props = {
    className: string
}

export default function ToggleMenu(props: Props) {
    const { className } = props;
    return (
        <div id="hide-menu" className={className}>
            <span>
                <a title="Collapse Menu"><i className="fa fa-reorder" /></a>
            </span>
        </div>

    );
}
