/* eslint-disable no-undef */
import React, { useContext, useState, useEffect } from 'react'
import CreatPostComponent from '../../components/create-post'
import PostListComponent from '../../components/post-list'
import StoreContext from '../../context/StoreContext'

const HomeView = () => {
    const {
        store: { currentUser, setPosts, setPostActiontoggle },
    } = useContext(StoreContext)

    const [loading, setLoading] = useState()

    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_WEB_API}/posts/list`)
        if (response.status === 200) {
            const postsJson = await response.json()
            setPosts(postsJson)
            setPostActiontoggle(
                postsJson.map((_, index) => {
                    return { id: index, state: false }
                })
            )
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

            <PostListComponent loading={loading} />
        </>
    )
}

export default HomeView
