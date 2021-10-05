// deploy using firebase deploy --only functions
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'

// initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase)

// import helper functions after initializing app
import * as helperFunctions from './helper-functions'

// initialize express server
const app = express()

// automatically allow cross-origin requests
app.use(cors({ origin: true }))

// initialize the database and the collection
const db = admin.firestore()
const auth = admin.auth()
const userCollection = 'users'
const roleCollection = 'roles'
const timestampNow = admin.firestore.Timestamp.now()
const timestampDate = (date: Date) => {
    return admin.firestore.Timestamp.fromDate(new Date(date))
}
// deconstruct helper functions
const { usernameCheck } = helperFunctions

// define google cloud function name
export const webApi = functions.https.onRequest(app)

interface UserAuth {
    email: string
    password: string
    displayName: string
}

interface UserDoc {
    bio: string
    dob: admin.firestore.Timestamp
    email: string
    joined: admin.firestore.Timestamp
    name: {
        firstName: string
        lastName: string
    }
    profilePicture: string
    role: admin.firestore.DocumentReference
    username: string
    website: string
}

// create new user
app.post('/users', async (req, res) => {
    try {
        const body = req.body
        const dob = body['dob']
        const firstName = body['firstName']
        const lastName = body['lastName']
        const email = body['email']
        const username = await usernameCheck(body['email'], userCollection)
        const password = body['password']
        const randomNumber = Math.floor(Math.random() * 5 + 1)
        const profilePicture = `theme${randomNumber}`

        // create auth user
        const authData: UserAuth = {
            email,
            password,
            displayName: `${firstName} ${lastName}`,
        }

        const userAuth = await auth.createUser(authData)

        // create db entry for user
        const userData: UserDoc = {
            bio: '',
            dob: timestampDate(dob),
            email,
            joined: timestampNow,
            name: {
                firstName,
                lastName,
            },
            profilePicture,
            role: db.collection(roleCollection).doc('registered'),
            username,
            website: '',
        }

        const userDoc = await db.collection(userCollection).doc(userAuth.uid).set(userData)
        res.status(201).send({ userAuth, userDoc })
    } catch (error) {
        res.status(400).send(`Error: ${error}`)
    }
})

// get all users
app.get('/users', async (req, res) => {
    try {
        const userQuerySnapshot = await db.collection(userCollection).get()
        const users: Record<string, unknown>[] = []
        userQuerySnapshot.forEach((doc) => {
            users.push({
                id: doc.id,
                data: doc.data(),
            })
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error)
    }
})
