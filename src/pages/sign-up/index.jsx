import React from 'react'
import { Container, Card } from 'react-bootstrap'
import SignUpComponent from '../../components/signup'
import PreviousPage from '../../components/previous-page'

const SignUpPage = () => {
    return (
        <Container className="d-flex w-100 mt-5 align-content-center justify-content-center">
            <Card as="article" className="card-max-550">
                <PreviousPage classes="mt-1" />
                <Card.Body>
                    <h1 className="text-center">Sign Up</h1>
                    <p>
                        Create an account and start sharing your thoughts with the world instantly
                    </p>
                    <SignUpComponent />
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SignUpPage
