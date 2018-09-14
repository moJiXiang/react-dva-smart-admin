// @flow
import React from 'react';
import { Route } from 'dva/router';
import { NotificationContainer } from 'react-notifications';

import Header from '../components/common/Header';
import Navigation from '../components/navigation/Navigation';
import Ribbon from '../components/ribbon/Ribbon';
import Footer from '../components/common/Footer';

export default function BasicLayout({ component: Component, ...rest }: Object) {
    return (
        <Route
            {...rest}
            render={matchProps => (
                <div id="wrapper">
                    <Header />
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
