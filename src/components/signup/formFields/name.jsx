/* eslint-disable react/prop-types */
import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

const SignupNameFieldComponent = ({ props: { firstNameRef, lastNameRef } }) => {
    return (
        <Row>
            <Form.Label className="text-muted">Name</Form.Label>
            <Form.Group id="name-first" as={Col}>
                <Form.Control
                    type="text"
                    ref={firstNameRef}
                    required
                    placeholder="first name"
                    aria-placeholder="first name"
                />
            </Form.Group>

            <Form.Group id="name-last" as={Col}>
                <Form.Control
                    type="text"
                    ref={lastNameRef}
                    required
                    placeholder="last name"
                    aria-placeholder="last name"
                />
            </Form.Group>
        </Row>
    )
}

export default SignupNameFieldComponent
