/* eslint-disable no-unused-vars */
import { deleteUser } from 'firebase/auth'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, listAll, deleteObject } from 'firebase/storage'
import signin from './signin'

const deleteProfile = async (
    auth,
    db,
    storage,
    password,
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
        // get fresh user credentials
        const credentials = await signin(auth, auth.currentUser.email, password)
        const { user } = credentials
        const userUid = user.uid

        // move to home view and reset modal
        history.push('/')
        toggleModal(modalState, setModalState, setModalContent)

        // delete user db entries
        await deleteDoc(doc(db, 'users', userUid))

        // delete user from auth
        await deleteUser(user)

        // delete users storage files
        const deleteFile = async (refPath) => {
            const objectRef = ref(storage, refPath)
            await deleteObject(objectRef)
        }

        const deleteFolderRecursive = async (deletePath) => {
            const deleteRef = ref(storage, deletePath)
            const deleteList = await listAll(deleteRef)

            deleteList.items.forEach(async (fileRef) => {
                await deleteFile(fileRef)
            })

            deleteList.prefixes.forEach(async (folderRef) => {
                await deleteFolderRecursive(folderRef)
            })
        }

        await deleteFolderRecursive(`users/${userUid}`)
    } catch (errorMessage) {
        toastCatchError(toasts, setToasts, errorMessage)
    }
}

export default deleteProfile
