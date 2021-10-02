import React, { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { displayFunctions, firebaseFunctions } from '../../helper-functions'
import FormOptions from '../form-options'
import StoreContext from '../../context/StoreContext'

const SignInComponent = () => {
    const {
        store: {
            auth,
            loading,
            setLoading,
            currentUser,
            modalState,
            setModalState,
            setModalContent,
            toasts,
            setToasts,
        },
    } = useContext(StoreContext)

    const { toggleModal, toastCatchError } = displayFunctions
    const { signin, signout } = firebaseFunctions

    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await signin(auth, emailRef.current.value, passwordRef.current.value)
            if (modalState) {
                toggleModal(modalState, setModalState, setModalContent)
            } else {
                history.push('/')
            }
        } catch (errorMessage) {
            toastCatchError(toasts, setToasts, errorMessage)
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
