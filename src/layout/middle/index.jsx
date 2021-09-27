/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { HomeView, MessagesView, ProfileView, SearchView } from '../../views'
import RightComponent from '../right'
import ConversationComponent from '../conversation'
import './style.scss'

const MiddleComponent = () => {
    const location = useLocation()
    const { username } = useParams()
    const { pathname } = location
    const isMessageView = pathname === '/messages'

    const MiddlePanelContent = () => {
        switch (pathname) {
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
                return <RightComponent />
        }
    }
    // sm={2} md={3}
    return (
        <>
            <Col
                sm={isMessageView ? 3 : 7}
                md={isMessageView ? 3 : 6}
                as="section"
                id="middle-panel"
                className="p-0"
            >
                <MiddlePanelContent />
            </Col>
            <Col
                sm={isMessageView ? 7 : 3}
                md={isMessageView ? 6 : 3}
                as="aside"
                id="right-panel"
                className="d-none d-md-block p-0"
            >
                <section
                    className={`min-vh-100 border-start ${
                        isMessageView ? 'border-end' : 'sticky-top'
                    }`}
                >
                    <RightPanelContent />
                </section>
            </Col>
        </>
    )
}

export default MiddleComponent
