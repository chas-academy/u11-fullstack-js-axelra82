import { doc, getDoc } from 'firebase/firestore'
import userObjectFormat from './user-object-format'

const getCurrentUserDoc = async (
    db,
    user,
    setCurrentUser,
    setIsAdmin,
    toastCatchError,
    toasts,
    setToasts
) => {
    const userDbDoc = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDbDoc)
    const userData = userDoc.data()
    userData.uid = userDoc.id

    if (userData) {
        await userObjectFormat(userData, setCurrentUser, setIsAdmin)
    } else {
        toastCatchError(
            toasts,
            setToasts,
            'Could not find user. Please reload page. If the problem persists contact an administrator'
        )
    }
}

export default getCurrentUserDoc
