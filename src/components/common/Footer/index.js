import React from 'react';

export default function Footer() {
    return (
        <div className="page-footer">
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <span className="txt-color-white">SmartAdmin 1.9.0 - Web Application Framework © 2017-2019</span>
                </div>

                <div className="col-xs-6 col-sm-6 text-right hidden-xs">
                    <div className="txt-color-white inline-block">
                        <i className="txt-color-blueLight hidden-mobile">
Last account activity
                            <i className="fa fa-clock-o" />
                            {' '}
                            <strong>52 mins ago &nbsp;</strong>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    );
}
