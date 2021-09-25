/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { HomeIcon, MessagesIcon, ProfileIcon } from '../../../components/icons'
import SignInComponent from '../../../components/signin'
import StoreContext from '../../../context/StoreContext'
import './style.scss'

const LeftMenuComponent = () => {
    const {
        store: { currentUser, toggleModal, modalContent, setModalContent },
    } = useContext(StoreContext)

    const showSignIn = () => {
        setModalContent({
            ...modalContent,
            header: {
                ...modalContent.header,
                show: true,
                title: 'Sign In',
            },
            body: <SignInComponent />,
            footer: {
                ...modalContent.footer,
            },
        })
        toggleModal()
    }

    return (
        <nav id="left-panel-menu">
            <ul className="p-0 list-unstyled">
                <li>
                    <NavLink exact to="/" activeClassName="left-nav-selected">
                        <span className="left-panel-menu-button">
                            <HomeIcon size="large" classes="me-3" />
                            Home
                        </span>
                    </NavLink>
                </li>
                {currentUser ? (
                    <>
                        <li>
                            <NavLink to="/messages" activeClassName="left-nav-selected">
                                <span className="left-panel-menu-button">
                                    <MessagesIcon size="large" classes="me-3" />
                                    Messages
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" activeClassName="left-nav-selected">
                                <span className="left-panel-menu-button">
                                    <ProfileIcon size="large" classes="me-3" />
                                    Profile
                                </span>
                            </NavLink>
                        </li>
                        <li className="d-grid">
                            <Button className="rounded-pill py-2 m-2">Tweet</Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="d-grid">
                            {/* <Link to="/signin">
                                <span className="left-panel-menu-button">Sign in</span>
                            </Link> */}
                            <Button className="rounded-pill py-2 m-2" onClick={showSignIn}>
                                Sign In
                            </Button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default LeftMenuComponent
