/* eslint-disable no-console */
import React, { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import FormOptions from '../form-options'
import StoreContext from '../../context/StoreContext'

const SignInComponent = () => {
    const {
        store: {
            loading,
            setLoading,
            currentUser,
            signin,
            modalState,
            toggleModal,
            setToasts,
            signout,
        },
    } = useContext(StoreContext)

    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // setsubmitError('')
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            if (modalState) {
                toggleModal()
            } else {
                history.push('/')
            }
        } catch (catchError) {
            const catchErrorMessage = catchError.message.replace(/.*\/((.*)\))/gi, '$2')
            setToasts((toasts) => [
                ...toasts,
                {
                    header: 'Error',
                    body: catchErrorMessage.replace(/-/gi, ' '),
                    variant: 'danger',
                    id: `signup-${catchErrorMessage}`,
                },
            ])
        }

        return setLoading(false)
    }

    return !currentUser ? (
        <>
            <Form onSubmit={handleSubmit}>
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
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                    Sign In
                </Button>
            </Form>

            <FormOptions
                options={{ action: 'Sign Up', route: 'signup', message: 'Need an account?' }}
            />
        </>
    ) : (
        <>
            <p>You are already signed in.</p>
            <Button onClick={signout}>Sign out</Button>
        </>
    )
}

export default SignInComponent
