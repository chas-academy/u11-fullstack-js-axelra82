/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect } from 'react'
import { ToastContainer, Toast } from 'react-bootstrap'
import StoreContext from '../../context/StoreContext'

const ToastComponent = () => {
    const {
        store: { toasts, setToasts },
    } = useContext(StoreContext)
    const toastDelay = 4000

    const closeToast = (index = 0) => {
        if (toasts.length === 1) {
            setToasts(toasts.filter((value) => value !== undefined))
        }

        setToasts(toasts.length === 1 ? [] : toasts.splice(index, 1, undefined))
    }

    useEffect(() => {
        // autohide bug, make sure to remove last toast
        if (toasts.length === 1) {
            setTimeout(() => {
                setToasts([])
            }, toastDelay)
        }
    }, [toasts])

    return (
        <ToastContainer className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
            {toasts &&
                toasts.map((toast, index) => {
                    const { header, body, variant } = toast

                    return (
                        <Toast
                            key={`toast-${index}-${header}${variant ? `-${variant}` : ''}`}
                            onClose={() => closeToast(index)}
                            show
                            delay={toastDelay}
                            autohide
                        >
                            <Toast.Header className="text-black" closeButton={false}>
                                <strong className="me-auto">{header}</strong>
                            </Toast.Header>
                            <Toast.Body className={variant !== '' ? `text-${variant}` : ''}>
                                {body}
                            </Toast.Body>
                        </Toast>
                    )
                })}
        </ToastContainer>
    )
}

export default ToastComponent
