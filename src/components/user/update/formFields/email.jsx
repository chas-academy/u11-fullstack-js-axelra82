/* eslint-disable react/prop-types */
import React from 'react'
import { Form } from 'react-bootstrap'

const ProfileUpdateEmailComponent = ({
    props: {
        email,
        emailRef,
        onInputchange,
        inputCharCounter,
        showEmailCharCounter,
        setShowEmailCharCounter,
        InvalidHelperComponent,
        inputEmptyWarning,
    },
}) => {
    const emailMaxLength = 100

    return (
        <Form.Group id="email" className="mt-3">
            <Form.Label className="text-muted w-100 d-flex">
                Email
                {showEmailCharCounter && (
                    <small className="ms-auto">
                        <span>{inputCharCounter(emailRef)}</span> / {emailMaxLength}
                    </small>
                )}
            </Form.Label>
            <Form.Control
                name="email"
                type="email"
                ref={emailRef}
                placeholder="your@email.com"
                aria-placeholder="your@email.com"
                onChange={() => onInputchange(emailRef)}
                onFocus={() => setShowEmailCharCounter(!showEmailCharCounter)}
                onBlur={() => setShowEmailCharCounter(!showEmailCharCounter)}
                defaultValue={email}
                isInvalid={inputEmptyWarning(emailRef)}
                required
            />
            {inputEmptyWarning(emailRef) && (
                <InvalidHelperComponent message="email can't be empty" />
            )}
        </Form.Group>
    )
}

export default ProfileUpdateEmailComponent
