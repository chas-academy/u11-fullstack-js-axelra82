/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import * as formFields from './formFields'
import { dateFunctions, displayFunctions, firebaseFunctions } from '../../../helper-functions'
import StoreContext from '../../../context/StoreContext'

const UpdateUserProfileComponent = ({ userData }) => {
    const {
        ProfilePictureComponent,
        NameFieldComponent,
        UsernameFieldComponent,
        EmailFieldComponent,
        BioFieldComponent,
        WebsiteFieldComponent,
        DobFieldComponent,
        PasswordFieldComponent,
        DeleteAccountFieldComponent,
    } = formFields

    const {
        store: {
            auth,
            db,
            storage,
            setuserData,
            setISaveButtonDisabled,
            setSaveButtonAction,
            modalState,
            setModalState,
            setModalContent,
        },
    } = useContext(StoreContext)

    const {
        bio,
        dob,
        email,
        name: { first: firstName, last: lastName },
        profilePicture: imageSource,
        username,
        website,
    } = userData

    const { isoDateString, formatDateString } = dateFunctions
    const { toggleModal } = displayFunctions
    const { updateUserProfile } = firebaseFunctions

    const [hasChange, setHasChange] = useState(false)
    const [showDeletePrompt, setShowDeletePrompt] = useState(false)
    const [changeDob, setChangeDob] = useState(false)
    const [inputValues, setInputValues] = useState(userData)
    const [showBioCharCounter, setShowBioCharCounter] = useState(false)
    const [showNameCharCounter, setShowNameCharCounter] = useState(false)
    const [showEmailCharCounter, setShowEmailCharCounter] = useState(false)
    const [showUsernameCharCounter, setShowUsernameCharCounter] = useState(false)
    const [showWebsiteCharCounter, setShowWebsiteCharCounter] = useState(false)
    const [uploadSource, setUploadSource] = useState(false)

    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const usernameRef = useRef()
    const bioRef = useRef()
    const dobRef = useRef()
    const emailRef = useRef()
    const websiteRef = useRef()
    const deleteConfirmPasswordRef = useRef()
    const fileInputRef = useRef()

    // display input max length counter
    const inputCharCounter = (inputField, double = false) => {
        if (!double) {
            const { current } = inputField
            if (current) {
                const { value } = current
                return value.length
            }
            return 0
        }

        const { current: first } = inputField
        const { current: second } = double

        if (first && second) {
            const { value: firstValue } = first
            const { value: secondValue } = second
            return firstValue.length + secondValue.length
        }
        return 0
    }

    const inputEmptyWarning = (inputField) => {
        const { current } = inputField
        if (current) {
            const { value } = current
            if (value.length < 1) {
                return true
            }
        }
        return false
    }

    // multi input state handling
    const onInputchange = (inputField) => {
        // deconstruct event object
        const { current } = inputField

        if (current) {
            const { name, value } = current
            // name input?
            const nameObjectMatch = /(name-)(.*)/gi
            const isNameField = name.match(nameObjectMatch)

            // update state
            if (!isNameField) {
                setInputValues({ ...inputValues, [name]: value })
                inputCharCounter(firstNameRef, lastNameRef)
            } else {
                setInputValues({
                    ...inputValues,
                    name: { ...inputValues.name, [name.replace(nameObjectMatch, '$2')]: value },
                })
                inputCharCounter(inputField)
            }

            // enable save button for regular fields
            if (!hasChange && value !== '') {
                setHasChange(!hasChange)
            }
        }

        // date field
        if (
            typeof inputField.target !== 'undefined' &&
            typeof inputField.target.valueAsNumber !== 'undefined'
        ) {
            const newDateValue = inputField.target.valueAsNumber
            if (typeof newDateValue === 'number') {
                setHasChange(!hasChange)
                setInputValues({ ...inputValues, dob: isoDateString(newDateValue) })
            }
        }
    }

    const InvalidHelperComponent = ({ message }) => {
        return <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>
    }

    const handleUpdate = async () => {
        // make sure button isn't disabled without change
        if (hasChange) {
            const fieldChange = (ref, origin, isName = false, isDate = false) => {
                const { current } = ref
                if (current) {
                    const { value } = current

                    if (isName) {
                        return value === origin ? origin : value
                    }

                    if (isDate) {
                        const dateRef = formatDateString(new Date(value))
                        const dateOrigin = formatDateString(new Date(origin))
                        return dateRef === dateOrigin ? false : dateRef
                    }

                    return value === origin ? false : value
                }
                return false
            }

            // build update data object
            const updateData = {
                bio: fieldChange(bioRef, bio),
                dob: fieldChange(dobRef, dob, null, true),
                email: fieldChange(emailRef, email),
                name: {
                    first: fieldChange(firstNameRef, firstName, true),
                    last: fieldChange(lastNameRef, lastName, true),
                },
                profilePicture: uploadSource,
                username: fieldChange(usernameRef, username),
                website: fieldChange(websiteRef, website),
            }

            const repsponse = await updateUserProfile(
                auth,
                db,
                storage,
                userData.username,
                updateData
            )
            if (repsponse) {
                toggleModal(modalState, setModalState, setModalContent)
                setuserData(userData)
            }
        }
    }

    useEffect(() => {
        // look for changes in form
        if (hasChange) {
            setISaveButtonDisabled(false)
            // action for modal update button
            setSaveButtonAction(() => handleUpdate)
        }
        console.log('useeffect in UpdateUserProfileComponent')
    }, [hasChange])

    return (
        <>
            <ProfilePictureComponent
                props={{
                    imageSource,
                    fileInputRef,
                    hasChange,
                    setHasChange,
                    setUploadSource,
                }}
            />
            <NameFieldComponent
                props={{
                    firstName,
                    lastName,
                    firstNameRef,
                    lastNameRef,
                    onInputchange,
                    inputCharCounter,
                    showNameCharCounter,
                    setShowNameCharCounter,
                    InvalidHelperComponent,
                    inputEmptyWarning,
                }}
            />

            <UsernameFieldComponent
                props={{
                    username,
                    usernameRef,
                    onInputchange,
                    inputCharCounter,
                    showUsernameCharCounter,
                    setShowUsernameCharCounter,
                    InvalidHelperComponent,
                    inputEmptyWarning,
                }}
            />

            <EmailFieldComponent
                props={{
                    email,
                    emailRef,
                    onInputchange,
                    inputCharCounter,
                    showEmailCharCounter,
                    setShowEmailCharCounter,
                    InvalidHelperComponent,
                    inputEmptyWarning,
                }}
            />

            <BioFieldComponent
                props={{
                    bio,
                    bioRef,
                    onInputchange,
                    inputCharCounter,
                    showBioCharCounter,
                    setShowBioCharCounter,
                }}
            />

            <WebsiteFieldComponent
                props={{
                    website,
                    websiteRef,
                    onInputchange,
                    inputCharCounter,
                    showWebsiteCharCounter,
                    setShowWebsiteCharCounter,
                }}
            />

            <DobFieldComponent
                props={{
                    dob,
                    dobRef,
                    onInputchange,
                    changeDob,
                    setChangeDob,
                }}
            />

            <PasswordFieldComponent />

            <DeleteAccountFieldComponent
                props={{ showDeletePrompt, setShowDeletePrompt, deleteConfirmPasswordRef }}
            />

            <small className="d-block text-muted text-center">
                <strong>NOTE!</strong> Reload page after update to see changes
            </small>
        </>
    )
}

export default UpdateUserProfileComponent
