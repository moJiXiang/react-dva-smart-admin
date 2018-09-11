import React from 'react'

import Header from '../components/common/Header'
import Navigation from '../components/navigation/Navigation'
import Ribbon from '../components/ribbon/Ribbon'
import Footer from '../components/common/Footer'

export default class Layout extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <Navigation />
        
        <div id="main" role="main">
          <Ribbon />
          {this.props.children}
        </div>

        <Footer />
      </div>
    )
  }
}

