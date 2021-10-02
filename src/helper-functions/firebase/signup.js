import { createUserWithEmailAndPassword, updateProfile, getAdditionalUserInfo } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { formatDateString } from '../dates'

const signup = async (db, auth, dob, email, username, nameFirst, nameLast, password) => {
    // create user
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

    // update user display name
    await updateProfile(auth.currentUser, { displayName: `${nameFirst} ${nameLast}` })

    // create initial random profile picture theme
    const randomNumber = Math.floor(Math.random() * 5 + 1)
    const profilePicture = `theme${randomNumber}`

    // set now as joined date
    const joined = formatDateString(new Date())

    // set initial user type to registered
    const userType = doc(db, 'user_types', 'registered')

    // create user db entry
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
        bio: '',
        dob: formatDateString(new Date(dob)),
        email,
        joined,
        name: { first: nameFirst, last: nameLast },
        profilePicture,
        username,
        userType,
        website: '',
    })

    // return additional user details with isNew
    const response = getAdditionalUserInfo(userCredentials)
    return response
}

export default signup
