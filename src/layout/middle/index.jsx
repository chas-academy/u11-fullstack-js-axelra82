/* eslint-disable no-console */
import React from 'react'
import { useLocation } from 'react-router-dom'
import { HomePage, MessagesPage, ProfilePage } from '../../pages'
import RightComponent from '../right'
import ConversationComponent from '../conversation'
import './style.scss'

const MiddleComponent = () => {
    // get current location
    const location = useLocation()
    const { pathname } = location
    const isMessageView = pathname === '/messages'

    const MiddlePanelContent = () => {
        switch (pathname) {
            case '/messages':
                return <MessagesPage />

            case '/profile':
                return <ProfilePage />

            default:
                return <HomePage />
        }
    }

    const RightPanelContent = () => {
        switch (pathname) {
            case '/messages':
                return <ConversationComponent />

            default:
                return <RightComponent />
        }
    }

    return (
        <>
            <section id="middle-panel" className={`${isMessageView ? 'message-view' : ''}`}>
                <MiddlePanelContent />
            </section>
            <aside id="right-panel" className={`${isMessageView ? 'message-view' : ''}`}>
                <RightPanelContent />
            </aside>
        </>
    )
}

export default MiddleComponent
