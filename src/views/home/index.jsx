/* eslint-disable no-undef */
import React, { useContext, useState, useEffect } from 'react'
import CreatPostComponent from '../../components/create-post'
import LoadingComponent from '../../components/loading'
import PostListComponent from '../../components/post-list'
import StoreContext from '../../context/StoreContext'

const HomeView = () => {
    const {
        store: { currentUser, setPosts },
    } = useContext(StoreContext)

    const [loading, setLoading] = useState()

    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_WEB_API}/posts/list`)
        if (response.status === 200) {
            const postsJson = await response.json()
            setPosts(postsJson)
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {currentUser && <CreatPostComponent classes="border-bottom" />}
            {loading ? <LoadingComponent messageBottom="Getting tweets" /> : <PostListComponent />}
        </>
    )
}

export default HomeView
