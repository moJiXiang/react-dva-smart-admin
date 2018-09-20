// @flow
import React from 'react';
import { Route } from 'dva/router';
import { NotificationContainer } from 'react-notifications';

import Header from '../components/common/Header';
import Navigation from '../components/navigation/Navigation';
import Ribbon from '../components/ribbon/Ribbon';
import Footer from '../components/common/Footer';

export default class BasicLayout extends React.PureComponent<any, any> {
    logOut = () => {

    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={matchProps => (
                    <div id="wrapper">
                        <Header
                            logOut={this.logOut}
                        />
                        <Navigation />
                        <Ribbon />
                        <div id="main" role="main">
                            <Component {...matchProps} />
                        </div>

                        <NotificationContainer />
                        <Footer />
                    </div>
                )}
            />
        );
    }
}
