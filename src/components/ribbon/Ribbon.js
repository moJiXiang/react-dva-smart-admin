import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import ResetWidgets from './ResetWidgets';
import SmallBreadcrumbs from './SmallBreadcrumbs';


const tooltip = (
    <Tooltip id="reset-widgets-suggestion">
        <i className="text-warning fa fa-warning" />
        {' '}
        Warning! This will reset all your widget settings.
    </Tooltip>
);

export default function Ribbon() {
    return (
        <div id="ribbon">
            <span className="ribbon-button-alignment">
                <OverlayTrigger placement="bottom" overlay={tooltip}>
                    <ResetWidgets />
                </OverlayTrigger>
            </span>
            <SmallBreadcrumbs />
        </div>
    );
}
