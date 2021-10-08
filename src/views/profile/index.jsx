/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingComponent from '../../components/loading'
import { firebaseFunctions } from '../../helper-functions'
import ProfileDisplay from '../../components/user/display'

const ProfileView = () => {
    const { getPublicData } = firebaseFunctions

    const history = useHistory()
    const { username } = useParams()

    const [userData, setUserData] = useState(false)
    const [loading, setLoading] = useState(true)

    const getUserData = async () => {
        await getPublicData(username, setUserData, history)
        setLoading(false)
    }

    useEffect(() => {
        if (!userData) {
            getUserData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading ? <LoadingComponent /> : <ProfileDisplay userData={userData} />
}

export default ProfileView
