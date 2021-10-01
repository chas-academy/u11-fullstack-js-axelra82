/* eslint-disable react/prop-types */
import React from 'react'
import { Form, Button } from 'react-bootstrap'

const ProfileUpdatePasswordComponent = ({
    props: {
        currentPasswordRef,
        validateCurrentUser,
        newPasswordRef,
        newPasswordConfirmRef,
        canChangePassword,
        changePassword,
        setChangePassword,
    },
}) => {
    return (
        <Form.Group className={`gx-1 ${changePassword ? '' : 'd-flex'}`}>
            <Form.Label className="text-muted m-0 mt-3">Password</Form.Label>

            {changePassword ? (
                <>
                    {!canChangePassword ? (
                        <>
                            <Form.Group id="current-password" className="mt-2">
                                <Form.Control
                                    name="current-password"
                                    type="password"
                                    ref={currentPasswordRef}
                                    placeholder="current password"
                                    aria-placeholder="current password"
                                />
                            </Form.Group>
                            <Button onClick={validateCurrentUser} className="mt-3">
                                Validate
                            </Button>
                        </>
                    ) : (
                        <>
                            <Form.Group id="new-password" className="mt-2">
                                <Form.Control
                                    name="new-password"
                                    type="password"
                                    ref={newPasswordRef}
                                    required
                                    placeholder="new password"
                                    aria-placeholder="new password"
                                />
                            </Form.Group>

                            <Form.Group id="confirm-new-password" className="mt-2">
                                <Form.Control
                                    name="confirm-new-password"
                                    type="password"
                                    ref={newPasswordConfirmRef}
                                    required
                                    placeholder="confirm new password"
                                    aria-placeholder="confirm new password"
                                />
                            </Form.Group>
                        </>
                    )}
                </>
            ) : (
                <Button
                    className="text-start align-self-end ps-1"
                    variant="link"
                    onClick={() => setChangePassword(true)}
                >
                    <small> · change</small>
                </Button>
            )}
        </Form.Group>
    )
}

export default ProfileUpdatePasswordComponent
