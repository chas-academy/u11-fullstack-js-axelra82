/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'
import { Row, Col, Button } from 'react-bootstrap'
import UserProfilePicture from '../user/profile-picture'
import { dateFunctions } from '../../helper-functions'
import StoreContext from '../../context/StoreContext'

const PostListComponent = () => {
    const {
        store: { currentUser, posts, setPosts },
    } = useContext(StoreContext)

    const { username: userUsername } = currentUser || {}

    const { formatDateString } = dateFunctions

    const deletePost = async (postId, index) => {
        showPostActions(index)
        const response = await fetch(`${process.env.REACT_APP_WEB_API}/post/delete/${postId}`, {
            method: 'delete',
        })
        if (response.status === 200) {
            const updatedPosts = posts.filter((_, postIndex) => postIndex !== index)
            setPosts(updatedPosts)
        }
    }

    return posts && posts.length > 0 ? (
        posts.map((post, index) => {
            const { id, data } = post
            const {
                content,
                createdAt,
                user: { name, username, picture },
            } = data
            const { _seconds: millis } = createdAt
            const createdDate = formatDateString(Timestamp.fromMillis(millis * 1000).toDate())
            return (
                <article className="px-3 py-4 border-bottom" key={`public-post-list-${id}`}>
                    <Row className="gx-0">
                        <Col xs={1}>
                            <UserProfilePicture classes="w-100" source={picture} />
                        </Col>
                        <Col xs={11} className="ps-3">
                            <section className="position-relative d-flex mb-2">
                                <strong className="fs-5 me-2 lh-1">{name}</strong>
                                <Link to={`/${username}`}>
                                    <small className="me-2 text-muted text-decoration-underline">
                                        @{username}
                                    </small>
                                </Link>
                                <small className="text-muted">{createdDate}</small>
                                {userUsername === username && (
                                    <Button
                                        variant="outline-danger"
                                        className="position-absolute top-0 end-0 mt-0 px-3 py-1"
                                        onClick={() => deletePost(id, index)}
                                    >
                                        delete
                                    </Button>
                                )}
                            </section>
                            {content}
                        </Col>
                    </Row>
                </article>
            )
        })
    ) : (
        <article className="px-3 py-4 text-center align-content-center">
            <p>
                <strong>There are no public posts at the moment.</strong>
            </p>
            {currentUser ? (
                <p>Be the first to write something!</p>
            ) : (
                <p>
                    If you <Link to="/signup">signup</Link> you can be the first to write something!
                </p>
            )}
        </article>
    )
}

export default PostListComponent
