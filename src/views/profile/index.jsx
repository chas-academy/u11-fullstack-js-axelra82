/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import UpdateUserProfile from '../../components/user/update'
import LoadingComponent from '../../components/loading'
import StoreContext from '../../context/StoreContext'

const ProfileView = () => {
    const {
        store: {
            loading,
            setLoading,
            isSignUp,
            currentUser,
            toggleModal,
            modalContent,
            setModalContent,
            getPublicProfile,
        },
    } = useContext(StoreContext)
    const history = useHistory()
    const { username } = useParams()
    const [publicData, setPublicData] = useState()

    const PublicProfileComponent = () => {
        const {
            name: { first: firstName, last: lastName },
        } = publicData

        return (
            <>
                <h1 className="m-0 p-0" size={3}>
                    {firstName} {lastName}
                </h1>
                <small className="text-muted">@{publicData.username}</small>
                <p>{publicData.bio}</p>
            </>
        )
    }

    const showEditProfile = () => {
        setModalContent({
            ...modalContent,
            header: {
                ...modalContent.header,
                show: true,
                title: 'Edit profile',
            },
            body: <UpdateUserProfile profileData={publicData} />,
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

    useEffect(() => {
        const getUserData = async () => {
            const getPublicProfileData = await getPublicProfile(username)

            if (getPublicProfileData) {
                setPublicData(getPublicProfileData)
                setLoading(false)
            } else {
                history.push('/', '404')
            }
        }

        getUserData()
    }, [])

    return (
        <>
            {loading && <LoadingComponent />}
            {publicData && <PublicProfileComponent />}
            {currentUser && (
                <>
                    <Button
                        onClick={() => showEditProfile()}
                        className="rounded-pill"
                        variant="outline-secondary"
                    >
                        Edit profile
                    </Button>
                </>
            )}
        </>
    )
}

export default ProfileView
