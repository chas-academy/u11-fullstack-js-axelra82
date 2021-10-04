import { query, where, collection, getDocs } from 'firebase/firestore'

const usernameLookUp = (db, collectionName, username) => {
    // look for users where username matches
    const getCollection = collection(db, collectionName)
    const usernameMatch = query(getCollection, where('username', '==', username))
    return getDocs(usernameMatch)
}

export default usernameLookUp
