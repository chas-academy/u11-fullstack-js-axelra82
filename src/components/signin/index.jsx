import React, { useRef, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import PreviousPage from '../previous-page'
import StoreContext from '../../context/StoreContext'

const SignInComponent = () => {
    const {
        store: { signin },
    } = useContext(StoreContext)

    const emailRef = useRef()
    const passwordRef = useRef()
    const [submitError, setsubmitError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setsubmitError('')
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch (catchError) {
            console.log(catchError)
            setsubmitError('Failed to login')
        }

        return setLoading(false)
    }

    return (
        <>
            <Card>
                <PreviousPage classes="mt-1" />
                <Card.Body>
                    {submitError && <Alert variant="danger">{submitError}</Alert>}
                    <h1 className="text-center">Sign In</h1>
                    <p>
                        Sign in to your account and start sharing your thoughts with the world
                        instantly
                    </p>
                    <Form onSubmit={handleSubmit}>
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
                        <Button disabled={loading} className="w-100 mt-2" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center text-size-medium mt-1">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
            <div className="w-100 text-center text-size-medium mt-1">
                Continue without an account? <Link to="/">Browse</Link>
            </div>
        </>
    )
}

export default SignInComponent
