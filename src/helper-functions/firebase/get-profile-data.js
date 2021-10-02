import usernameLookUp from './username-lookup'

const getProfileData = async (db, profileUsername) => {
    let publicProfile = null
    const querySnapshot = await usernameLookUp(db, 'users', profileUsername)

    if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((docMatch) => {
            publicProfile = docMatch.data()
        })
    }
    return publicProfile
}

export default getProfileData
