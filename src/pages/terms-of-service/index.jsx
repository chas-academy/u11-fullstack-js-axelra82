import React from 'react'
import { Container } from 'react-bootstrap'
import PreviousPage from '../../components/previous-page'
import AssignmentNote from '../../components/assignment-note'

const TermsOfServicePage = () => {
    return (
        <Container>
            <PreviousPage />

            <AssignmentNote page="terms" link="twitter.com/tos" url="https://twitter.com/tos" />

            <h1>Twitter Clone Terms of Service</h1>
            <h2>
                If you live outside the European Union, EFTA States, or the United Kingdom,
                including if you live in the United States
            </h2>
            <p>
                These Terms of Service (“Terms”) govern your access to and use of our services,
                including our various websites, SMS, APIs, email notifications, applications,
                buttons, widgets, ads, commerce services, and our{' '}
                <a
                    href="https://help.twitter.com/en/rules-and-policies/twitter-services-and-corporate-affiliates"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                >
                    other covered services
                </a>{' '}
                (
                <a
                    href="https://help.twitter.com/en/rules-and-policies/twitter-services-and-corporate-affiliates"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                >
                    https://help.twitter.com/en/rules-and-policies/twitter-services-and-corporate-affiliates
                </a>
                ) that link to these Terms (collectively, the “Services”), and any information,
                text, links, graphics, photos, audio, videos, or other materials or arrangements of
                materials uploaded, downloaded or appearing on the Services (collectively referred
                to as “Content”). By using the Services you agree to be bound by these Terms.
            </p>
        </Container>
    )
}

export default TermsOfServicePage
