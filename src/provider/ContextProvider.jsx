/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// hook based store
// pass detached states

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
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
    Timestamp,
} from 'firebase/firestore'
import Context from '../context/StoreContext'

const StoreContext = ({ children }) => {
    const defaultModalContent = {
        header: { show: false, title: '', content: '' },
        body: '',
        footer: { show: false, buttons: [] },
    }

    const history = useHistory()
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [toasts, setToasts] = useState([])
    const [modalState, setModalState] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [modalContent, setModalContent] = useState(defaultModalContent)

    const toggleModal = () => {
        setModalState(!modalState)
        // use timeout to make content transition more pleasing
        setTimeout(() => {
            // we need to reset the modal content for future use
            // eslint-disable-next-line no-unused-expressions
            modalState && setModalContent(defaultModalContent)
        }, 350)
    }

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

    const usernameLookUp = (table, username) => {
        // look for users where username matches
        const getTable = collection(db, table)
        const usernameMatch = query(getTable, where('username', '==', username))
        return getDocs(usernameMatch)
    }

    // always make sure username is unique
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

    const signup = async (dob, email, nameFirst, nameLast, password, profilePicture, username) => {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: `${nameFirst} ${nameLast}` })
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
            bio: '',
            dob: Timestamp.fromDate(new Date(dob)),
            email,
            website: '',
            name: { first: nameFirst, last: nameLast },
            profilePicture,
            username,
            user_type: doc(db, 'user_types', 'registered'),
        })
    }

    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signout = () => {
        auth.signOut()
        history.push('/signin')
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password)
    }

    const updateProfilePicture = (image) => {
        return 'ok'
    }

    const getPublicProfile = async (publicProfileUsername) => {
        setLoading(true)

        let publicProfile = null
        const querySnapshot = await usernameLookUp('users', publicProfileUsername)

        if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach((docMatch) => {
                publicProfile = docMatch.data()
            })
        }

        setLoading(false)

        return publicProfile
    }

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDbDoc = doc(db, 'users', user.uid)
                const userDoc = await getDoc(userDbDoc)

                if (userDoc.exists()) {
                    const userData = userDoc.data()
                    const {
                        bio,
                        dob,
                        email,
                        name: { first, last },
                        profilePicture,
                        username,
                        website,
                    } = userData

                    setCurrentUser({
                        bio,
                        dob,
                        email,
                        name: `${first} ${last}`,
                        profilePicture,
                        username,
                        website,
                    })
                } else {
                    setToasts([
                        ...toasts,
                        {
                            header: 'Error',
                            body: 'Could not find user in database. Please reload page. If the problem persists please contact site administrator',
                            variant: 'danger',
                        },
                    ])
                }
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
        toasts,
        setToasts,
        modalState,
        setModalState,
        modalContent,
        setModalContent,
        toggleModal,
        isSignUp,
        setIsSignUp,
        currentUser,
        usernameCheck,
        signup,
        signin,
        signout,
        resetPassword,
        updatePassword,
        getPublicProfile,
    }

    return <Context.Provider value={{ store }}>{children}</Context.Provider>
}

export default StoreContext
