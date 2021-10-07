/* eslint-disable react/prop-types */
import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingComponent = ({ messageTop = false, messageBottom = false }) => {
    return (
        <section className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className="my-3 w-100 text-center">{messageTop}</div>
            <Spinner animation="grow" variant="primary" />
            <div className="my-3 w-100 text-center">{messageBottom}</div>
        </section>
    )
}

export default LoadingComponent
