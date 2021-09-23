import React from 'react'
import { Container } from 'react-bootstrap'
import SignUpComponent from '../../components/signup'

const SignUpPage = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center">
            <section className="w-100 card-max-550">
                <SignUpComponent />
            </section>
        </Container>
    )
}

export default SignUpPage
