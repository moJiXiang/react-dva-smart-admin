// @flow
import React from 'react';
import ToggleShortcut from './ToggleShortcut';

type Props = {
    username: string
}

export default function LoginInfo(props: Props) {
    const { username } = props;

    return (
        <div className="login-info">
            <span>
                <ToggleShortcut>
                    <span>{username}</span>
                    <i className="fa fa-angle-down" />
                </ToggleShortcut>
            </span>
        </div>
    );
}
