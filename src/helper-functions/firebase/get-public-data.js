import usernameLookUp from './username-lookup'
import userObjectFormat from './user-object-format'

const getPublicData = async (db, username, setUser, history) => {
    const query = await usernameLookUp(db, 'users', username)

    if (query.empty) {
        history.push('/', '404')
        return
    }

    if (query.size > 1) {
        throw new Error(`More than one user found with username: ${username}`)
    }

    query.forEach(async (docMatch) => {
        const docData = docMatch.data()
        await userObjectFormat(docData, setUser)
    })
}

export default getPublicData
