/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { Row, Col, Button, Card, CloseButton } from 'react-bootstrap'
import { CalendarIcon, BallonIcon, LinkIcon } from '../../components/icons'
import UpdateUserProfile from '../../components/user/update'
import LoadingComponent from '../../components/loading'
import StoreContext from '../../context/StoreContext'

const ProfileView = () => {
    const {
        store: {
            loading,
            setLoading,
            formatDateString,
            currentUser,
            toggleModal,
            modalContent,
            setModalContent,
            getProfileData,
            urlReplace,
        },
    } = useContext(StoreContext)

    const history = useHistory()
    const { username } = useParams()
    const location = useLocation()
    const { state: locationState } = location

    const [publicData, setPublicData] = useState()
    const [isNew, setIsNew] = useState(false)
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
                        <UpdateUserProfile profileData={publicData} />
                    </>
                ),
                footer: {
                    ...modalContent.footer,
                    show: true,
                    buttons: [
                        {
                            text: 'update',
                        },
                    ],
                },
            })
            toggleModal()
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
            const publicProfileData = await getProfileData(username)
            if (publicProfileData) {
                setPublicData(publicProfileData)
            } else {
                history.push('/', '404')
            }
        }
        getUserData()

        setLoading(false)
    }, [isNew])

    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : (
                publicData && (
                    <article className="p-3">
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
