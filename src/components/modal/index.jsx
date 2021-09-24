import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import StoreContext from '../../context/StoreContext'

const ModalComponent = () => {
    const {
        store: { modalState, toggleModal, modalContent },
    } = useContext(StoreContext)

    const { header, body, footer } = modalContent
    const { show: showHeader, title, content: headerContent } = header
    const { show: showFooter, buttons } = footer

    return (
        <>
            <Modal show={modalState} onHide={toggleModal} centered>
                {showHeader && (
                    <Modal.Header closeButton>
                        {title && <Modal.Title>{title}</Modal.Title>}
                        {headerContent}
                    </Modal.Header>
                )}
                {body !== '' && <Modal.Body>{body}</Modal.Body>}
                {showFooter && (
                    <Modal.Footer>
                        {buttons.length &&
                            buttons.map((button, index) => {
                                const { variant, text } = button
                                return (
                                    <Button
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={`modal-footer-button-${index}`}
                                        variant={variant}
                                        onClick={toggleModal}
                                    >
                                        {text}
                                    </Button>
                                )
                            })}
                    </Modal.Footer>
                )}
            </Modal>
        </>
    )
}

export default ModalComponent
