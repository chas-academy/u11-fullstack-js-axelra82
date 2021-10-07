/* eslint-disable no-undef */
import signin from './signin'

const signup = async (
    auth,
    isAdmin,
    dob,
    email,
    firstName,
    lastName,
    password,
    toastCatchError,
    toasts,
    setToasts
) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_WEB_API}/user/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dob,
                firstName,
                lastName,
                email,
                password,
            }),
        })
        const responseData = await response.json()
        // signin regular user after creating
        if (responseData && !isAdmin) {
            const { docData } = responseData
            const { username } = docData
            await signin(auth, email, password)
            return username
        }
    } catch (errorMessage) {
        toastCatchError(toasts, setToasts, errorMessage)
    }
    return false
}

export default signup
