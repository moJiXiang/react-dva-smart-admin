// @flow
import React from 'react';
import ToggleShortcut from './ToggleShortcut';

type Props = {
    picture: string,
    username: string
}

export default function LoginInfo(props: Props) {
    const { picture, username } = props;

    return (
        <div className="login-info">
            <span>
                <ToggleShortcut>
                    <img src={picture} alt="me" className="online" />
                    <span>{username}</span>
                    <i className="fa fa-angle-down" />
                </ToggleShortcut>
            </span>
        </div>
    );
}
