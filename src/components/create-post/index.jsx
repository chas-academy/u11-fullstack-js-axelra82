import React from 'react'
import UserProfilePicture from '../user/profile-picture'
import './style.scss'

const CreatPostComponent = () => {
    return (
        <section className="create-post">
            <UserProfilePicture />
            <input placeholder="What's on your mind?" className="post-content" />
            <button type="button" className="post-button create-post-button">
                Tweet
            </button>
        </section>
    )
}

export default CreatPostComponent
