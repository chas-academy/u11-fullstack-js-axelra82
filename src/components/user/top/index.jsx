import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logotype from '../../logotype'
import { ProfileIcon } from '../../icons'
import UserProfilePicture from '../profile-picture'
import StoreContext from '../../../context/StoreContext'

const MobileUserTopComponent = () => {
    const {
        store: { currentUser },
    } = useContext(StoreContext)

    const topLeftCircleStyle = { left: 10, top: 7, zIndex: 98 }

    return (
        <>
            {currentUser ? (
                <Link
                    to={`${currentUser.username}`}
                    className="position-absolute"
                    style={topLeftCircleStyle}
                >
                    <UserProfilePicture style={{ width: 53 }} />
                </Link>
            ) : (
                <Link to="/signin" classes="position-absolute">
                    <ProfileIcon size="large" classes="ms-3" />
                </Link>
            )}
            <Link to="/">
                <Logotype classes="w-100" style={{ height: 30 }} />
            </Link>
        </>
    )
}

export default MobileUserTopComponent
