// @flow
import React from 'react';
import Form from 'react-jsonschema-form';

import './style.scss?global';

function CustomFieldTemplate(props: any) {
    const {
        id, label, help, required, description, rawErrors = [], children,
    } = props;

    return (
        <section>
            <label className="om-label" htmlFor={id}>
                {label}
                {required ? '*' : null}
            </label>
            {description}
            <label className="input">
                {' '}
                {/* <i className="icon-append fa fa-user" /> */}
                {children}
                <b className="tooltip tooltip-top-right">
                    {/* <i className="fa fa-user txt-color-teal" /> */}
                    {help}
                </b>
            </label>
            {rawErrors.map((error, i) => <div key={i} className="note note-error">{error}</div>)}
            {/* <div className="note note-error">
                {errors}
            </div> */}
        </section>
    );
}

export default function JsonSchemaForm(props: any) {
    const { schema: { properties }, children } = props;
    const transformErrors = errors => errors.map((error) => {
        const { name, property } = error;
        const propertyName = property.split('.')[1];
        if (properties[propertyName].messages && properties[propertyName].messages[name]) {
            error.message = properties[propertyName].messages[name];
        }
        return error;
    });


    return (
        <Form
            {...props}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={transformErrors}
        >
            {children}
        </Form>
    );
}
