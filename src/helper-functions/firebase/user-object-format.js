import { getDoc } from 'firebase/firestore'
import { formatDateString } from '../dates'

const userObjectFormat = async (data) => {
    const userDate = data
    const roleDoc = await getDoc(userDate.role)
    userDate.role = roleDoc.id
    userDate.dob = formatDateString(userDate.dob.toDate())
    userDate.joined = formatDateString(userDate.joined.toDate())
    return userDate
}

export default userObjectFormat
