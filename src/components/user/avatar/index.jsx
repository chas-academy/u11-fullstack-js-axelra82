import React from 'react'
import UserAvatar from '../../../assets/dev-placeholders/avatar.jpeg'

const UserAvatarComponent = () => {
    const curreUserHandlePlaceHolder = 'axelra82'
    const curreUserAvatarPlaceHolder = (
        <img
            className="user-avatar rounded-circle w-100"
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
