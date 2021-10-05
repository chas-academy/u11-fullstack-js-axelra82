import { doc, getDoc } from 'firebase/firestore'

const getCurrentUserDbEntry = async (
    db,
    user,
    setCurrentUser,
    toastCatchError,
    toasts,
    setToasts
) => {
    const userDbDoc = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDbDoc)
    const userData = userDoc.data()

    if (userData) {
        // name user role
        const roleDoc = await getDoc(userData.role)
        userData.role = roleDoc.id

        // set user with named role
        setCurrentUser(userData)
    } else {
        toastCatchError(
            toasts,
            setToasts,
            'Could not find user in database. Please reload page. If the problem persists contact an administrator'
        )
    }
}

export default getCurrentUserDbEntry
