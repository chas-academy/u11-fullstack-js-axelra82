/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import UserProfilePicture from '../../profile-picture'
import { CameraIcon } from '../../../icons'
import { imageFunctions } from '../../../../helper-functions'
import { updateProfilePicture } from '../../../../helper-functions/firebase'
import StoreContext from '../../../../context/StoreContext'

const ProfileUpdateProfilePictureComponent = ({
    props: { fileInputRef, hasChange, setHasChange, setUploadSource },
}) => {
    const {
        store: { auth, db, storage, currentUser, toastCatchError },
    } = useContext(StoreContext)

    const { username } = currentUser
    const { imageResize } = imageFunctions

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [previewSource, setPreviewSource] = useState()

    const showOpenFileDialog = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = async (input) => {
        const {
            current: { files },
        } = input

        // make sure files exist
        if (files && files.length) {
            const imageFile = files[0]

            // verify type is of image
            const fileType = imageFile.type.replace(/image\//gi, '')
            const allowedTypes = ['jpg', 'jpeg', 'png']

            // verify size in MB
            const fileByteSize = imageFile.size
            const mbSize = fileByteSize / (1024 * 1024).toFixed(2)

            // check requirements
            if (mbSize > 2) {
                toastCatchError('File must be smaller than 2MB')
            } else if (!allowedTypes.includes(fileType)) {
                toastCatchError('Accepted file types are: jpg and png')
            } else {
                if (!hasChange) {
                    setHasChange(true)
                }
                const resizedImage = await imageResize(imageFile)
                const blobToBase64 = () => {
                    return new Promise((resolve) => {
                        const reader = new FileReader()
                        reader.onload = () => resolve(reader.result)
                        reader.readAsDataURL(resizedImage)
                    })
                }
                setIsPreviewImage(true)
                setPreviewSource(await blobToBase64())
                setUploadSource(resizedImage)

                updateProfilePicture(auth, db, storage, username, resizedImage, fileType)
            }
        } else {
            toastCatchError('There are no files')
        }
    }

    return (
        <section className="position-relative d-inline-block bg-black rounded-circle">
            <UserProfilePicture
                style={{
                    opacity: 0.75,
                }}
                classes="w-100"
                isPreview={isPreviewImage}
                previewSource={previewSource}
            />
            <Button
                onClick={showOpenFileDialog}
                className="position-absolute top-50 start-50 translate-middle icon-white-hover rounded-circle lh-1 p-1"
                variant="link"
            >
                <CameraIcon />
            </Button>

            <input
                ref={fileInputRef}
                type="file"
                className="d-none"
                accept="image/*"
                onChange={() => handleFileChange(fileInputRef)}
            />
        </section>
    )
}

export default ProfileUpdateProfilePictureComponent
