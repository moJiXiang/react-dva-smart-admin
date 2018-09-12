// @flow
import React from 'react';

type Props = {
    children: Array<any>
}

export default class ToggleShortcut extends React.Component<Props> {
    toggleShortcut = (e: any) => {
        e.preventDefault();
    }

    render() {
        const { children } = this.props;
        return (
            <a href-void="true" onClick={this.toggleShortcut}>{children}</a>
        );
    }
}
