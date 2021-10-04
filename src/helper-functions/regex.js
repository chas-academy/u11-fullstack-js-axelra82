const urlReplace = (string) => {
    const regEx = /^((https:\/\/)|(http:\/\/)|(www)\.)(\S*)/gi
    return string.replace(regEx, '$5')
}

const urlCheck = (string) => {
    const regEx = /^((https:\/\/)|(http:\/\/)|(www)\.)(\S*)/gi
    const hasProtocol = string.match(regEx)
    if (!hasProtocol) {
        return `https://${string}`
    }
    return string
}

export { urlReplace, urlCheck }
