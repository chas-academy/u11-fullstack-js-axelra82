/* eslint-disable react/prop-types */
import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'

const ProfileUpdateBioComponent = ({
    props: {
        bio,
        bioRef,
        onInputchange,
        inputCharCounter,
        showBioCharCounter,
        setShowBioCharCounter,
    },
}) => {
    const bioMaxLength = 160

    return (
        <Form.Group id="bio" className="mt-3">
            <Form.Label className="text-muted w-100 d-flex">
                Bio
                {showBioCharCounter && (
                    <small className="ms-auto">
                        <span>{inputCharCounter(bioRef)}</span> / {bioMaxLength}
                    </small>
                )}
            </Form.Label>
            <FloatingLabel controlId="bio" label="About you">
                <Form.Control
                    as="textarea"
                    name="bio"
                    ref={bioRef}
                    placeholder="About you"
                    aria-placeholder="About you"
                    onChange={() => onInputchange(bioRef)}
                    onFocus={() => setShowBioCharCounter(!showBioCharCounter)}
                    onBlur={() => setShowBioCharCounter(!showBioCharCounter)}
                    defaultValue={bio}
                    maxLength={bioMaxLength}
                    style={{ height: '135px' }}
                />
            </FloatingLabel>
        </Form.Group>
    )
}

export default ProfileUpdateBioComponent
