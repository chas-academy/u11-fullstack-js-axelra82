/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import StoreContext from '../../../../context/StoreContext'

const ProfileUpdateNameComponent = ({
    props: {
        nameFirstRef,
        nameLastRef,
        onInputchange,
        inputCharCounter,
        showNameCharCounter,
        setShowNameCharCounter,
        InvalidHelperComponent,
        inputEmptyWarning,
    },
}) => {
    const {
        store: {
            currentUser: {
                name: { first: firstName, last: lastName },
            },
        },
    } = useContext(StoreContext)

    const nameMaxLength = 50

    return (
        <Row className="gx-2 mt-3">
            <Form.Label className="text-muted w-100 d-flex">
                Name
                {showNameCharCounter && (
                    <small className="ms-auto">
                        <span>{inputCharCounter(nameFirstRef, nameLastRef)}</span> / {nameMaxLength}
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
                        ref={nameFirstRef}
                        placeholder="first name"
                        aria-placeholder="first name"
                        onChange={() => onInputchange(nameFirstRef)}
                        onFocus={() => setShowNameCharCounter(!showNameCharCounter)}
                        onBlur={() => setShowNameCharCounter(!showNameCharCounter)}
                        defaultValue={firstName}
                        isInvalid={inputEmptyWarning(nameFirstRef)}
                        required
                    />
                    {inputEmptyWarning(nameFirstRef) && (
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
                        ref={nameLastRef}
                        placeholder="last name"
                        aria-placeholder="last name"
                        onChange={() => onInputchange(nameLastRef)}
                        onFocus={() => setShowNameCharCounter(!showNameCharCounter)}
                        onBlur={() => setShowNameCharCounter(!showNameCharCounter)}
                        defaultValue={lastName}
                        isInvalid={inputEmptyWarning(nameLastRef)}
                        required
                    />
                    {inputEmptyWarning(nameLastRef) && (
                        <InvalidHelperComponent message="name can't be empty" />
                    )}
                </InputGroup>
            </Form.Group>
        </Row>
    )
}

export default ProfileUpdateNameComponent
