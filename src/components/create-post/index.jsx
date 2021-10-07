/* eslint-disable react/prop-types */
import React, { useContext, useState, useRef } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import UserProfilePicture from '../user/profile-picture'
import { displayFunctions } from '../../helper-functions'
import StoreContext from '../../context/StoreContext'

const CreatPostComponent = ({ classes = '', isModal = false }) => {
    const {
        store: {
            currentUser,
            modalState,
            setModalState,
            setModalContent,
            posts,
            setPosts,
            postActiontoggle,
            setPostActiontoggle,
        },
    } = useContext(StoreContext)

    const { toggleModal } = displayFunctions

    const [hasContent, setHasContent] = useState(false)
    const inputRef = useRef()

    const checkInput = (getCurrent = false) => {
        const { current } = inputRef
        if (current) {
            const { textContent } = current
            if (getCurrent) {
                return current
            }
            return textContent
        }
        return false
    }

    const handleInputChange = () => {
        const input = checkInput()
        if (!hasContent) {
            setHasContent(true)
        }
        if (!input) {
            setHasContent(false)
        }
    }

    const createPost = async () => {
        const input = checkInput(true)
        if (input) {
            // eslint-disable-next-line no-undef
            const response = await fetch(`${process.env.REACT_APP_WEB_API}/post/create`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: currentUser.uid,
                    content: input.textContent,
                }),
            })

            const responseData = await response.json()
            if (response.status === 201) {
                setPosts([responseData, ...posts])
                setPostActiontoggle([
                    ...postActiontoggle,
                    { id: postActiontoggle.length + 1, state: false },
                ])
            }

            // reset fake input text
            input.textContent = ''

            if (isModal) {
                toggleModal(modalState, setModalState, setModalContent)
            }
            setHasContent(false)
        }
    }

    return (
        <Row className={`py-3 px-4 g-0 ${classes}`}>
            <Col xs={1}>
                <UserProfilePicture classes="w-100" />
            </Col>
            <Col xs={11}>
                <Row>
                    <Col>
                        <div className="position-relative ms-3">
                            <div
                                className={`text-muted position-absolute ${
                                    hasContent ? 'd-none' : ''
                                }`}
                            >
                                What&apos;s on your mind?
                            </div>
                            <div
                                contentEditable
                                ref={inputRef}
                                role="textbox"
                                tabIndex={0}
                                onSelect={handleInputChange}
                                onBlur={handleInputChange}
                                onFocus={handleInputChange}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            disabled={!hasContent}
                            onClick={createPost}
                            className="rounded-pill float-end px-4 mt-2"
                            size="sm"
                        >
                            Tweet
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default CreatPostComponent
