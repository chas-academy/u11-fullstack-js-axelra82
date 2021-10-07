// deploy using firebase deploy --only functions
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'

// env and project token
const project = process.env.GCLOUD_PROJECT
// const token = functions.config().ci.token

// initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase)

// firebase tools is missing TS support
const firebase_tools = require('firebase-tools')

// import helper functions after initializing app
import * as helperFunctions from './helper-functions'

// initialize express server
const app = express()

// automatically allow cross-origin requests
app.use(cors({ origin: true }))

// initialize the database and the collection
const db = admin.firestore()
const auth = admin.auth()
const storage = admin.storage()
const bucket = storage.bucket()
const userCollection = 'users'
const roleCollection = 'roles'
const postCollection = 'posts'
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
        first: string
        last: string
    }
    profilePicture: string
    role: admin.firestore.DocumentReference
    username: string
    website: string
}

interface PostDoc {
    content: string
    mentions: Record<string, admin.firestore.DocumentReference>[]
    createdAt: admin.firestore.Timestamp
    userRef: admin.firestore.DocumentReference
    user: {
        name: string
        username: string
        picture: string
    }
}

// create new user
app.post('/user/create', async (req, res) => {
    try {
        // handle request body
        const body = req.body
        const bio = typeof body['bio'] !== 'undefined' ? body['bio'].slice(0, 160) : ''
        const dob = body['dob']
        const firstName = body['firstName'].slice(0, 50)
        const lastName = body['lastName'].slice(0, 50)
        const email = body['email'].slice(0, 100)
        const username = await usernameCheck(body['email'], userCollection)
        const password = body['password']
        const randomNumber = Math.floor(Math.random() * 5 + 1)
        const profilePicture =
            typeof body['profilePicture'] !== 'undefined'
                ? body['profilePicture']
                : `theme${randomNumber}`
        const website = typeof body['website'] !== 'undefined' ? body['website'].slice(0, 100) : ''

        // create auth user
        const authData: UserAuth = {
            email,
            password,
            displayName: `${firstName} ${lastName}`,
        }

        const userAuth = await auth.createUser(authData)
        const userUid = userAuth.uid

        // create db entry for user
        const userData: UserDoc = {
            bio,
            dob: timestampDate(dob),
            email,
            joined: timestampNow,
            name: {
                first: firstName,
                last: lastName,
            },
            profilePicture,
            role: db.collection(roleCollection).doc('registered'),
            username,
            website,
        }
        const userDoc = db.collection(userCollection).doc(userUid)
        await userDoc.set(userData)
        const getDoc = await userDoc.get()
        const docData = getDoc.data()

        // return response with data
        res.status(201).send({ userAuth, docData })
    } catch (error) {
        res.status(400).send(`Error: ${error}`)
    }
})

// get single user
app.get('/user/:username', async (req, res) => {
    try {
        const username = req.params.username
        // look for user document matching id
        const snapshot = await db.collection(userCollection).where('username', '==', username).get()
        // no user found
        if (snapshot.empty) {
            res.status(201).send(`User ${username} not found`)
            return
        }
        // if not empty should only be 1
        if (snapshot.size > 1) {
            res.status(401).send('More than one user found!')
            return
        }
        // snapshot not empty and only has 1 record
        snapshot.forEach((doc) => {
            const userData = doc.data()
            res.status(201).send(userData)
            return
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// get all users
app.get('/users/list', async (_, res) => {
    try {
        const userQuerySnapshot: admin.firestore.QuerySnapshot = await db
            .collection(userCollection)
            .get()
        const users: Record<string, unknown>[] = []
        userQuerySnapshot.forEach((userDoc: admin.firestore.DocumentSnapshot<any>) => {
            users.push({
                id: userDoc.id,
                data: userDoc.data(),
            })
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete user with id
app.delete('/user/delete/:id', async (req, res) => {
    try {
        // handle request body
        const id = req.params.id
        const userPath = `/${userCollection}/${id}`
        // delete user from auth
        auth.deleteUser(id)
        // delete users firebase documents
        await firebase_tools.firestore.delete(userPath, {
            project,
            recursive: true,
            yes: true,
        })

        const [files] = await bucket.getFiles({
            prefix: id,
        })
        const deletePromises = files.map((file) => file.delete())
        Promise.all(deletePromises)

        // return response with message
        res.status(200).send(`User ${id} deleted`)
    } catch (error) {
        res.status(400).send(error)
    }
})

// create new post with uid
app.post('/post/create', async (req, res) => {
    try {
        // handle request body
        const body = req.body
        const content = body['content']
        const userRef: admin.firestore.DocumentReference = db
            .collection(userCollection)
            .doc(body['uid'])
        const userDoc: admin.firestore.DocumentSnapshot<any> = await userRef.get()
        const userData = userDoc.data()

        // create post
        const postData: PostDoc = {
            content,
            mentions: [],
            createdAt: timestampNow,
            userRef,
            user: {
                name: `${userData.name.first} ${userData.name.last}`,
                username: userData.username,
                picture: userData.profilePicture,
            },
        }
        const postDoc = await db.collection(postCollection).add(postData)

        // add post id reference in user collection posts
        const postRef = userRef.collection('posts').doc(postDoc.id)
        await postRef.set({ reference: postDoc })

        // return response with data
        res.status(201).send({ id: postDoc.id, data: postData })
    } catch (error) {
        res.status(400).send(error)
    }
})

// get all posts
app.get('/posts/list', async (_, res) => {
    try {
        const postSnapshot: admin.firestore.QuerySnapshot = await db
            .collection(postCollection)
            .orderBy('createdAt', 'desc')
            .get()
        const posts: Record<string, unknown>[] = []
        // no posts found
        if (postSnapshot.empty) {
            res.status(201).send(`No posts found`)
            return
        }

        postSnapshot.forEach((postDoc: admin.firestore.DocumentSnapshot<any>) => {
            posts.push({
                id: postDoc.id,
                data: postDoc.data(),
            })
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete post with id
app.delete('/post/delete/:id', async (req, res) => {
    try {
        // handle request body
        const id = req.params.id
        const postRef: admin.firestore.DocumentReference = db.collection(postCollection).doc(id)
        const postDoc: admin.firestore.DocumentSnapshot<any> = await postRef.get()
        const postData: PostDoc = postDoc.data()
        const userRef: admin.firestore.DocumentReference = postData.userRef
        const userPostRef: admin.firestore.DocumentReference = userRef.collection('posts').doc(id)

        // delete post
        postRef.delete()
        // delete post reference in user
        userPostRef.delete()

        // return response with message
        res.status(200).send(`Post ${id} deleted and removed from reference in user ${userRef.id}`)
    } catch (error) {
        res.status(400).send(error)
    }
})
