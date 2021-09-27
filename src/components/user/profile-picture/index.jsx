import React, { useContext } from 'react'

import StoreContext from '../../../context/StoreContext'

const UserProfilePictureComponent = () => {
    const {
        store: {
            currentUser: { username, profilePicture },
        },
    } = useContext(StoreContext)

    return profilePicture ? (
        <img className="rounded-circle w-100" src={profilePicture} alt={`${username}`} />
    ) : (
        <div
            className="rounded-circle bg-extra-extra-light-gray border"
            style={{ width: 40, height: 40 }}
        />
    )
}

export default UserProfilePictureComponent
