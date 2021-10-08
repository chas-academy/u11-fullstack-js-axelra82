/* eslint-disable react/prop-types */
import React from 'react'
import { Form } from 'react-bootstrap'

const ProfileUpdateUsernameComponent = ({
    props: {
        username,
        usernameRef,
        onInputchange,
        inputCharCounter,
        showUsernameCharCounter,
        setShowUsernameCharCounter,
        InvalidHelperComponent,
        inputEmptyWarning,
    },
}) => {
    const usernameMaxLength = 50

    return (
        <Form.Group id="username" className="mt-3">
            <Form.Label className="text-muted w-100 d-flex">
                Username
                {showUsernameCharCounter && (
                    <small className="ms-auto">
                        <span>{inputCharCounter(usernameRef)}</span> / {usernameMaxLength}
                    </small>
                )}
            </Form.Label>
            <Form.Control
                name="username"
                type="text"
                ref={usernameRef}
                placeholder="username"
                aria-placeholder="username"
                onChange={() => onInputchange(usernameRef)}
                onFocus={() => setShowUsernameCharCounter(!showUsernameCharCounter)}
                onBlur={() => setShowUsernameCharCounter(!showUsernameCharCounter)}
                defaultValue={username}
                isInvalid={inputEmptyWarning(usernameRef)}
                required
            />
            {inputEmptyWarning(usernameRef) && (
                <InvalidHelperComponent message="username can't be empty" />
            )}
        </Form.Group>
    )
}

export default ProfileUpdateUsernameComponent
