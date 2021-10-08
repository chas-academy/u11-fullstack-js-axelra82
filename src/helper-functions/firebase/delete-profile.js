/* eslint-disable no-undef */
const deleteProfile = async (
    auth,
    uid,
    history,
    toggleModal,
    modalState,
    setModalState,
    setModalContent,
    toasts,
    setToasts,
    toastCatchError
) => {
    try {
        toggleModal(modalState, setModalState, setModalContent)
        auth.signOut()
        history.push('/')

        await fetch(`${process.env.REACT_APP_WEB_API}/user/delete/${uid}`, {
            method: 'delete',
        })
    } catch (errorMessage) {
        toastCatchError(toasts, setToasts, errorMessage)
    }
}

export default deleteProfile
