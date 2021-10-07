/* eslint-disable react/prop-types */
import React from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'

const ProfileUpdateNameComponent = ({
    props: {
        firstName,
        lastName,
        firstNameRef,
        lastNameRef,
        onInputchange,
        inputCharCounter,
        showNameCharCounter,
        setShowNameCharCounter,
        InvalidHelperComponent,
        inputEmptyWarning,
    },
}) => {
    const nameMaxLength = 50

    return (
        <Row className="gx-2 mt-3">
            <Form.Label className="text-muted w-100 d-flex">
                Name
                {showNameCharCounter && (
                    <small className="ms-auto">
                        <span>{inputCharCounter(firstNameRef, lastNameRef)}</span> / {nameMaxLength}
                    </small>
                )}
            </Form.Label>

            <Form.Group id="name-first" as={Col}>
                <Form.Label htmlFor="first-name-inline" visuallyHidden>
                    first name
                </Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <small>first</small>
                    </InputGroup.Text>
                    <Form.Control
                        id="first-name-inline"
                        name="name-first"
                        type="text"
                        ref={firstNameRef}
                        placeholder="first name"
                        aria-placeholder="first name"
                        onChange={() => onInputchange(firstNameRef)}
                        onFocus={() => setShowNameCharCounter(!showNameCharCounter)}
                        onBlur={() => setShowNameCharCounter(!showNameCharCounter)}
                        defaultValue={firstName}
                        isInvalid={inputEmptyWarning(firstNameRef)}
                        required
                    />
                    {inputEmptyWarning(firstNameRef) && (
                        <InvalidHelperComponent message="name can't be empty" />
                    )}
                </InputGroup>
            </Form.Group>

            <Form.Group id="name-last" as={Col}>
                <Form.Label htmlFor="last-name-inline" visuallyHidden>
                    last name
                </Form.Label>
                <InputGroup>
                    <InputGroup.Text>
                        <small>last</small>
                    </InputGroup.Text>
                    <Form.Control
                        id="last-name-inline"
                        name="name-last"
                        type="text"
                        ref={lastNameRef}
                        placeholder="last name"
                        aria-placeholder="last name"
                        onChange={() => onInputchange(lastNameRef)}
                        onFocus={() => setShowNameCharCounter(!showNameCharCounter)}
                        onBlur={() => setShowNameCharCounter(!showNameCharCounter)}
                        defaultValue={lastName}
                        isInvalid={inputEmptyWarning(lastNameRef)}
                        required
                    />
                    {inputEmptyWarning(lastNameRef) && (
                        <InvalidHelperComponent message="name can't be empty" />
                    )}
                </InputGroup>
            </Form.Group>
        </Row>
    )
}

export default ProfileUpdateNameComponent
