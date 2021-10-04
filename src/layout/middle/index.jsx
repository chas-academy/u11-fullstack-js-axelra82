/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { HomeView, MoreAboutView, MessagesView, ProfileView, SearchView } from '../../views'
import MoreAbout from '../../components/more-about'
import ConversationComponent from '../conversation'

const MiddleComponent = () => {
    const location = useLocation()
    const { username } = useParams()
    const { pathname } = location
    const isMessageView = pathname === '/messages'

    const MiddlePanelContent = () => {
        switch (pathname) {
            case '/more-about':
                return <MoreAboutView />

            case '/messages':
                return <MessagesView />

            case `/${username}`:
                return <ProfileView />

            case '/search':
                return <SearchView />

            default:
                return <HomeView />
        }
    }

    const RightPanelContent = () => {
        switch (pathname) {
            case '/messages':
                return <ConversationComponent />

            default:
                return <MoreAbout />
        }
    }

    return (
        <>
            <Col md={isMessageView ? 3 : 6} as="section" className="p-0">
                <MiddlePanelContent />
            </Col>
            <Col
                md={isMessageView ? 6 : 3}
                as="footer"
                className={`d-none d-md-block p-0 min-vh-100 border-start ${
                    isMessageView ? 'border-end' : 'sticky-top'
                }`}
            >
                <RightPanelContent />
            </Col>
        </>
    )
}

export default MiddleComponent
