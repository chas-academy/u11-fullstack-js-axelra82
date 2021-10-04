/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingComponent from '../../components/loading'
import { firebaseFunctions } from '../../helper-functions'
import ProfileDisplay from '../../components/user/display'
import StoreContext from '../../context/StoreContext'

const ProfileView = () => {
    const {
        store: { db, currentUser },
    } = useContext(StoreContext)

    const { getProfileData } = firebaseFunctions

    const history = useHistory()
    const { username } = useParams()

    const [userData, setUserData] = useState()

    useEffect(() => {
        if (currentUser) {
            setUserData(currentUser)
        } else {
            const getUserData = async () => {
                const publicProfileData = await getProfileData(db, username)
                if (publicProfileData) {
                    setUserData(publicProfileData)
                } else {
                    history.push('/', '404')
                }
            }
            getUserData()
        }
    }, [currentUser])

    return !userData ? <LoadingComponent /> : <ProfileDisplay userData={userData} />
}

export default ProfileView
