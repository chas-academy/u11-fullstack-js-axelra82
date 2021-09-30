/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// hook based store
// pass detached states

import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
    getAdditionalUserInfo,
    deleteUser,
} from 'firebase/auth'
import {
    getFirestore,
    query,
    where,
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { dateFunctions, regexFunctions } from '../helper-functions'
import Context from '../context/StoreContext'

const StoreContext = ({ children }) => {
    const defaultModalContent = {
        classes: null,
        actions: null,
        header: { show: false, title: null, content: null },
        body: null,
        footer: { show: false, buttons: [] },
    }

    const { isoDateString, formatDateString } = dateFunctions
    const { urlReplace } = regexFunctions

    const history = useHistory()
    const location = useLocation()
    const { state: locationState } = location
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [toasts, setToasts] = useState([])
    const [modalState, setModalState] = useState(false)
    const [modalContent, setModalContent] = useState(defaultModalContent)

    const app = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
    })

    const auth = getAuth()
    const db = getFirestore(app)

    const toggleModal = (withTimeOut = true) => {
        setModalState(!modalState)
        // use timeout to make content transition more pleasing
        if (withTimeOut) {
            setTimeout(() => {
                // we need to reset the modal content for future use
                // eslint-disable-next-line no-unused-expressions
                modalState && setModalContent(defaultModalContent)
            }, 350)
        } else {
            setModalContent(defaultModalContent)
        }
    }

    const toastCatchError = (errorMessage) => {
        const messageString =
            typeof errorMessage === 'string'
                ? errorMessage
                : errorMessage.message.replace(/.*\/((.*)\))/gi, '$2').replace(/-/gi, ' ')
        return setToasts([
            ...toasts,
            {
                header: 'Error',
                body: messageString,
                variant: 'danger',
            },
        ])
    }

    const usernameLookUp = (table, username) => {
        // look for users where username matches
        const getTable = collection(db, table)
        const usernameMatch = query(getTable, where('username', '==', username))
        return getDocs(usernameMatch)
    }

    // make sure username is unique
    const usernameCheck = async (string) => {
        // make sure string only contains lower, uppercase letters and numbers
        let safeUsername = string
            .replace(/([a-zA-Z0-9]+)[^a-zA-Z0-9@]*(@.*)?/gi, '$1')
            .toLowerCase()

        const querySnapshot = await usernameLookUp('users', safeUsername)

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

    const signup = async (dob, email, username, nameFirst, nameLast, password) => {
        // create user
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        // update user display name
        await updateProfile(auth.currentUser, { displayName: `${nameFirst} ${nameLast}` })

        // create initial random profile picture theme
        const randomNumber = Math.floor(Math.random() * 5 + 1)
        const randomTheme = `theme${randomNumber}`

        // create user db entry
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
            bio: '',
            dob: formatDateString(new Date(dob)),
            email,
            joined: formatDateString(new Date()),
            name: { first: nameFirst, last: nameLast },
            profilePicture: randomTheme,
            username,
            userType: doc(db, 'user_types', 'registered'),
            website: '',
        })
        // return additional user details
        const response = getAdditionalUserInfo(userCredentials)
        return response
    }

    const signin = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password)
        return response
    }

    const signout = () => {
        auth.signOut()
        history.push('/signin')
    }

    const resetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email)
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password)
    }

    const updateProfilePicture = async (username, fileBlob, fileType) => {
        const fileLocation = `users/${auth.currentUser.uid}/profile-picture/${username}.${fileType}`
        // root storage reference
        const storage = getStorage()

        // creat image reference
        const imageRef = ref(storage, fileLocation)

        // await file upload
        const storageRef = await uploadBytes(imageRef, fileBlob)
        const publicFile = await getDownloadURL(storageRef.metadata.ref)

        // update auth user meta data
        await updateProfile(auth.currentUser, { photoURL: publicFile })

        // update user db profile picture entry
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            profilePicture: publicFile,
        })
    }

    const getProfileData = async (profileUsername) => {
        setLoading(true)

        let publicProfile = null
        const querySnapshot = await usernameLookUp('users', profileUsername)

        if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach((docMatch) => {
                publicProfile = docMatch.data()
            })
        }

        setLoading(false)

        return publicProfile
    }

    const deleteProfile = async (password) => {
        try {
            // get fresh user credentials
            await signin(auth.currentUser.email, password)
            // delete user db entries
            await deleteDoc(doc(db, 'users', auth.currentUser.uid))

            // move to home view and reset modal
            history.push('/')
            toggleModal(false)

            // delete user from auth
            await deleteUser(auth.currentUser)
        } catch (catchError) {
            toastCatchError(catchError)
        }
    }

    const getCurrentUserDbEntry = async (user) => {
        const userDbDoc = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userDbDoc)

        if (userDoc.exists()) {
            const userData = userDoc.data()
            setCurrentUser(userData)
        } else if (
            typeof locationState !== 'undefined' &&
            typeof locationState.isNew !== 'undefined' &&
            locationState.isNew
        ) {
            getCurrentUserDbEntry(user)
        } else {
            toastCatchError(
                'Could not find user in database. Please reload page. If the problem persists please contact site administrator'
            )
        }
    }

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                getCurrentUserDbEntry(user)
            } else {
                setCurrentUser(user)
            }
        })
        setLoading(false)
    }, [])

    // store is passed to context provider
    const store = {
        loading,
        setLoading,
        formatDateString,
        isoDateString,
        toasts,
        setToasts,
        modalState,
        setModalState,
        modalContent,
        setModalContent,
        toggleModal,
        currentUser,
        usernameCheck,
        signup,
        signin,
        signout,
        resetPassword,
        updatePassword,
        getProfileData,
        updateProfilePicture,
        deleteProfile,
        toastCatchError,
        urlReplace,
    }

    return <Context.Provider value={{ store }}>{children}</Context.Provider>
}

export default StoreContext
