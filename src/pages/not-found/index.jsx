import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import PreviousPage from '../../components/previous-page'
import Emoji from '../../components/emoji'

const NotFound = () => {
    return (
        <Container className="d-flex w-100 mt-5 align-content-center justify-content-center">
            <Card as="article" className="card-max-550">
                <PreviousPage classes="mt-1" />
                <Card.Body>
                    <h1>
                        The 404 sadness <Emoji emoji="😞" />
                    </h1>
                    <p>
                        It looks like your trying to access a page that doesn&apos;t exist
                        anymore... or maybe it was never there to begin with?
                    </p>
                    <p>
                        <strong>What now?</strong>
                    </p>
                    <ul>
                        <li>
                            Either check to make sure that the link is correct and that you have
                            access to it
                        </li>
                        <li>
                            Or head <Link to="/">back to the main page</Link> and go from there
                        </li>
                        <li>
                            If you are certain the link is correct and you still can&apos;t access
                            it, please contact website administrator
                        </li>
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default NotFound
