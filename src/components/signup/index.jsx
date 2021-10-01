/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap'
import PreviousPage from '../previous-page'
import FormOptions from '../form-options'
import StoreContext from '../../context/StoreContext'

const SignUpComponent = () => {
    const {
        store: { loading, setLoading, signup, toastCatchError, usernameCheck },
    } = useContext(StoreContext)

    const nameFirstRef = useRef()
    const nameLastRef = useRef()
    const dobRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const history = useHistory()
    const [dobTouch, setDobTouch] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // make sure choosen password matches
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            toastCatchError('Passwords do not match')
        } else {
            try {
                const email = emailRef.current.value
                // auto generate safe username from email
                const username = await usernameCheck(email)
                // create user
                const response = await signup(
                    dobRef.current.value,
                    email,
                    username,
                    nameFirstRef.current.value,
                    nameLastRef.current.value,
                    passwordRef.current.value
                )
                // reroute to user page with state isNew true to identify new sign up
                history.push({ pathname: `/${username}`, state: { isNew: response.isNewUser } })
            } catch (catchError) {
                toastCatchError(catchError)
            }
        }

        setLoading(false)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Form.Label className="text-muted">Name</Form.Label>
                    <Form.Group id="name-first" as={Col}>
                        <Form.Control
                            type="text"
                            ref={nameFirstRef}
                            required
                            placeholder="first name"
                            aria-placeholder="first name"
                        />
                    </Form.Group>

                    <Form.Group id="name-last" as={Col}>
                        <Form.Control
                            type="text"
                            ref={nameLastRef}
                            required
                            placeholder="last name"
                            aria-placeholder="last name"
                        />
                    </Form.Group>
                </Row>

                <Form.Group id="dob" className="mt-1">
                    <Form.Label className="text-muted">Date of birth</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="year-month-day"
                        required
                        ref={dobRef}
                        onKeyPress={() => setDobTouch(true)}
                        onFocus={(e) => {
                            const { target } = e
                            target.type = 'date'
                            target.defaultValue = '1980-01-01'
                        }}
                        onBlur={(e) => {
                            const { target } = e
                            if (!dobTouch) {
                                target.type = 'text'
                                target.defaultValue = ''
                                target.placeholder = 'year-month-day'
                            }
                        }}
                    />
                </Form.Group>

                <Form.Group id="email" className="mt-1">
                    <Form.Label className="text-muted">Email</Form.Label>
                    <Form.Control
                        type="email"
                        ref={emailRef}
                        required
                        placeholder="your@email.com"
                        aria-placeholder="your@email.com"
                    />
                </Form.Group>

                <Row>
                    <Form.Label className="text-muted mt-1">Password</Form.Label>
                    <Form.Group id="password" as={Col}>
                        <Form.Control
                            type="password"
                            ref={passwordRef}
                            required
                            placeholder="minimum 6 character"
                            aria-placeholder="minimum 6 character"
                        />
                    </Form.Group>

                    <Form.Group id="password-confirm" as={Col}>
                        <Form.Control
                            type="password"
                            ref={passwordConfirmRef}
                            required
                            placeholder="confirm password"
                            aria-placeholder="confirm password"
                        />
                    </Form.Group>
                </Row>

                <Button disabled={loading} className="w-100 mt-3" type="submit">
                    Sign Up
                </Button>
            </Form>

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
