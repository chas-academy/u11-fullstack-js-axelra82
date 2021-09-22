import React from 'react'
import UserAvatar from '../../../components/user-avatar'
import './style.scss'

const LeftUserComponent = () => {
    const curreUserNamePlaceHolder = 'Axel Roussille Åberg'
    const curreUserHandlePlaceHolder = 'axelra82'

    return (
        <section id="left-panel-user">
            <UserAvatar />
            <strong className="user-name">{curreUserNamePlaceHolder}</strong>
            <span className="user-handle text-muted">@{curreUserHandlePlaceHolder}</span>
        </section>
    )
}

export default LeftUserComponent
