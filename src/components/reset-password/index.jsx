import React, { useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { displayFunctions, firebaseFunctions } from '../../helper-functions'
import StoreContext from '../../context/StoreContext'

const ResetPasswordComponent = () => {
    const {
        store: { auth, currentUser, toasts, setToasts },
    } = useContext(StoreContext)

    const { toastCatchError } = displayFunctions
    const { resetPassword } = firebaseFunctions
    const [resetSent, setResetSent] = useState(false)
    const [userEmail, setUserEmail] = useState()

    const getEmail = () => {
        if (currentUser) {
            setUserEmail(currentUser.email)
        } else {
            // eslint-disable-next-line no-undef, no-alert
            const promptEmail = prompt('Enter account email for reset instructions')
            if (!promptEmail) {
                return
            }
            setUserEmail(promptEmail)
        }
    }

    useEffect(() => {
        const sendReset = async () => {
            if (userEmail) {
                const response = await resetPassword(
                    auth,
                    userEmail,
                    toastCatchError,
                    toasts,
                    setToasts
                )

                if (response) {
                    setResetSent(true)
                }
            }
        }
        sendReset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEmail])

    return (
        <small className="mt-2 text-muted">
            {!resetSent ? (
                <>
                    Forgot password?
                    <Button variant="link" onClick={getEmail}>
                        <small className="align-text-bottom ms-1">Email reset link</small>
                    </Button>
                </>
            ) : (
                <>Reset instructions sent to {userEmail}</>
            )}
        </small>
    )
}

export default ResetPasswordComponent
