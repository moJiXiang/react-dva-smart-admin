// @flow
import React from 'react';

import Header from '../components/common/Header';
import Navigation from '../components/navigation/Navigation';
import Footer from '../components/common/Footer';

type Props = {
    children: Object
};

export default class Layout extends React.PureComponent<Props, any> {
    render() {
        const { children } = this.props;
        return (
            <div id="wrapper">
                <Header />
                <Navigation />

                <div id="main" role="main">
                    {/* <Ribbon /> */}
                    {children}
                </div>

                <Footer />
            </div>
        );
    }
}
