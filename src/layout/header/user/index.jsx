/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Popover, OverlayTrigger, Button } from 'react-bootstrap'
import UserDisplayComponent from './display'
import { firebaseFunctions } from '../../../helper-functions'
import StoreContext from '../../../context/StoreContext'

const LeftUserComponent = () => {
    const {
        store: { auth, currentUser },
    } = useContext(StoreContext)

    const {
        name: { first: firstName, last: lastName },
        username,
    } = currentUser

    const history = useHistory()
    const { signout } = firebaseFunctions

    const currentUserName = `${firstName} ${lastName}`
    const currentUserUsername = username
    const [isActive, setIsActive] = useState(false)

    const popover = (
        <Popover id="user-popover">
            <Popover.Body className="px-3 pe-4">
                <UserDisplayComponent
                    popover
                    currentUserName={currentUserName}
                    currentUserUsername={currentUserUsername}
                />
            </Popover.Body>
            <div className="border-bottom" />
            <Button
                onClick={() => signout(auth, history)}
                className="my-2 px-3 py-2 w-100 text-start bg-extra-light-gray-hover rounded-0 text-black"
                variant="link"
            >
                <small>sign out @{currentUserUsername}</small>
            </Button>
        </Popover>
    )

    return (
        <>
            <OverlayTrigger
                onToggle={() => setIsActive(!isActive)}
                trigger="click"
                placement="top-start"
                overlay={popover}
            >
                <section
                    className={`mt-auto mb-3 p-2 pe-4 rounded-pill ${
                        isActive ? '' : 'bg-extra-light-gray-hover cursor-pointer'
                    }`}
                >
                    <UserDisplayComponent
                        currentUserName={currentUserName}
                        currentUserUsername={currentUserUsername}
                    />
                </section>
            </OverlayTrigger>
        </>
    )
}

export default LeftUserComponent
