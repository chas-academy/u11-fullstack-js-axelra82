/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// hook based store
// pass detached states

import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { displayFunctions, firebaseFunctions } from '../helper-functions'
import LoadingComponent from '../components/loading'
import Context from '../context/StoreContext'

const StoreContext = ({ children }) => {
    const { defaultModalContent, toastCatchError } = displayFunctions
    const { getCurrentUserDoc } = firebaseFunctions

    // global states
    const [currentUser, setCurrentUser] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [postActiontoggle, setPostActiontoggle] = useState([])
    const [toasts, setToasts] = useState([])
    const [modalState, setModalState] = useState(false)
    const [modalContent, setModalContent] = useState(defaultModalContent)
    const [isSaveButtonDisabled, setISaveButtonDisabled] = useState(true)
    const [saveButtonAction, setSaveButtonAction] = useState(() => {})

    // initialize firebase app
    const app = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
    })
    // create global auth and db variables
    const auth = getAuth()
    const db = getFirestore(app)
    const storage = getStorage()

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await getCurrentUserDoc(
                    db,
                    user,
                    setCurrentUser,
                    setIsAdmin,
                    toastCatchError,
                    toasts,
                    setToasts
                )
            } else {
                setCurrentUser(user)
                setIsAdmin(false)
            }
            setLoading(false)
        })
        console.log('useeffect in StoreContext')
    }, [])

    // store is passed to context provider
    const store = {
        auth,
        db,
        storage,
        currentUser,
        setCurrentUser,
        isAdmin,
        loading,
        setLoading,
        posts,
        setPosts,
        postActiontoggle,
        setPostActiontoggle,
        toasts,
        setToasts,
        modalState,
        setModalState,
        modalContent,
        setModalContent,
        isSaveButtonDisabled,
        setISaveButtonDisabled,
        saveButtonAction,
        setSaveButtonAction,
    }

    return (
        <Context.Provider value={{ store }}>
            {loading ? <LoadingComponent /> : children}
        </Context.Provider>
    )
}

export default StoreContext
