import React from 'react'
import { Container } from 'react-bootstrap'
import SignInComponent from '../../components/signin'

const SignInPage = () => {
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center">
            <section className="w-100 card-max-550">
                <SignInComponent />
            </section>
        </Container>
    )
}

export default SignInPage
