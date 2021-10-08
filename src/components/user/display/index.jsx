/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useRef, useEffect } from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
import { Row, Col, Button, Card, CloseButton } from 'react-bootstrap'
import { CalendarIcon, BallonIcon, LinkIcon } from '../../icons'
import UserProfilePicture from '../profile-picture'
import UpdateUserProfile from '../update'
import { displayFunctions, regexFunctions, firebaseFunctions } from '../../../helper-functions'
import StoreContext from '../../../context/StoreContext'

const ProfileDisplayComponent = ({ userData }) => {
    const {
        store: {
            auth,
            currentUser,
            isAdmin,
            modalContent,
            modalState,
            setModalState,
            setModalContent,
        },
    } = useContext(StoreContext)

    const {
        bio,
        dob,
        name: { first: firstName, last: lastName },
        joined,
        username,
        website,
        profilePicture,
    } = userData

    const { username: currentUsername } = currentUser || {}

    const history = useHistory()
    const location = useLocation()
    const { state: locationState, pathname } = location
    const { isNew } = locationState || {}

    const { toggleModal } = displayFunctions
    const { urlReplace, urlCheck } = regexFunctions
    const { signout } = firebaseFunctions

    const [showWelcome, setShowWelcome] = useState(isNew)

    const welcomeRef = useRef()

    const showEditProfile = () => {
        setModalContent({
            ...modalContent,
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
                                    picture, sharing a website if you have one and write something
                                    about yourself.
                                </p>
                            </Card.Body>
                        </Card>
                    )}
                    <UpdateUserProfile userData={userData} />
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

    useEffect(() => {
        if (currentUser && isNew) {
            showEditProfile()
        }
    }, [currentUser, isNew])

    return (
        <article className="p-3">
            <UserProfilePicture source={profilePicture} classes="mb-3" />
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
                    {currentUsername === pathname.slice(1) && (
                        <>
                            {isAdmin && (
                                <Link
                                    className="ms-3 px-3 pt-1 pb-2 rounded-pill float-end btn btn-primary"
                                    to="/admin/panel"
                                >
                                    <span className="text-white align-text-top">Admin</span>
                                </Link>
                            )}
                            <Button
                                onClick={() => signout(auth, history)}
                                className="rounded-pill float-end ms-2 d-md-none"
                                variant="secondary"
                            >
                                Sign out
                            </Button>
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
                    <CalendarIcon color="muted align-text-top" /> Joined {joined}
                </small>
            </section>
        </article>
    )
}

export default ProfileDisplayComponent
