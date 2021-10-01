/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import StoreContext from '../../context/StoreContext'

const FormOptionsComponent = ({ options }) => {
    const {
        store: { modalState, toggleModal },
    } = useContext(StoreContext)

    const history = useHistory()

    const { action = '', route = '', message = '' } = options

    const closeModalRedirect = (reroute) => {
        toggleModal()
        history.push(reroute)
    }

    return (
        <section className="mt-3">
            <small className="d-block w-100 text-center mt-1">
                {message}{' '}
                {modalState ? (
                    <Button
                        className="align-baseline"
                        variant="link"
                        onClick={() => closeModalRedirect(`/${route}`)}
                    >
                        <small>{action}</small>
                    </Button>
                ) : (
                    <Link to={`/${route}`}>{action}</Link>
                )}
            </small>

            <small className="d-block w-100 text-center mt-1">
                Continue without an account?{' '}
                {modalState ? (
                    <Button
                        className="align-baseline"
                        variant="link"
                        onClick={() => closeModalRedirect('/')}
                    >
                        <small>Browse</small>
                    </Button>
                ) : (
                    <Link to="/">Browse</Link>
                )}
            </small>
        </section>
    )
}

export default FormOptionsComponent
