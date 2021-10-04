import { updatePassword } from 'firebase/auth'

const userChangePassword = async (user, password) => {
    await updatePassword(user, password)
}

export default userChangePassword
