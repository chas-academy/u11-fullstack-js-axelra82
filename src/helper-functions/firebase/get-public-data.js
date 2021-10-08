/* eslint-disable no-undef */
// import usernameLookUp from './username-lookup'
import { Timestamp } from 'firebase/firestore'
import { formatDateString } from '../dates'

const getPublicData = async (username, setUser, history) => {
    const response = await fetch(`${process.env.REACT_APP_WEB_API}/user/${username}`)
    const data = await response.json()
    // nothing found abort
    if (!data) {
        history.push('/', '404')
    }
    const {
        dob: { _seconds: dobSeconds },
        joined: { _seconds: joinedSeconds },
    } = data
    const dobTimestamp = Timestamp.fromMillis(dobSeconds * 1000)
    const joinedTimestamp = Timestamp.fromMillis(joinedSeconds * 1000)
    const dobDate = formatDateString(dobTimestamp.toDate())
    const joinedDate = formatDateString(joinedTimestamp.toDate())
    const formatedData = {
        ...data,
        dob: dobDate,
        joined: joinedDate,
    }
    setUser(formatedData)
    return formatedData
}

export default getPublicData
