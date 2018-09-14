// @flow
import React from 'react';

type Props = {
    factoryReset: Function,
}

export default function ResetWidgets(props: Props) {
    const { factoryReset } = props;
    return (
        <span id="refresh" className="btn btn-ribbon" onClick={factoryReset}>
            <i className="fa fa-refresh" />
        </span>
    );
}
