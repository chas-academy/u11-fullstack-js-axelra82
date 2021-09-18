import React from 'react'
import Logotype from '../../logotype'
import LeftPanelMenu from './menu'
import LeftPanelUser from './user'
import './style.scss'

const leftPanel = () => {
    return (
        <aside id="left-panel">
            <Logotype />
            <LeftPanelMenu />
            <LeftPanelUser />
        </aside>
    )
}

export default leftPanel
