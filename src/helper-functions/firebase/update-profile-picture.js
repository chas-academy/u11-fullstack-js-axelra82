import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const updateProfilePicture = async (auth, db, storage, username, fileBlob, fileType) => {
    const userUid = auth.currentUser.uid
    const fileName = `${username}.${fileType}`
    const fileLocation = `users/${userUid}/profile-picture/${fileName}`

    // creat image reference
    const imageRef = ref(storage, fileLocation)

    // await file upload
    const storageRef = await uploadBytes(imageRef, fileBlob)
    const publicFile = await getDownloadURL(storageRef.metadata.ref)

    // update auth user meta data
    await updateProfile(auth.currentUser, { photoURL: publicFile })

    // update user db profile picture entry
    await updateDoc(doc(db, 'users', userUid), {
        profilePicture: publicFile,
    })
}

export default updateProfilePicture
