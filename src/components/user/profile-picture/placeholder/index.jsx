/* eslint-disable react/prop-types */
import React from 'react'

const ProfilePicturePlaceholderComponent = ({ style = {}, classes = '', username = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            className={`profile-picture-placeholder rounded-circle ${classes}`}
            style={style}
        >
            <title>{username} placeholder profile picture</title>
            <rect className="fill1" width="40" height="40" />
            <polygon className="fill2" points="22.8,40 22.9,40 0,7.2 0,40 " />
            <polygon className="fill3" points="33.1,0 6.7,40 40,40 40,2.8 35.8,0 " />
            <polygon className="fill4" points="17.2,0 17.1,0.1 40,32.9 40,0 " />
        </svg>
    )
}

export default ProfilePicturePlaceholderComponent
