import usernameLookUp from './username-lookup'

const getProfileData = async (db, profileUsername) => {
    let publicProfile
    const query = await usernameLookUp(db, 'users', profileUsername)

    if (query.docs.length > 0) {
        query.forEach((docMatch) => {
            publicProfile = docMatch.data()
        })
    }
    return publicProfile
}

export default getProfileData
