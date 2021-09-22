import React from 'react'
import UserAvatar from '../../assets/dev-placeholders/avatar.jpeg'
import './style.scss'

const UserAvatarComponent = ({ fullWidth }) => {
    const curreUserHandlePlaceHolder = 'axelra82'
    const curreUserAvatarPlaceHolder = (
        <img
            className={`user-avatar ${fullWidth ? 'full-width' : ''}`}
            src={UserAvatar}
            alt={`${curreUserHandlePlaceHolder}-avatar`}
        />
    )

    return curreUserAvatarPlaceHolder
}

UserAvatarComponent.defaultProps = {
    fullWidth: false,
}

export default UserAvatarComponent
