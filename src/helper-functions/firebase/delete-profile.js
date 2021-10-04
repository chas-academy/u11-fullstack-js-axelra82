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
        await signin(auth, auth.currentUser.email, password)
        const user = auth.currentUser
        const userUid = user.uid

        // move to home view since user can't be in profile when data is empty
        history.push('/')

        // reset modal
        toggleModal(modalState, setModalState, setModalContent)

        // delete user db entries
        await deleteDoc(doc(db, 'users', userUid))

        // delete users storage file
        const deleteFile = async (refPath) => {
            const objectRef = ref(storage, refPath)
            await deleteObject(objectRef)
        }

        // recursive storage delete function
        // folders can't exist without files
        const deleteRecursive = async (deletePath) => {
            const deleteRef = ref(storage, deletePath)
            const deleteList = await listAll(deleteRef)

            // items are files
            deleteList.items.forEach(async (fileRef) => {
                await deleteFile(fileRef)
            })

            // prefixex are folders
            deleteList.prefixes.forEach(async (folderRef) => {
                await deleteRecursive(folderRef)
            })
        }

        // start storage recursive delete
        await deleteRecursive(`users/${userUid}`)

        // delete user from auth
        await deleteUser(user)
    } catch (errorMessage) {
        toastCatchError(toasts, setToasts, errorMessage)
    }
}

export default deleteProfile
