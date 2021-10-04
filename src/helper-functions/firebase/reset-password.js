import { sendPasswordResetEmail } from 'firebase/auth'

const resetPassword = async (auth, email, toastCatchError, toasts, setToasts) => {
    try {
        await sendPasswordResetEmail(auth, email)
        return true
    } catch (errorMessage) {
        toastCatchError(toasts, setToasts, errorMessage)
        return false
    }
}

export default resetPassword
