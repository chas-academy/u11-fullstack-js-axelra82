/* eslint-disable import/prefer-default-export */
const urlReplace = (string) => {
    const regEx = /^((https:\/\/)|(http:\/\/)|(www)\.)(\S*)/gi
    return string.replace(regEx, '$5')
}

export { urlReplace }
