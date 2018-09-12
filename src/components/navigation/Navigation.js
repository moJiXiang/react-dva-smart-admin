import React from 'react';

// import NavMenu from './NavMenu'

import MinifyMenu from './MinifyMenu';

import LoginInfo from '../user/components/LoginInfo';

export default function Navigation() {
    return (
        <aside id="left-panel">
            <LoginInfo />
            <nav>
                {/* <NavMenu
        openedSign={'<i class="fa fa-minus-square-o"></i>'}
        closedSign={'<i class="fa fa-plus-square-o"></i>'}
        /> */}
            </nav>
            <MinifyMenu />
        </aside>
    );
}
