/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// hook based store
// pass detached states

import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth'
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import Context from '../context/StoreContext'

const StoreContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

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

    const signup = async (email, password, nameFirst, nameLast) => {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: `${nameFirst} ${nameLast}` })
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
            name: { first: nameFirst, last: nameLast },
            email: auth.currentUser.email,
        })
    }

    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const updatePassword = (password) => {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    // store is passed to context provider
    const store = {
        currentUser,
        signup,
        signin,
        signout,
        resetPassword,
        updatePassword,
    }

    return <Context.Provider value={{ store }}>{!loading && children}</Context.Provider>
}

export default StoreContext
