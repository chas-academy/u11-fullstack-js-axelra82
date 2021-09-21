/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HomeIcon, MessagesIcon, ProfileIcon, SearchIcon } from '../../../components/icons'
import StoreContext from '../../../context/StoreContext'
import './style.scss'

const BottomMenuComponent = () => {
    const {
        store: {
            user: { isAuthed },
        },
    } = useContext(StoreContext)

    return (
        <nav id="bottom-panel-menu">
            <ul>
                <li>
                    <NavLink exact to="/" activeClassName="bottom-nav-selected">
                        <span className="bottom-panel-menu-button">
                            <HomeIcon />
                        </span>
                    </NavLink>
                </li>
                {isAuthed ? (
                    <>
                        <li>
                            <NavLink to="/messages" activeClassName="bottom-nav-selected">
                                <span className="bottom-panel-menu-button">
                                    <MessagesIcon />
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" activeClassName="bottom-nav-selected">
                                <span className="bottom-panel-menu-button">
                                    <ProfileIcon />
                                </span>
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/signup">
                            <span className="left-panel-menu-button">Signup</span>
                        </Link>
                    </li>
                )}
                <li>
                    <NavLink to="/search" activeClassName="bottom-nav-selected">
                        <span className="bottom-panel-menu-button">
                            <SearchIcon />
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default BottomMenuComponent
