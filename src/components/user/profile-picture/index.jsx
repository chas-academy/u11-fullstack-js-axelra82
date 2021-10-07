/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Placeholder from './placeholder'
import StoreContext from '../../../context/StoreContext'

const UserProfilePictureComponent = ({
    style = {},
    classes = '',
    isPreview = false,
    previewSource = '',
    source = false,
}) => {
    const {
        store: { currentUser },
    } = useContext(StoreContext)

    const { username } = useParams()
    const [imageSource, setImageSource] = useState(source)

    const themeMatch = imageSource && imageSource.match(/theme.?[0-9]/gi)
    const isTheme = themeMatch && themeMatch.length > 0
    const theme = themeMatch && themeMatch[0]

    useEffect(() => {
        if (currentUser && !source) {
            const { profilePicture } = currentUser
            setImageSource(profilePicture)
        }
        console.log('useeffect in UserProfilePictureComponent')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const displayPicture = (sourceImage) => {
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
                src={sourceImage}
                alt={`${username}`}
                style={style}
            />
        )
    }

    if (isPreview) {
        return displayPicture(previewSource)
    }

    return imageSource && displayPicture(imageSource)
}

export default UserProfilePictureComponent
