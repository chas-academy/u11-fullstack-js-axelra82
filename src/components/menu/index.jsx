/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { HomeIcon, MessagesIcon, ProfileIcon, HorizontalDotsCircleIcon, SearchIcon } from '../icons'
import SignInComponent from '../signin'
import { displayFunctions } from '../../helper-functions'
import StoreContext from '../../context/StoreContext'
import './style.scss'

const MenuComponent = () => {
    const {
        store: { currentUser, modalState, setModalState, modalContent, setModalContent },
    } = useContext(StoreContext)

    const { toggleModal } = displayFunctions

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
        toggleModal(modalState, setModalState, setModalContent)
    }

    return (
        <nav id="menu">
            <ul className="p-0 list-unstyled d-flex flex-md-column justify-content-around">
                <li>
                    <NavLink exact to="/" activeClassName="nav-selected">
                        <span className="menu-button d-flex p-3 m-2 rounded-pill">
                            <HomeIcon size="large" classes="me-md-3" />
                            <span className="d-none d-md-block text-black">Home</span>
                        </span>
                    </NavLink>
                </li>
                {currentUser ? (
                    <>
                        <li>
                            <NavLink to="/messages" activeClassName="nav-selected">
                                <span className="menu-button d-flex p-3 m-2 rounded-pill">
                                    <MessagesIcon size="large" classes="me-md-3" />
                                    <span className="d-none d-md-block text-black">Messages</span>
                                </span>
                            </NavLink>
                        </li>
                        <li className="d-none d-md-block">
                            <NavLink to={`/${currentUser.username}`} activeClassName="nav-selected">
                                <span className="menu-button d-flex p-3 m-2 rounded-pill">
                                    <ProfileIcon
                                        size="large"
                                        path={`/${currentUser.username}`}
                                        classes="me-md-3"
                                    />
                                    <span className="d-none d-md-block text-black">Profile</span>
                                </span>
                            </NavLink>
                        </li>

                        <li className="d-none d-md-grid">
                            <Button className="rounded-pill py-2 m-2">Tweet</Button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="d-none d-md-grid">
                            <Button className="rounded-pill py-2 m-2" onClick={showSignIn}>
                                Sign In
                            </Button>
                        </li>
                    </>
                )}
                <>
                    <li className="d-md-none">
                        <NavLink
                            to="/search"
                            activeClassName="nav-selected"
                            className="menu-button d-flex p-3 m-2 rounded-pill"
                        >
                            <SearchIcon size="large" />
                        </NavLink>
                    </li>
                    <li className="d-md-none">
                        <NavLink
                            to="/more-about"
                            activeClassName="nav-selected"
                            className="menu-button d-flex p-3 m-2 rounded-pill"
                        >
                            <HorizontalDotsCircleIcon size="large" />
                        </NavLink>
                    </li>
                </>
            </ul>
        </nav>
    )
}

export default MenuComponent
