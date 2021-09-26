import React, { useContext, useRef } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import StoreContext from '../../../context/StoreContext'

const UpdateUserProfileComponent = () => {
    const { store: setLoading } = useContext(StoreContext)
    const nameFirstRef = useRef()
    const nameLastRef = useRef()
    const dobRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    // const [submitError, setsubmitError] = useState('')

    const handleSubmit = () => {
        setLoading(false)
        return <></>
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Form.Label className="text-muted">Name</Form.Label>
                <Form.Group id="name-first" as={Col}>
                    <Form.Control
                        type="text"
                        ref={nameFirstRef}
                        placeholder="first name"
                        aria-placeholder="first name"
                    />
                </Form.Group>

                <Form.Group id="name-last" as={Col}>
                    <Form.Control
                        type="text"
                        ref={nameLastRef}
                        placeholder="last name"
                        aria-placeholder="last name"
                    />
                </Form.Group>
            </Row>

            <Form.Group id="dob" className="mt-1">
                <Form.Label className="text-muted">Date of birth</Form.Label>
                <Form.Control type="date" ref={dobRef} />
            </Form.Group>

            <Form.Group id="email" className="mt-1">
                <Form.Label className="text-muted">Email</Form.Label>
                <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="your@email.com"
                    aria-placeholder="your@email.com"
                />
            </Form.Group>

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
        </Form>
    )
}

export default UpdateUserProfileComponent
