/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingComponent from '../../components/loading'
import { firebaseFunctions } from '../../helper-functions'
import ProfileDisplay from '../../components/user/display'
import StoreContext from '../../context/StoreContext'

const ProfileView = () => {
    const {
        store: { db },
    } = useContext(StoreContext)

    const { getPublicData } = firebaseFunctions

    const history = useHistory()
    const { username } = useParams()

    const [userData, setUserData] = useState()

    useEffect(() => {
        if (!userData) {
            // if (currentUser) {
            //     setUserData(currentUser)
            // } else {
            // }
            ;(async () => {
                await getPublicData(db, username, setUserData, history)
            })()
        }
        console.log('useeffect in ProfileView')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return !userData ? <LoadingComponent /> : <ProfileDisplay userData={userData} />
}

export default ProfileView
