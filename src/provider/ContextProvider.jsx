/* eslint-disable react/prop-types */
// hook based store
// pass detached states

import React, { useState } from 'react'
import Context from '../context/StoreContext'

const StoreContext = ({ children }) => {
    // states used in global store access

    const [isAuthed, setAuth] = useState(false)

    // store is passed to context provider
    const store = {
        user: {
            isAuthed,
            setAuth,
        },
    }

    return <Context.Provider value={{ store }}>{children}</Context.Provider>
}

export default StoreContext
