import { signInWithEmailAndPassword } from 'firebase/auth'

const signin = async (auth, email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    return response
}

export default signin
