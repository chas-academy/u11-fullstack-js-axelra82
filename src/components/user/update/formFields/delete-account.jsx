/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import StoreContext from '../../../../context/StoreContext'

const DeleteAccountComponent = ({
    props: { showDeletePrompt, setShowDeletePrompt, deleteConfirmPasswordRef },
}) => {
    const {
        store: { deleteProfile },
    } = useContext(StoreContext)

    const handleDeleteAccount = async () => {
        if (showDeletePrompt && deleteConfirmPasswordRef.current.value) {
            deleteProfile(deleteConfirmPasswordRef.current.value)
        }
    }

    return (
        <Row className="border-top mt-3">
            <Button
                className="text-danger mt-3"
                variant="link"
                onClick={() => setShowDeletePrompt(!showDeletePrompt)}
            >
                Delete account
            </Button>

            {showDeletePrompt && (
                <div className="alert text-muted">
                    <p>
                        <strong className="text-black">WARNING</strong> This can not be undone. All
                        your files and posts will be lost forever.
                    </p>
                    <p>
                        <small>Enter your password bellow to delete your account</small>
                    </p>
                    <Form.Group id="delete-account" className="mt-2">
                        <Form.Control
                            name="delete-account"
                            type="password"
                            ref={deleteConfirmPasswordRef}
                            required
                            placeholder="enter password"
                            aria-placeholder="enter password"
                        />
                    </Form.Group>
                    <Button className="mt-3" variant="outline-danger" onClick={handleDeleteAccount}>
                        I&apos;m sure
                    </Button>
                </div>
            )}
        </Row>
    )
}

export default DeleteAccountComponent
