import React from 'react'
import { Container, Card } from 'react-bootstrap'
import SignInComponent from '../../components/signin'
import PreviousPage from '../../components/previous-page'

const SignInPage = () => {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <section className="w-100 card-max-550">
                <Card className="mt-2">
                    <PreviousPage />
                    <Card.Body>
                        <h1 className="text-center">Sign In</h1>
                        <p>
                            Sign in to your account and start sharing your thoughts with the world
                            instantly
                        </p>
                        <SignInComponent />
                    </Card.Body>
                </Card>
            </section>
        </Container>
    )
}

export default SignInPage
