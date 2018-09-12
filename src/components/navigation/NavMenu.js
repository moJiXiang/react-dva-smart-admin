import React from 'react';

import PropTypes from 'prop-types';


import { findDOMNode } from 'react-dom';

import NavMenuList from './NavMenuList';

import { navigationInit } from '../NavigationActions';

import store from '../../../store/configureStore';


function addId(item) {
    if (item.items) {
        item.items = item.items.map(addId);
    }

    if (!item._id) {
        item._id = Math.random().toString(36).slice(2);
    }

    return item;
}

const navItems = require('../../../config/navigation.json').items.map(addId);


export default class NavMenu extends React.Component {
    componentDidMount() {
        const defaults = {
            accordion: true,
            closedSign: '[+]',
            openedSign: '[-]',
        };
    }

    render() {
        return (
            navItems
                ? <NavMenuList items={navItems} />
                : this.props.children
        );
    }
}

NavMenu.propTypes = {
    accordion: PropTypes.bool,
    speed: PropTypes.number,
    closedSign: PropTypes.string,
    openedSign: PropTypes.string,
};
