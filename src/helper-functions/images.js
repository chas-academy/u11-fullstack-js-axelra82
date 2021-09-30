/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */

const imageResize = async (imageFile) => {
    // placeholder for source image data
    const imagePlaceholder = new Image()
    // create canvas for image
    const canvas = document.createElement('canvas')

    imagePlaceholder.src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        // trigger file read
        reader.readAsDataURL(imageFile)
    })

    await new Promise((resolve) => {
        // trigger image load
        imagePlaceholder.onload = resolve
    })

    // source image width, height and aspect ratio
    const sourceWidth = imagePlaceholder.naturalWidth
    const sourceHeight = imagePlaceholder.naturalHeight

    // canvas width, height and aspect ratio
    const square = 128
    const canvasWidth = square
    const canvasHeight = square

    // // set canvas size
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // center source image in canvas
    // square
    let canvasX = 0
    let canvasY = 0

    if (sourceWidth > sourceHeight) {
        // landscape
        canvasX = (sourceWidth - canvasWidth) * 0.25
    }

    if (sourceWidth < sourceHeight) {
        // portrait
        canvasY = (sourceHeight - canvasHeight) * 0.25
    }

    // get canvas context
    const canvasContext = canvas.getContext('2d')

    // scale canvas using source max value
    const sourceMax = Math.max(canvasWidth / sourceWidth, canvasHeight / sourceHeight)
    canvasContext.scale(sourceMax, sourceMax)

    // draw image on canvas
    canvasContext.drawImage(imagePlaceholder, -canvasX, -canvasY)

    return new Promise((resolve) => canvas.toBlob(resolve))

    // canvas.toBlob((blob) => {
    //     const resizedUpload = blob

    //     return {
    //         resizedUpload,
    //         resizedPreview,
    //     }
    // })
}

export { imageResize }
