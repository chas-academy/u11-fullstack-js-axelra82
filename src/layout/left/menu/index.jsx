/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HomeIcon, MessagesIcon, ProfileIcon } from '../../../components/icons'
import StoreContext from '../../../context/StoreContext'
import './style.scss'

const LeftMenuComponent = () => {
    const { currentUser } = useContext(StoreContext)

    return (
        <nav id="left-panel-menu">
            <ul>
                <li>
                    <NavLink exact to="/" activeClassName="left-nav-selected">
                        <span className="left-panel-menu-button">
                            <HomeIcon />
                            Home
                        </span>
                    </NavLink>
                </li>
                {currentUser ? (
                    <>
                        <li>
                            <NavLink to="/messages" activeClassName="left-nav-selected">
                                <span className="left-panel-menu-button">
                                    <MessagesIcon />
                                    Messages
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" activeClassName="left-nav-selected">
                                <span className="left-panel-menu-button">
                                    <ProfileIcon />
                                    Profile
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <button type="button" className="post-button left-post-button">
                                Tweet
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signup">
                                <span className="left-panel-menu-button">Signup</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default LeftMenuComponent
