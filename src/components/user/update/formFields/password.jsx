/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useRef } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import ResetPassword from '../../../reset-password'
import { displayFunctions, firebaseFunctions } from '../../../../helper-functions'
import StoreContext from '../../../../context/StoreContext'

const ProfileUpdatePasswordComponent = () => {
    const {
        store: { auth, currentUser, toasts, setToasts },
    } = useContext(StoreContext)

    // min password length
    const minLength = 6

    const { email } = currentUser
    const { toastCatchError } = displayFunctions
    const { signin, changePassword } = firebaseFunctions

    const [isChange, setIsChange] = useState(false)
    const [canChange, setCanChange] = useState(false)
    const [isChanged, setIsChanged] = useState(false)

    const currentPasswordRef = useRef('')
    const newPasswordRef = useRef('')
    const newPasswordConfirmRef = useRef('')

    const setNewPassword = async () => {
        // make sure user knows password
        try {
            const { current: currentPassword } = currentPasswordRef
            const { current: newPassword } = newPasswordConfirmRef
            if (currentPassword) {
                const { value: userPassword } = currentPassword
                const { value: choosenPassword } = newPassword
                await signin(auth, email, userPassword)
                await changePassword(auth.currentUser, choosenPassword)
                setIsChange(false)
                setIsChanged(true)
            }
        } catch (errorMessage) {
            toastCatchError(toasts, setToasts, errorMessage)
        }
    }

    const inputChange = () => {
        const { current: currentPassword } = currentPasswordRef
        const { current: newPassword } = newPasswordRef
        const { current: newPasswordConfirm } = newPasswordConfirmRef
        // check currents
        if (currentPassword && newPassword && newPasswordConfirm) {
            // check current values
            const { value: currentPasswordValue } = currentPassword
            const { value: newPasswordValue } = newPassword
            const { value: newPasswordConfirmValue } = newPasswordConfirm
            if (
                currentPasswordValue &&
                newPasswordValue &&
                newPasswordConfirmValue &&
                newPasswordValue === newPasswordConfirmValue &&
                newPasswordValue.length === minLength &&
                newPasswordConfirmValue.length === minLength
            ) {
                setCanChange(true)
            }
        }
    }

    return (
        <>
            <InputGroup className={`gx-1 ${isChange ? '' : 'd-flex'}`}>
                <Form.Label className="text-muted m-0 mt-3">Password</Form.Label>

                {isChange ? (
                    <>
                        <InputGroup id="current-password" className="mt-2">
                            <Form.Control
                                name="current-password"
                                type="password"
                                ref={currentPasswordRef}
                                required
                                placeholder="current password"
                                aria-placeholder="current password"
                                onChange={inputChange}
                            />
                        </InputGroup>
                        <ResetPassword />

                        <InputGroup id="new-password" className="mt-2">
                            <Form.Control
                                name="new-password"
                                type="password"
                                ref={newPasswordRef}
                                required
                                placeholder="new password"
                                aria-placeholder="new password"
                                onChange={inputChange}
                            />
                        </InputGroup>

                        <InputGroup id="confirm-new-password" className="mt-2">
                            <Form.Control
                                name="confirm-new-password"
                                type="password"
                                ref={newPasswordConfirmRef}
                                required
                                placeholder="confirm new password"
                                aria-placeholder="confirm new password"
                                onChange={inputChange}
                            />
                        </InputGroup>
                        <Button
                            disabled={!canChange}
                            className="mt-2 rounded"
                            variant="success"
                            onClick={setNewPassword}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <Button
                        className="text-start align-self-end ps-1"
                        variant="link"
                        onClick={() => {
                            setIsChange(true)
                            if (isChanged) {
                                setIsChanged(false)
                            }
                        }}
                    >
                        <small> · change</small>
                    </Button>
                )}
            </InputGroup>
            {isChanged && <p>Your password was changed</p>}
        </>
    )
}

export default ProfileUpdatePasswordComponent
