/* eslint-disable react/prop-types */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { isoDateString } from '../../../../helper-functions/dates'

const ProfileUpdateDobComponent = ({
    props: { dob, dobRef, onInputchange, changeDob, setChangeDob },
}) => {
    return (
        <Form.Group>
            <Form.Label className="text-muted m-0 mt-3">Date of birth</Form.Label>

            {changeDob ? (
                <>
                    <Form.Group id="dob" className="mt-3">
                        <Form.Control
                            name="dob"
                            type="date"
                            ref={dobRef}
                            onChange={onInputchange}
                            defaultValue={isoDateString(dob)}
                        />
                    </Form.Group>
                </>
            ) : (
                <>
                    <Button
                        className="text-start align-self-end ps-1 align-baseline"
                        variant="link"
                        onClick={() => {
                            alert('You can only do this a couple of times!')
                            setChangeDob(true)
                        }}
                    >
                        <small> · change</small>
                    </Button>

                    <div className="fs-5">{dob}</div>
                </>
            )}
        </Form.Group>
    )
}

export default ProfileUpdateDobComponent
