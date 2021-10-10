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

    return (
        <div className="d-flex justify-content-center w-100">
            {currentUser ? (
                <Link to={`${currentUser.username}`} className="ms-3 flex-grow-1">
                    <UserProfilePicture style={{ width: 53 }} />
                </Link>
            ) : (
                <Link to="/signin" className="ms-3 flex-grow-1">
                    <ProfileIcon size="large" />
                </Link>
            )}
            <Link to="/" className="flex-grow-1">
                <Logotype style={{ width: 50, height: 30 }} />
            </Link>
        </div>
    )
}

export default MobileUserTopComponent
