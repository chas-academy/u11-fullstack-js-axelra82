/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col, Button, Card, CloseButton } from 'react-bootstrap'
import { CalendarIcon, BallonIcon, LinkIcon } from '../../icons'
import UserProfilePicture from '../profile-picture'
import UpdateUserProfile from '../update'
import { dateFunctions, displayFunctions, regexFunctions } from '../../../helper-functions'
import StoreContext from '../../../context/StoreContext'

const ProfileDisplayComponent = ({ userData }) => {
    const {
        store: { currentUser, modalContent, modalState, setModalState, setModalContent },
    } = useContext(StoreContext)

    const {
        bio,
        dob,
        name: { first: firstName, last: lastName },
        joined,
        username,
        website,
    } = userData

    const location = useLocation()
    const { state: locationState } = location

    const { toggleModal } = displayFunctions
    const { formatDateString } = dateFunctions
    const { urlReplace, urlCheck } = regexFunctions

    const [showWelcome, setShowWelcome] = useState(false)

    const welcomeRef = useRef()

    const showEditProfile = () => {
        if (currentUser) {
            setModalContent({
                ...modalContent,
                classes: 'max-h-600 overflow-y-scroll',
                header: {
                    ...modalContent.header,
                    show: true,
                    title: 'Edit profile',
                },
                body: (
                    <>
                        {showWelcome && (
                            <Card className="position-relative bg-light mb-3" ref={welcomeRef}>
                                <Card.Body>
                                    <CloseButton
                                        className="position-absolute top-0 end-0 m-2"
                                        style={{ zIndex: 9999 }}
                                        onClick={() => {
                                            setShowWelcome(false)
                                            welcomeRef.current.remove()
                                        }}
                                    />
                                    <p>
                                        <strong>Welcome @{username}!</strong>
                                    </p>
                                    <p>
                                        Please take a minute to complete your profile by adding a
                                        picture, sharing a website if you have one and write
                                        something about yourself.
                                    </p>
                                </Card.Body>
                            </Card>
                        )}
                        <UpdateUserProfile />
                    </>
                ),
                footer: {
                    ...modalContent.footer,
                    show: true,
                    buttons: [
                        {
                            type: 'cancel',
                        },
                        {
                            type: 'save',
                            text: 'update',
                        },
                    ],
                },
            })
            toggleModal(modalState, setModalState, setModalContent)
        }
    }

    useEffect(() => {
        if (currentUser) {
            // check if user just signed up
            if (locationState) {
                if (typeof locationState.isNew !== 'undefined' && locationState.isNew) {
                    setShowWelcome(true)
                    showEditProfile()
                }
            }
        }
    }, [])

    return (
        <article className="p-3">
            <UserProfilePicture classes="mb-3" />
            <Row>
                <Col>
                    <p className="fs-5 lh-1 mb-0">
                        <strong size={3}>
                            {firstName} {lastName}
                        </strong>
                    </p>
                    <p>
                        <small className="text-muted">@{username}</small>
                    </p>
                </Col>

                <Col>
                    {currentUser && (
                        <>
                            <Button
                                onClick={() => showEditProfile()}
                                className="rounded-pill float-end"
                                variant="outline-secondary"
                            >
                                Edit profile
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
            {bio && (
                <p>
                    <small>{bio}</small>
                </p>
            )}
            <section className="d-flex text-muted">
                {website && (
                    <small className="me-3">
                        <a href={urlCheck(website)} target="_blank" rel="noreferrer">
                            <LinkIcon color="muted align-text-top" /> {urlReplace(website)}
                        </a>
                    </small>
                )}
                <small className="me-3">
                    <BallonIcon color="muted align-text-top" /> Born {dob}
                </small>
                <small>
                    <CalendarIcon color="muted align-text-top" /> Joined{' '}
                    {formatDateString(new Date(joined), 'short')}
                </small>
            </section>
        </article>
    )
}

export default ProfileDisplayComponent
