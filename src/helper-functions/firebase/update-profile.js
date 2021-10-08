/* eslint-disable no-undef */
const updateUserProfile = async (uid, data) => {
    const filterEmpty = (filterData) => {
        return Object.fromEntries(
            Object.entries(filterData).filter(([key, value]) => {
                if (value) {
                    return { [key]: value }
                }
                return undefined
            })
        )
    }

    // filter out empty values
    const filterFields = filterEmpty(data)

    await fetch(`${process.env.REACT_APP_WEB_API}/user/update`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uid,
            data: filterFields,
        }),
    })
}

export default updateUserProfile
