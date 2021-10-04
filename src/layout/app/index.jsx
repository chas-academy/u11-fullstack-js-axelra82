import React from 'react'
import { Container, Row } from 'react-bootstrap'
import HeaderComponent from '../header'
import MiddleComponent from '../middle'
import BottomComponent from '../bottom'

const AppComponent = () => {
    return (
        <Container fluid="xl">
            <Row as="section">
                <HeaderComponent />
                <MiddleComponent />
            </Row>
            <Row as="section">
                <BottomComponent />
            </Row>
        </Container>
    )
}

export default AppComponent
