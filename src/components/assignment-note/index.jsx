import React from 'react'
import { Card } from 'react-bootstrap'
import { ArrowExternalIcon } from '../icons'

// eslint-disable-next-line react/prop-types
const AssignmentNoteComponent = ({ page = '', link = '', url = '' }) => {
    return (
        <Card bg="dark" text="white" className="mb-3">
            <Card.Body>
                <h3>NOTE!</h3>
                <p>
                    This is a &ldquo;{page} placeholder&rdquo; page for a school assignment and has
                    no legal standing. The content of this page is an excerpt from{' '}
                    <a href={url} target="_blank" rel="noreferrer">
                        {link} <ArrowExternalIcon color="white" />
                    </a>
                </p>
            </Card.Body>
        </Card>
    )
}

export default AssignmentNoteComponent
