import React, { useState, useContext } from 'react'
import UserAvatar from '../../../components/user-avatar'
import StoreContext from '../../../context/StoreContext'
import './style.scss'

const LeftUserComponent = () => {
    const {
        store: { currentUser, signout },
    } = useContext(StoreContext)
    const curreUserNamePlaceHolder = currentUser.name
    const curreUserHandlePlaceHolder = currentUser.handle
    const [userActions, setUserActions] = useState(false)

    const showActions = () => {
        setUserActions(!userActions)
    }

    return (
        <section
            id="left-panel-user"
            onClick={showActions}
            onKeyPress={showActions}
            role="button"
            tabIndex={0}
        >
            {userActions && (
                <div id="user-actions">
                    <div id="user-actions-current-user">
                        <UserAvatar />
                        <strong className="user-name">{curreUserNamePlaceHolder}</strong>
                        <span className="user-handle text-muted">
                            @{curreUserHandlePlaceHolder}
                        </span>
                    </div>
                    <div
                        id="user-actions-signout-user"
                        onClick={() => signout()}
                        onKeyPress={() => signout()}
                        role="button"
                        tabIndex={0}
                    >
                        sign out
                    </div>
                </div>
            )}

            <UserAvatar />
            <strong className="user-name">{curreUserNamePlaceHolder}</strong>
            <span className="user-handle text-muted">@{curreUserHandlePlaceHolder}</span>
        </section>
    )
}

export default LeftUserComponent
