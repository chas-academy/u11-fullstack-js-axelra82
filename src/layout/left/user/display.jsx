/* eslint-disable react/prop-types */
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import UserProfilePicture from '../../../components/user/profile-picture'
import { CheckmarkIcon, HorizontalDotsIcon } from '../../../components/icons'

const UserDisplayComponent = ({ currentUserName, curreUserUsername, popover = false }) => {
    return (
        <Row className="gx-3">
            <Col xs={3}>
                <UserProfilePicture classes="w-100 h-auto" />
            </Col>
            <Col xs={8} className="d-flex flex-column">
                <small>
                    <strong>{currentUserName}</strong>
                </small>
                <small className="text-muted lh-1">@{curreUserUsername}</small>
            </Col>
            {popover ? (
                <Col xs={1} className="d-flex justify-content-center align-items-center p-0">
                    <CheckmarkIcon color="primary" size="fit-w" />
                </Col>
            ) : (
                <Col xs={1} className="d-flex justify-content-center align-items-center p-0">
                    <HorizontalDotsIcon size="fit-w" />
                </Col>
            )}
        </Row>
    )
}
export default UserDisplayComponent
