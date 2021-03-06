// deploy using firebase deploy --only functions
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import algoliasearch from 'algoliasearch'
import * as cors from 'cors'

// env and project token
const env = functions.config()
const project = process.env.GCLOUD_PROJECT
const client = algoliasearch(env.algolia.appid, env.algolia.apikey)
const index = client.initIndex('instant_search')
// token not needed for
// const token = functions.config().ci.token

// initialize firebase inorder to access its services
admin.initializeApp(env.firebase)

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

// reindex algolia with new data on
// create or delete for users and posts
exports.indexUser = functions.firestore
    .document(`${userCollection}/{userId}`)
    .onCreate((snap, _) => {
        const data = snap.data()
        const objectID = snap.id
        return index.saveObject({ objectID, ...data })
    })
exports.updateIndexUser = functions.firestore
    .document(`${userCollection}/{userId}`)
    .onUpdate((change) => {
        const data = change.after.data()
        const objectID = change.after.id
        return index.saveObject({ ...data, objectID })
    })
exports.unindexUser = functions.firestore
    .document(`${userCollection}/{userId}`)
    .onDelete((snap, _) => {
        const objectID = snap.id
        return index.deleteObject(objectID)
    })
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

// get (read) single user
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
            userData.uid = doc.id
            res.status(201).send(userData)
            return
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// update single user
app.post('/user/update', async (req, res) => {
    try {
        // handle request body
        const body = req.body
        const uid = body['uid']
        const data = body['data']

        // get username
        const userDocRef = db.collection(userCollection).doc(uid)
        const userDoc: admin.firestore.DocumentData = await userDocRef.get()
        const userDocData: UserDoc = userDoc.data()
        const username = userDocData.username

        // update auth email for user
        if (typeof data.email !== 'undefined') {
            await auth.updateUser(uid, { email: data.email })
        }

        // format date
        if (typeof data.dob !== 'undefined') {
            data.dob = timestampDate(data.dob)
        }

        // handle image
        if (typeof data.profilePicture !== 'undefined') {
            const imageObject = data.profilePicture
            const { source: base64string, type: fileType } = imageObject
            const base64Data = base64string.replace(/^data:\w+\/\w+;base64,/, '')
            const fileBuffer = Buffer.from(base64Data, 'base64')
            const fileName = `${username}.${fileType}`
            const fileLocation = `users/${uid}/profile-picture/${fileName}`
            // creat image reference
            const imageFile = bucket.file(fileLocation)
            await imageFile.save(fileBuffer, {
                metadata: {
                    contentType: `image/${fileType}`,
                },
                predefinedAcl: 'publicRead',
            })
            const metaData = await imageFile.getMetadata()
            const imageUrl = metaData[0].mediaLink
            // update auth user meta data
            await auth.updateUser(uid, { photoURL: imageUrl })
            data.profilePicture = imageUrl
        }

        // udpate user document
        await userDocRef.update(data)

        // return response with data
        res.status(201).send('User updated')
    } catch (error) {
        res.status(400).send(`Error: ${error}`)
    }
})

// delete user with id
app.delete('/user/delete/:id', async (req, res) => {
    try {
        // handle request body
        const id = req.params.id

        // delete user from auth
        auth.deleteUser(id)

        // delete users posts
        const userDocRef = db.collection(userCollection).doc(id)
        const userDoc: admin.firestore.DocumentData = await userDocRef.get()
        const userData: UserDoc = userDoc.data()
        const username = userData.username
        const posts = await db
            .collection(postCollection)
            .where('user.username', '==', username)
            .get()
        const deletePosts: Promise<any>[] = []
        posts.forEach((postDoc) => {
            const deleteDoc = db.collection(postCollection).doc(postDoc.id).delete()
            deletePosts.push(deleteDoc)
        })
        // wait for all posts to delete
        await Promise.all(deletePosts)

        // recursive delete of user doc
        const userPath = `/${userCollection}/${id}`
        await firebase_tools.firestore.delete(userPath, {
            project,
            recursive: true,
            yes: true,
        })
        // clear user bucket
        const [files] = await bucket.getFiles({
            prefix: `users/${id}`,
        })
        const deleteFiles = files.map((file) => file.delete())
        // wait for all files to delete
        await Promise.all(deleteFiles)

        // return response with message
        res.status(200).send(`User ${id} deleted`)
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
