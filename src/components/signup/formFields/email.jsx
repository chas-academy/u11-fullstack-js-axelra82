/* eslint-disable react/prop-types */
import React from 'react'
import { Form } from 'react-bootstrap'

const SignupEmailFieldComponent = ({ props: { emailRef } }) => {
    return (
        <Form.Group id="email" className="mt-1">
            <Form.Label className="text-muted">Email</Form.Label>
            <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder="your@email.com"
                aria-placeholder="your@email.com"
            />
        </Form.Group>
    )
}

export default SignupEmailFieldComponent
