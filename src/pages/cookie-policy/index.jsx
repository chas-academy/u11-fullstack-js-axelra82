import React from 'react'
import { Container } from 'react-bootstrap'
import PreviousPage from '../../components/previous-page'

const CookiePolicyPage = () => {
    return (
        <Container>
            <PreviousPage />
            <h1>Twitter Clone Cookie Policy</h1>
            <h2>Our use of cookies and similar technologie</h2>
            <p>
                Our services use cookies and other similar technologies, such as pixels or local
                storage, to help provide you with a better, faster, and safer experience. Here are
                some of the ways that our services, including our various websites, SMS, APIs, email
                notifications, applications, buttons, widgets, and ads, use these technologies: to
                log you into Twitter and Periscope, save your preferences, personalize the content
                you see, protect against spam and abuse, and show you more relevant ads. Below we
                explain how Twitter, our partners, and other third parties use these technologies,
                your privacy settings, and the other options you have.
            </p>
            <h4>What are cookies, pixels, and local storage?</h4>
            <p>
                Cookies are small files that websites place on your computer as you browse the web.
                Like many websites, Twitter, Periscope, and our other services use cookies to
                discover how people are using our services and to make them work better. A pixel is
                a small amount of code on a web page or in an email notification. As many services
                do, we use pixels to learn whether you’ve interacted with certain web or email
                content. This helps us measure and improve our services and personalize your
                experience. Local storage is an industry-standard technology that allows a website
                or application to store information locally on your computer or mobile device. We
                use local storage to customize what we show you based on your past interactions with
                our services.
            </p>
            <h4>Why do our services use these technologies?</h4>
            <p>
                Our services use these technologies to deliver, measure, and improve our services in
                various ways.
            </p>

            <h3>NOTE!</h3>
            <p>
                This is a “policy placeholder” page for a school assignment and has no legal
                standing. The content of this page is an excerpt from{' '}
                <a href="https://help.twitter.com/en/rules-and-policies/twitter-cookies">
                    help.twitter.com/en/rules-and-policies/twitter-cookies
                </a>
            </p>
        </Container>
    )
}

export default CookiePolicyPage
