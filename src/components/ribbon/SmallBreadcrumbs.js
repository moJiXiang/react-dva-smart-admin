import React from 'react';

export default function SmallBreadcrumbs() {
    return (
        <ol className="breadcrumb">
            {/* {
        this.props.items.map((it, idx) => (
        <li key={it + idx}>{it}</li>
        ))
    } */}
            <li>Home</li>
        </ol>
    );
}
