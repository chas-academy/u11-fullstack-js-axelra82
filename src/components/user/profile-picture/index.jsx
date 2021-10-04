/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Placeholder from './placeholder'
import { getProfileData } from '../../../helper-functions/firebase'
import StoreContext from '../../../context/StoreContext'

const UserProfilePictureComponent = ({
    style = {},
    classes = '',
    isPreview = false,
    previewSource = '',
}) => {
    const {
        store: { db, currentUser },
    } = useContext(StoreContext)
    const [username, setUsername] = useState()
    const [profilePicture, setProfilePicture] = useState()
    const { username: paramUsername } = useParams()

    const themeMatch = profilePicture && profilePicture.match(/theme.?[0-9]/gi)
    const isTheme = themeMatch && themeMatch.length > 0
    const theme = themeMatch && themeMatch[0]

    useEffect(() => {
        const getUserData = async () => {
            if (currentUser) {
                const { username: currentUsername, profilePicture: currentProfilePicture } =
                    currentUser
                setUsername(currentUsername)
                setProfilePicture(currentProfilePicture)
            } else {
                const publicProfile = await getProfileData(db, paramUsername)
                const { username: publicUsername, profilePicture: publicProfilePicture } =
                    publicProfile
                setUsername(publicUsername)
                setProfilePicture(publicProfilePicture)
            }
        }
        getUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const display = (source) => {
        if (isTheme && !isPreview) {
            return (
                <Placeholder
                    style={{ ...style, maxWidth: 128, maxHeight: 128 }}
                    classes={`${theme} ${classes}`}
                    username={username}
                />
            )
        }

        return (
            <img
                className={`rounded-circle ${classes}`}
                src={source}
                alt={`${username}`}
                style={style}
            />
        )
    }

    if (isPreview) {
        return display(previewSource)
    }

    return display(profilePicture)
}

export default UserProfilePictureComponent
