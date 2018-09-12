import React from 'react';
import classnames from 'classnames';
import Moment from '../../utils/Moment';
import Message from './Message';
import Notification from './Notification';

const Components = {
    message: Message,
    notification: Notification,
};

export default class Activities extends React.Component {
    state = {
        activity: {
            data: [],
        },
        activities: [],
        lastUpdated: new Date(),
    };

    _active = false;

    setActivity = (activity) => {
        this.setState({
            activity,
        });
    };

    toggleDropdown = () => {}

    render() {
        const { activities, activity, lastUpdated } = this.state;

        const count = activities.reduce((sum, a) => (sum + a.data.length), 0);

        return (
            <div>
                <span id="activity" onClick={this.toggleDropdown} className="activity-dropdown">
                    <i className="fa fa-user" />
                    <b className="badge bg-color-red">{count}</b>
                </span>
                <div className="ajax-dropdown">

                    <div className="btn-group btn-group-justified" data-toggle="buttons">
                        {activities.map(_activity => (
                            <label
                                className={classnames(['btn', 'btn-default', {
                                    active: _activity.name === activity.name,
                                }])}
                                key={_activity.id}
                                onClick={this.setActivity.bind(this, _activity)}
                                htmlFor="activity"
                            >
                                <input type="radio" name="activity" />
                                {_activity.title}
                                {' '}
                                (
                                {_activity.data.length + 1}
                                )
                            </label>

                        ))}
                    </div>

                    {/* notification content */}
                    <div className="ajax-notifications custom-scroll">
                        <ul className="notification-body">
                            {activity.data.map((item) => {
                                const component = Components[item.type];
                                return (
                                    <li key={item.id}>
                                        {React.createElement(component, {
                                            item,
                                            lastUpdated,
                                        })}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {/* end notification content */}

                    {/* footer: refresh area */}
                    <span>
                        {' '}
                        Last updated on:
                        <Moment data={lastUpdated} format="h:mm:ss a" />
                    </span>
                    {/* end footer */}

                </div>
            </div>
        );
    }
}
