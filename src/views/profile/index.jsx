import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import UpdateUserProfile from '../../components/user/update'
import StoreContext from '../../context/StoreContext'

const ProfileView = () => {
    const {
        store: { isSignUp, currentUser, toggleModal, modalContent, setModalContent },
    } = useContext(StoreContext)

    const { name, email, bio, dob } = currentUser

    console.log(name, email, bio, dob)

    console.log('------- KNOW IF WE JUST SIGNED UP -------')
    console.log(isSignUp)

    const showEditProfile = () => {
        setModalContent({
            ...modalContent,
            header: {
                ...modalContent.header,
                show: true,
                title: 'Edit profile',
            },
            body: <UpdateUserProfile />,
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

    return (
        <>
            <h1>{name}</h1>
            <Button
                onClick={() => showEditProfile()}
                className="rounded-pill"
                variant="outline-secondary"
            >
                Edit profile
            </Button>
        </>
    )
}

export default ProfileView
