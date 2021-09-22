import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import StoreContext from '../../../context/StoreContext'
import { HomeIcon, MessagesIcon, ProfileIcon, SearchIcon } from '../../../components/icons'
import './style.scss'

const BottomMenuComponent = () => {
    const { currentUser } = useContext(StoreContext)

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
                {currentUser ? (
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
