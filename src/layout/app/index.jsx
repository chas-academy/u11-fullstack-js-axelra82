import React from 'react'
import { Container, Row } from 'react-bootstrap'
import HeaderComponent from '../header'
import MiddleComponent from '../middle'
import MobileUserTopComponent from '../../components/user/top'
import BottomComponent from '../bottom'

const AppComponent = () => {
    return (
        <>
            <section className="position-relative d-md-none d-flex border-bottom py-3">
                <MobileUserTopComponent />
            </section>
            <Container fluid="xl">
                <Row as="section">
                    <HeaderComponent />
                    <MiddleComponent />
                </Row>
                <Row as="section">
                    <BottomComponent />
                </Row>
            </Container>
        </>
    )
}

export default AppComponent
