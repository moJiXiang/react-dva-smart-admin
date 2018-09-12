import React from 'react';

class ResetWidgets extends React.Component {
    render() {
        return (
            <span id="refresh" className="btn btn-ribbon" onClick={this.props.factoryReset}>
                <i className="fa fa-refresh" />
            </span>
        );
    }
}


export default ResetWidgets;
