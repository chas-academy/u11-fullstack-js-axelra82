/* eslint-disable no-console */
import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import PreviousPage from '../previous-page'
import FormOptions from '../form-options'
import StoreContext from '../../context/StoreContext'

const SignUpComponent = () => {
    const {
        store: { signup },
    } = useContext(StoreContext)

    const nameFirstRef = useRef()
    const nameLastRef = useRef()
    const handleRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [submitError, setsubmitError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setsubmitError('Passwords do not match')
        }

        try {
            setsubmitError('')
            setLoading(true)
            await signup(
                emailRef.current.value,
                passwordRef.current.value,
                nameFirstRef.current.value,
                nameLastRef.current.value,
                handleRef.current.value
            )
            history.push('/')
        } catch (catchError) {
            console.log(catchError)
            setsubmitError('Failed to create an account')
        }

        return setLoading(false)
    }

    return (
        <>
            <Card className="mt-2">
                <PreviousPage />
                <Card.Body>
                    {submitError && <Alert variant="danger">{submitError}</Alert>}
                    <h1 className="text-center">Sign Up</h1>
                    <p>
                        Create an account and start sharing your thoughts with the world instantly
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="name" className="mt-1">
                            <Form.Label className="text-muted">Name</Form.Label>
                            <Form.Control
                                type="text"
                                ref={nameFirstRef}
                                required
                                placeholder="first name"
                                aria-placeholder="first name"
                            />
                            <Form.Control
                                type="text"
                                ref={nameLastRef}
                                required
                                className="mt-1"
                                placeholder="last name"
                                aria-placeholder="last name"
                            />
                        </Form.Group>
                        <Form.Group id="handle" className="mt-1">
                            <Form.Label className="text-muted">Handle</Form.Label>
                            <Form.Control
                                type="text"
                                ref={handleRef}
                                required
                                placeholder="choose your handle"
                                aria-placeholder="choose your handle"
                            />
                        </Form.Group>
                        <Form.Group id="email" className="mt-1">
                            <Form.Label className="text-muted">Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                                placeholder="you@domain.tld"
                                aria-placeholder="you@domain.tld"
                            />
                        </Form.Group>
                        <Form.Group id="password" className="mt-1">
                            <Form.Label className="text-muted">Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                required
                                placeholder="minimum 6 character"
                                aria-placeholder="minimum 6 character"
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mt-1">
                            <Form.Label className="text-muted">Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                required
                                placeholder="verify password"
                                aria-placeholder="verify password"
                            />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <FormOptions
                options={{
                    action: 'Sign In',
                    route: 'signin',
                    message: 'Already have an account?',
                }}
            />
        </>
    )
}

export default SignUpComponent
