const signout = (auth, history) => {
    auth.signOut()
    history.push('/signin')
}

export default signout
