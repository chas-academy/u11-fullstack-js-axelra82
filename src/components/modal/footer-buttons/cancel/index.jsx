import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import StoreContext from '../../../../context/StoreContext'

const ModalFooterCancelButton = () => {
    const {
        store: { toggleModal },
    } = useContext(StoreContext)

    return (
        <Button variant="link" className="me-4" onClick={toggleModal}>
            <small>Cancel</small>
        </Button>
    )
}

export default ModalFooterCancelButton
