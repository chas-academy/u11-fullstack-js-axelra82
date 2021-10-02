import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { displayFunctions } from '../../../../helper-functions'
import StoreContext from '../../../../context/StoreContext'

const ModalFooterCancelButton = () => {
    const {
        store: { modalState, setModalState, setModalContent },
    } = useContext(StoreContext)

    const { toggleModal } = displayFunctions

    return (
        <Button
            variant="light"
            className="me-4"
            onClick={() => toggleModal(modalState, setModalState, setModalContent)}
        >
            <small>Cancel</small>
        </Button>
    )
}

export default ModalFooterCancelButton
