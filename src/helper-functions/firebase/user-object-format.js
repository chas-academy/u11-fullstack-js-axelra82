import { getDoc } from 'firebase/firestore'
import { formatDateString } from '../dates'

const userObjectFormat = async (data, setUser, setIsAdmin = false) => {
    const userData = data
    const roleDoc = await getDoc(userData.role)
    userData.role = roleDoc.id
    userData.dob = formatDateString(userData.dob.toDate())
    userData.joined = formatDateString(userData.joined.toDate(), 'short')
    // check if user is administrator
    if (setIsAdmin && userData.role === 'administrator') {
        setIsAdmin(true)
    }
    // if user is authenticated add uid
    if (typeof data.uid !== 'undefined') {
        userData.uid = data.uid
    }
    setUser(userData)
}

export default userObjectFormat
