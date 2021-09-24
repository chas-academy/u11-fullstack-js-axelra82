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
import { getFirestore, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import Context from '../context/StoreContext'

const StoreContext = ({ children }) => {
    const history = useHistory()
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [isSignUp, setIsSignUp] = useState(false)
    const [modalState, setModalState] = useState(false)
    const defaultModalContent = {
        header: { show: false, title: '', content: '' },
        body: '',
        footer: { show: false, buttons: [] },
    }
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

    const signup = async (nameFirst, nameLast, dob, email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser, { displayName: `${nameFirst} ${nameLast}` })
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
            bio: '',
            dob: Timestamp.fromDate(new Date(dob)),
            email,
            link: '',
            name: { first: nameFirst, last: nameLast },
            handle: email,
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

    useEffect(() => {
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
                        handle,
                        link,
                        name: { first, last },
                    } = userData

                    setCurrentUser({
                        bio,
                        dob,
                        email,
                        handle,
                        link,
                        name: `${first} ${last}`,
                    })
                } else {
                    // eslint-disable-next-line no-alert, no-undef
                    alert(
                        'Could not find user in database. Please reload page. If the problem persists please contact site administrator'
                    )
                }
            } else {
                setCurrentUser(user)
            }
            setLoading(false)
        })
    }, [])

    // store is passed to context provider
    const store = {
        loading,
        setLoading,
        modalState,
        setModalState,
        modalContent,
        setModalContent,
        toggleModal,
        isSignUp,
        setIsSignUp,
        currentUser,
        signup,
        signin,
        signout,
        resetPassword,
        updatePassword,
    }

    return <Context.Provider value={{ store }}>{children}</Context.Provider>
}

export default StoreContext
