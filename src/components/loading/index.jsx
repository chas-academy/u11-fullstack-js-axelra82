import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingComponent = () => {
    return (
        <section className="d-flex min-vh-100 align-items-center justify-content-center p-3">
            <Spinner animation="grow" variant="primary" />
        </section>
    )
}

export default LoadingComponent
