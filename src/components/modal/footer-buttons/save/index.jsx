/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import StoreContext from '../../../../context/StoreContext'

const ModalFooterSaveButton = ({ text }) => {
    const {
        store: { saveButtonAction, isSaveButtonDisabled },
    } = useContext(StoreContext)

    return (
        <Button variant="primary" onClick={saveButtonAction} disabled={isSaveButtonDisabled}>
            {text}
        </Button>
    )
}

export default ModalFooterSaveButton
