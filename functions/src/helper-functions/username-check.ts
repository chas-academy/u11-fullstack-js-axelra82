import * as admin from 'firebase-admin'
const db = admin.firestore()

const usernameCheck = async (string: string, userCollection: string) => {
    // make sure string only contains lower, uppercase letters and numbers
    let safeUsername = string.replace(/([a-zA-Z0-9]+)[^a-zA-Z0-9@]*(@.*)?/gi, '$1').toLowerCase()

    // look for users where username matches
    const snapshot = await db.collection(userCollection).where('username', '==', safeUsername).get()

    if (snapshot.docs.length > 0) {
        snapshot.forEach((docMatch: any) => {
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
