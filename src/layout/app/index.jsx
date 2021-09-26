import React from 'react'
import { Container, Row } from 'react-bootstrap'
import LeftComponent from '../left'
import MiddleComponent from '../middle'
import BottomComponent from '../bottom'

const AppComponent = () => {
    return (
        <Container as="main" fluid="xl">
            <Row as="section">
                <LeftComponent />
                <MiddleComponent />
            </Row>
            <Row as="section">
                <BottomComponent />
            </Row>
        </Container>
    )
}

export default AppComponent
