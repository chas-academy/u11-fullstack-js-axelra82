import usernameLookUp from './username-lookup'

// make sure username is unique
const usernameCheck = async (db, string) => {
    // make sure string only contains lower, uppercase letters and numbers
    let safeUsername = string.replace(/([a-zA-Z0-9]+)[^a-zA-Z0-9@]*(@.*)?/gi, '$1').toLowerCase()

    const querySnapshot = await usernameLookUp(db, 'users', safeUsername)

    if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((docMatch) => {
            const docMatchData = docMatch.data()
            const docMatchUsername = docMatchData.username

            // look for trailing numbers in existing username
            const numberedUsername = docMatchUsername.match(/\d+$/gi)
            if (numberedUsername) {
                // username has trailing number increment by 1
                const usernameNumber = parseInt(numberedUsername[0], 10) + 1
                safeUsername = safeUsername.replace(/([a-z])\d+$/gi, `$1${usernameNumber}`)
            } else {
                // username does not have trailing number initialize trailing username number with 1
                safeUsername = `${safeUsername}1`
            }
        })
    }

    return safeUsername
}

export default usernameCheck
