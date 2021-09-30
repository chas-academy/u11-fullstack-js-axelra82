const isoDateString = (dob) => {
    return new Date(new Date(dob) - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10)
}

const formatDateString = (date, format = '') => {
    switch (format) {
        case 'short':
            return new Intl.DateTimeFormat('en-GB', {
                month: 'long',
                year: 'numeric',
                timeZone: 'Europe/Stockholm',
            }).format(date)

        default:
            return new Intl.DateTimeFormat('en-GB', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'Europe/Stockholm',
            }).format(date)
    }
}

export { isoDateString, formatDateString }
