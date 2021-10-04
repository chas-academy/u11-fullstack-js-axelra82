/* eslint-disable no-unused-vars */
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// username, fileBlob, fileType
const updateUserProfile = async (auth, db, storage, username, data) => {
    const userUid = auth.currentUser.uid

    const filterEmpty = (filterData) => {
        return Object.fromEntries(
            Object.entries(filterData).filter(([key, value]) => {
                if (value) {
                    return { [key]: value }
                }
                return undefined
            })
        )
    }

    // filter out empty values
    const filterFields = filterEmpty(data)

    // handle image update
    if (typeof filterFields.profilePicture !== 'undefined') {
        const imageObject = filterFields.profilePicture
        const { source: fileBlob, type: fileType } = imageObject
        const fileName = `${username}.${fileType}`
        const fileLocation = `users/${userUid}/profile-picture/${fileName}`

        // creat image reference
        const imageRef = ref(storage, fileLocation)

        // // await file upload
        const storageRef = await uploadBytes(imageRef, fileBlob)
        const publicFile = await getDownloadURL(storageRef.metadata.ref)

        // update auth user meta data
        await updateProfile(auth.currentUser, { photoURL: publicFile })
        filterFields.profilePicture = publicFile
    }

    // update user db profile entry
    await updateDoc(doc(db, 'users', userUid), filterFields)
    return true
}

export default updateUserProfile