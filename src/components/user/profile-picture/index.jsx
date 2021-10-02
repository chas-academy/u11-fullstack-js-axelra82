/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import Placeholder from './placeholder'
import StoreContext from '../../../context/StoreContext'

const UserProfilePictureComponent = ({
    style = {},
    classes = '',
    isPreview = false,
    previewSource = '',
}) => {
    const {
        store: {
            currentUser: { username, profilePicture },
        },
    } = useContext(StoreContext)

    const themeMatch = profilePicture.match(/theme.?[0-9]/gi)
    const isTheme = themeMatch && themeMatch.length > 0
    const theme = themeMatch && themeMatch[0]

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
