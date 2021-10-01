/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { SaveButton, CancelButton } from './footer-buttons'
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
                                    const { type, text } = button

                                    switch (type) {
                                        case 'save':
                                            return (
                                                <SaveButton
                                                    key={`modal-footer-button-${index}`}
                                                    text={text}
                                                />
                                            )
                                        case 'cancel':
                                            return (
                                                <CancelButton
                                                    key={`modal-footer-button-${index}`}
                                                />
                                            )

                                        default:
                                            return <></>
                                    }
                                })}
                        </Modal.Footer>
                    )}
                </span>
            </Modal>
        </>
    )
}

export default ModalComponent
