import React from 'react'
import UserAvatar from '../../../assets/dev-placeholders/avatar.jpeg'
import './style.scss'

const LeftUserComponent = () => {
    const curreUserNamePlaceHolder = 'Axel Roussille Åberg'
    const curreUserHandlePlaceHolder = 'axelra82'
    const curreUserAvatarPlaceHolder = (
        <img
            className="user-avatar"
            src={UserAvatar}
            alt={`${curreUserHandlePlaceHolder}-avatar`}
        />
    )

    return (
        <section id="left-panel-user">
            {curreUserAvatarPlaceHolder}
            <strong className="user-name">{curreUserNamePlaceHolder}</strong>
            <span className="user-handle text-muted-dark">@{curreUserHandlePlaceHolder}</span>
        </section>
    )
}

export default LeftUserComponent
