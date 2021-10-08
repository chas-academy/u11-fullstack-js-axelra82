/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { DobField, EmailField, NameField, PasswordField } from './formFields'
import FormOptions from '../form-options'
import { displayFunctions, firebaseFunctions } from '../../helper-functions'
import StoreContext from '../../context/StoreContext'

const SignUpComponent = () => {
    const {
        store: { auth, loading, isAdmin, setLoading, toasts, setToasts },
    } = useContext(StoreContext)

    const { toastCatchError } = displayFunctions
    const { signup } = firebaseFunctions

    const firstNameRef = useRef()
    const lastNameRef = useRef()
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
            toastCatchError(toasts, setToasts, 'Passwords do not match')
        } else {
            try {
                const email = emailRef.current.value

                // create user
                const response = await signup(
                    auth,
                    isAdmin,
                    dobRef.current.value,
                    email,
                    firstNameRef.current.value,
                    lastNameRef.current.value,
                    passwordRef.current.value,
                    toastCatchError,
                    toasts,
                    setToasts
                )
                if (response && !isAdmin) {
                    const username = response
                    // reroute to user page with state isNew true to identify new sign up
                    history.push({ pathname: `/${username}`, state: { isNew: true } })
                }
            } catch (errorMessage) {
                toastCatchError(toasts, setToasts, errorMessage)
            }
        }

        setLoading(false)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <NameField props={{ firstNameRef, lastNameRef }} />
                <EmailField props={{ emailRef }} />
                <DobField props={{ dobRef, setDobTouch, dobTouch }} />
                <PasswordField props={{ passwordRef, passwordConfirmRef }} />
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                    {isAdmin ? <>Create</> : <>Sign Up</>}
                </Button>
            </Form>

            {!isAdmin && (
                <FormOptions
                    options={{
                        action: 'Sign In',
                        route: 'signin',
                        message: 'Already have an account?',
                    }}
                />
            )}
        </>
    )
}

export default SignUpComponent
