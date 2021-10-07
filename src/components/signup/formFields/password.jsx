/* eslint-disable react/prop-types */
import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

const SignupPasswordFieldComponent = ({ props: { passwordRef, passwordConfirmRef } }) => {
    return (
        <Row>
            <Form.Label className="text-muted mt-1">Password</Form.Label>
            <Form.Group id="password" as={Col}>
                <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                    placeholder="minimum 6 character"
                    aria-placeholder="minimum 6 character"
                />
            </Form.Group>

            <Form.Group id="password-confirm" as={Col}>
                <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                    placeholder="confirm password"
                    aria-placeholder="confirm password"
                />
            </Form.Group>
        </Row>
    )
}

export default SignupPasswordFieldComponent
