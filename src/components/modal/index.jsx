import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import StoreContext from '../../context/StoreContext'

const ModalComponent = () => {
    const {
        store: { modalState, toggleModal, modalContent },
    } = useContext(StoreContext)

    const { classes, header, body, footer } = modalContent
    const { show: showHeader, title, content: headerContent } = header
    const { show: showFooter, buttons } = footer

    return (
        <>
            <Modal show={modalState} onHide={toggleModal} centered fullscreen="md-down">
                <span className={classes}>
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
                                    const { variant, text, action = null } = button
                                    return (
                                        <Button
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={`modal-footer-button-${index}`}
                                            variant={variant}
                                            onClick={action}
                                        >
                                            {text}
                                        </Button>
                                    )
                                })}
                        </Modal.Footer>
                    )}
                </span>
            </Modal>
        </>
    )
}

export default ModalComponent
