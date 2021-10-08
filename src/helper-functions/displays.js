const defaultModalContent = {
    fullscreen: 'md-down',
    classes: null,
    actions: null,
    header: { show: false, title: null, content: null },
    body: null,
    footer: { show: false, buttons: [] },
}

const toggleModal = (modalState, setModalState, setModalContent, withTimeOut = true) => {
    setModalState(!modalState)
    // use timeout to make content transition more pleasing
    if (withTimeOut) {
        setTimeout(() => {
            // we need to reset the modal content for future use
            // eslint-disable-next-line no-unused-expressions
            modalState && setModalContent(defaultModalContent)
        }, 350)
    } else {
        setModalContent(defaultModalContent)
    }
}

const toastCatchError = (toasts, setToasts, errorMessage) => {
    const messageString =
        typeof errorMessage === 'string'
            ? errorMessage
            : errorMessage.message.replace(/.*\/((.*)\))/gi, '$2').replace(/-/gi, ' ')
    return setToasts([
        ...toasts,
        {
            header: 'Error',
            body: messageString,
            variant: 'danger',
        },
    ])
}

export { defaultModalContent, toggleModal, toastCatchError }
