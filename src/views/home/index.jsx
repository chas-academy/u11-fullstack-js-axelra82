import React, { useContext } from 'react'
import StoreContext from '../../context/StoreContext'
import CreatPostComponent from '../../components/create-post'

const HomeView = () => {
    const { currentUser } = useContext(StoreContext)

    return (
        <>
            {currentUser && <CreatPostComponent />}
            PUBLIC POSTS LIST
        </>
    )
}

export default HomeView
