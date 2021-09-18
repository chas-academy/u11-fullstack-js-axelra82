/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { HomeIcon, MessagesIcon, ProfileIcon } from '../../../icons'
import './style.scss'

const LeftPanelMenuComponent = () => {
    return (
        <nav id="left-panel-menu">
            <ul>
                <li>
                    <a href="#">
                        <span className="left-panel-menu-button">
                            <HomeIcon />
                            Home
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="left-panel-menu-button">
                            <MessagesIcon />
                            Messages
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="left-panel-menu-button">
                            <ProfileIcon />
                            Profile
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="post-button">Post</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default LeftPanelMenuComponent
