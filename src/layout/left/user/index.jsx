/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { Row, Col, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import UserProfilePicture from '../../../components/user/profile-picture'
import { CheckmarkIcon, HorizontalDotsIcon } from '../../../components/icons'
import StoreContext from '../../../context/StoreContext'

const LeftUserComponent = () => {
    const {
        store: { currentUser, signout },
    } = useContext(StoreContext)
    const curreUserName = currentUser.name
    const curreUserUsername = currentUser.username
    const [isActive, setIsActive] = useState(false)

    const popoverActive = () => {
        setIsActive(!isActive)
    }

    const UserDisplayComponent = ({ popover = false }) => {
        return (
            <Row className="gx-3">
                <Col xs={3}>
                    <UserProfilePicture />
                </Col>
                <Col xs={8} className="d-flex flex-column">
                    <small>
                        <strong>{curreUserName}</strong>
                    </small>
                    <small className="text-muted lh-1">@{curreUserUsername}</small>
                </Col>
                {popover ? (
                    <Col xs={1} className="d-flex justify-content-center align-items-center p-0">
                        <CheckmarkIcon />
                    </Col>
                ) : (
                    <Col xs={1} className="d-flex justify-content-center align-items-center p-0">
                        <HorizontalDotsIcon />
                    </Col>
                )}
            </Row>
        )
    }

    const popover = (
        <Popover id="user-popover">
            <Popover.Body className="px-3 pe-4">
                <UserDisplayComponent popover />
            </Popover.Body>
            <div className="border-bottom" />
            <Button
                onClick={() => signout()}
                className="my-2 px-3 py-2 w-100 text-start bg-extra-light-gray-hover rounded-0 text-black"
                variant="link"
            >
                <small>sign out @{curreUserUsername}</small>
            </Button>
        </Popover>
    )

    return (
        <>
            <OverlayTrigger
                onToggle={popoverActive}
                trigger="click"
                placement="top-start"
                overlay={popover}
            >
                <section
                    className={`mt-auto mb-3 p-2 pe-4 rounded-pill ${
                        isActive ? '' : 'bg-extra-light-gray-hover curser-pointer'
                    }`}
                >
                    <UserDisplayComponent />
                </section>
            </OverlayTrigger>
        </>
    )
}

export default LeftUserComponent
