import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Logotype from '../../logotype'
import UserProfilePicture from '../profile-picture'

const MobileUserTopComponent = () => {
    const { username } = useParams()
    return (
        <>
            <Link
                to={`${username}`}
                className="position-absolute"
                style={{ left: 10, top: 7, zIndex: 98 }}
            >
                <UserProfilePicture style={{ width: 53 }} />
            </Link>
            <Logotype classes="w-100" style={{ height: 30 }} />
        </>
    )
}

export default MobileUserTopComponent
