/* eslint-disable react/prop-types */
import React from 'react'
import { Form } from 'react-bootstrap'

const ProfileUpdateWebsiteComponent = ({
    props: {
        website,
        websiteRef,
        onInputchange,
        inputCharCounter,
        showWebsiteCharCounter,
        setShowWebsiteCharCounter,
    },
}) => {
    const websiteMaxLength = 100

    return (
        <Form.Group id="website" className="mt-3">
            <Form.Label className="text-muted w-100 d-flex">
                Website
                {showWebsiteCharCounter && (
                    <small className="ms-auto">
                        <span>{inputCharCounter(websiteRef)}</span> / {websiteMaxLength}
                    </small>
                )}
            </Form.Label>
            <Form.Control
                name="website"
                type="website"
                ref={websiteRef}
                placeholder="yourwebsite.com"
                aria-placeholder="yourwebsite.com"
                onChange={() => onInputchange(websiteRef)}
                onFocus={() => setShowWebsiteCharCounter(!showWebsiteCharCounter)}
                onBlur={() => setShowWebsiteCharCounter(!showWebsiteCharCounter)}
                defaultValue={website}
            />
        </Form.Group>
    )
}

export default ProfileUpdateWebsiteComponent
