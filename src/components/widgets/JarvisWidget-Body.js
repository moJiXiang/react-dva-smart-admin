// @flow
import React from 'react';

type Props = {
    children: any,
    props: any,
    editbutton: Function,
}

export default function Body(props: Props) {
    const { children, props: rest, editbutton } = props;
    return (
        <div {...rest}>
            {
                editbutton ? (<div className="jarviswidget-editbox"><input className="form-control" type="text" /></div>) : null
            }
            <div className="widget-body">
                {children}
            </div>
        </div>
    );
}
