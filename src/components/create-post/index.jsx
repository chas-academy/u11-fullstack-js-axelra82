import React from 'react'
import UserAvatar from '../user/avatar'
import './style.scss'

const CreatPostComponent = () => {
    return (
        <section className="create-post">
            <UserAvatar fullWidth />
            <input placeholder="What's on your mind?" className="post-content" />
            <button type="button" className="post-button create-post-button">
                Tweet
            </button>
        </section>
    )
}

export default CreatPostComponent
