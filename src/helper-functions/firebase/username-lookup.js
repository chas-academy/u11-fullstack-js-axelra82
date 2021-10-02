import { query, where, collection, getDocs } from 'firebase/firestore'

const usernameLookUp = (db, table, username) => {
    // look for users where username matches
    const getTable = collection(db, table)
    const usernameMatch = query(getTable, where('username', '==', username))
    return getDocs(usernameMatch)
}

export default usernameLookUp
