import React from 'react';

class SmallBreadcrumbs extends React.Component {
    render() {
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
}


export default SmallBreadcrumbs;
