import usernameLookUp from './username-lookup'
import userObjectFormat from './user-object-format'

const getProfileData = async (db, profileUsername) => {
    let publicProfile
    const query = await usernameLookUp(db, 'users', profileUsername)

    if (query.docs.length > 0) {
        query.forEach(async (docMatch) => {
            const docData = docMatch.data()
            publicProfile = await userObjectFormat(docData)
        })
    }
    return publicProfile
}

export default getProfileData
