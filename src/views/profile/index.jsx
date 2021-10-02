/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Row, Col, Button, Card, CloseButton } from 'react-bootstrap'
import { CalendarIcon, BallonIcon, LinkIcon } from '../../components/icons'
import UserProfilePicture from '../../components/user/profile-picture'
import UpdateUserProfile from '../../components/user/update'
import LoadingComponent from '../../components/loading'
import {
    firebaseFunctions,
    dateFunctions,
    displayFunctions,
    regexFunctions,
} from '../../helper-functions'
import StoreContext from '../../context/StoreContext'

const ProfileView = () => {
    const {
        store: {
            db,
            locationState,
            loading,
            setLoading,
            currentUser,
            modalContent,
            modalState,
            setModalState,
            setModalContent,
        },
    } = useContext(StoreContext)

    const { toggleModal } = displayFunctions
    const { formatDateString } = dateFunctions
    const { getProfileData } = firebaseFunctions
    const { urlReplace } = regexFunctions

    const history = useHistory()
    const { username } = useParams()

    const [publicData, setPublicData] = useState()
    const [isNew, setIsNew] = useState(false)
    const [showWelcome, setShowWelcome] = useState(false)
    const [profileUpdateAction, setProfileUpdateAction] = useState()

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
                        <UpdateUserProfile setProfileUpdateAction={setProfileUpdateAction} />
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
        setLoading(true)

        // check if user just signed up
        if (locationState) {
            const isNewUser =
                typeof locationState.isNew !== 'undefined' ? locationState.isNew : false
            setIsNew(isNewUser)
            setShowWelcome(true)
        }

        // if user just signed up show edit profile with welcome message
        if (isNew) {
            showEditProfile()
        }

        const getUserData = async () => {
            const publicProfileData = await getProfileData(db, username)
            if (publicProfileData) {
                setPublicData(publicProfileData)
            } else {
                history.push('/', '404')
            }
        }
        getUserData()

        setLoading(false)
    }, [isNew])

    useEffect(() => {
        console.log(profileUpdateAction)
    }, [profileUpdateAction])

    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : (
                publicData && (
                    <article className="p-3">
                        <UserProfilePicture classes="mb-3" />
                        <Row>
                            <Col>
                                <p className="fs-5 lh-1 mb-0">
                                    <strong size={3}>
                                        {publicData.name.first} {publicData.name.last}
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
                        {publicData.bio && (
                            <p>
                                <small>{publicData.bio}</small>
                            </p>
                        )}
                        <section className="d-flex text-muted">
                            {publicData.website && (
                                <small className="me-3">
                                    <a href={publicData.website} target="_blank" rel="noreferrer">
                                        <LinkIcon color="muted align-text-top" />{' '}
                                        {urlReplace(publicData.website)}
                                    </a>
                                </small>
                            )}
                            <small className="me-3">
                                <BallonIcon color="muted align-text-top" /> Born {publicData.dob}
                            </small>
                            <small>
                                <CalendarIcon color="muted align-text-top" /> Joined{' '}
                                {formatDateString(new Date(publicData.joined), 'short')}
                            </small>
                        </section>
                    </article>
                )
            )}
        </>
    )
}

export default ProfileView
