import { doc, getDoc } from 'firebase/firestore'

const getCurrentUserDbEntry = async (
    db,
    user,
    setCurrentUser,
    locationState,
    toastCatchError,
    toasts,
    setToasts
) => {
    const userDbDoc = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDbDoc)

    if (userDoc.exists()) {
        const userData = userDoc.data()
        setCurrentUser(userData)
    } else if (
        typeof locationState !== 'undefined' &&
        typeof locationState.isNew !== 'undefined' &&
        locationState.isNew
    ) {
        getCurrentUserDbEntry(
            db,
            user,
            setCurrentUser,
            locationState,
            toastCatchError,
            toasts,
            setToasts
        )
    } else {
        toastCatchError(
            toasts,
            setToasts,
            'Could not find user in database. Please reload page. If the problem persists please contact site administrator'
        )
    }
}

export default getCurrentUserDbEntry
