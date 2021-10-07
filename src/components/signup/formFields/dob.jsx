/* eslint-disable react/prop-types */
import React from 'react'
import { Form } from 'react-bootstrap'

const SignupDobFieldComponent = ({ props: { dobRef, setDobTouch, dobTouch } }) => {
    return (
        <Form.Group id="dob" className="mt-1">
            <Form.Label className="text-muted">Date of birth</Form.Label>
            <Form.Control
                type="text"
                placeholder="year-month-day"
                required
                ref={dobRef}
                onKeyPress={() => setDobTouch(true)}
                onFocus={(e) => {
                    const { target } = e
                    target.type = 'date'
                    target.defaultValue = '1980-01-01'
                }}
                onBlur={(e) => {
                    const { target } = e
                    if (!dobTouch) {
                        target.type = 'text'
                        target.defaultValue = ''
                        target.placeholder = 'year-month-day'
                    }
                }}
            />
        </Form.Group>
    )
}

export default SignupDobFieldComponent
