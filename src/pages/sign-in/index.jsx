/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import SignInComponent from '../../components/signin'
import PreviousPage from '../../components/previous-page'
import StoreContext from '../../context/StoreContext'

const SignInPage = () => {
    const { store: currentUser } = useContext(StoreContext)
    const history = useHistory()

    useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, [currentUser])

    return (
        <Container className="d-flex w-100 mt-5 align-content-center justify-content-center">
            <Card as="article" className="card-max-550">
                <PreviousPage classes="mt-1" />
                <Card.Body>
                    <h1 className="text-center">Sign In</h1>
                    <p>
                        Sign in to your account and start sharing your thoughts with the world
                        instantly
                    </p>
                    <SignInComponent />
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SignInPage
