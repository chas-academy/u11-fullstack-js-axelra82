/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import * as formFields from './formFields'
import { displayFunctions, firebaseFunctions } from '../../../helper-functions'
import StoreContext from '../../../context/StoreContext'

const UpdateUserProfileComponent = () => {
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
            currentUser,
            toasts,
            setToasts,
            setISaveButtonDisabled,
            setSaveButtonAction,
        },
    } = useContext(StoreContext)

    const { email } = currentUser

    const { toastCatchError } = displayFunctions
    const { signin } = firebaseFunctions

    const [hasChange, setHasChange] = useState(false)
    const [showDeletePrompt, setShowDeletePrompt] = useState(false)
    const [changeDob, setChangeDob] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [canChangePassword, setCanChangePassword] = useState(false)
    const [inputValues, setInputValues] = useState(currentUser)
    const [showBioCharCounter, setShowBioCharCounter] = useState(false)
    const [showNameCharCounter, setShowNameCharCounter] = useState(false)
    const [showEmailCharCounter, setShowEmailCharCounter] = useState(false)
    const [showUsernameCharCounter, setShowUsernameCharCounter] = useState(false)
    const [showWebsiteCharCounter, setShowWebsiteCharCounter] = useState(false)
    const [uploadSource, setUploadSource] = useState()

    const nameFirstRef = useRef()
    const nameLastRef = useRef()
    const usernameRef = useRef()
    const bioRef = useRef()
    const dobRef = useRef()
    const emailRef = useRef()
    const websiteRef = useRef()
    const currentPasswordRef = useRef()
    const newPasswordRef = useRef()
    const newPasswordConfirmRef = useRef()
    const deleteConfirmPasswordRef = useRef()
    const fileInputRef = useRef()

    const handleSubmit = () => {
        // setLoading(false)
        // return <></>
    }

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
        return current && current.value.length < 1
    }

    // multi input state handling
    const onInputchange = (inputField) => {
        // enable update option
        if (!hasChange) {
            setHasChange(true)
        }

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
                inputCharCounter(nameFirstRef, nameLastRef)
            } else {
                setInputValues({
                    ...inputValues,
                    name: { ...inputValues.name, [name.replace(nameObjectMatch, '$2')]: value },
                })
                inputCharCounter(inputField)
            }
        }
    }

    const validateCurrentUser = async () => {
        // make sure user knows password
        try {
            const validateUser = await signin(auth, email, currentPasswordRef.current.value)

            // match login with current user for extra measure
            setCanChangePassword(validateUser.user.email === email)
            // make sure new password field is empty
            newPasswordRef.current.value = ''
        } catch (errorMessage) {
            toastCatchError(toasts, setToasts, errorMessage)
        }
    }

    const InvalidHelperComponent = ({ message }) => {
        return <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>
    }

    const handleUpdate = () => {
        console.log('save action')
    }

    useEffect(() => {
        if (hasChange) {
            setISaveButtonDisabled(false)
        }
    }, [hasChange])

    useEffect(() => {
        setSaveButtonAction(() => handleUpdate)
    }, [])

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <ProfilePictureComponent
                    props={{
                        fileInputRef,
                        hasChange,
                        setHasChange,
                        setUploadSource,
                    }}
                />
                <NameFieldComponent
                    props={{
                        nameFirstRef,
                        nameLastRef,
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
                        bioRef,
                        onInputchange,
                        inputCharCounter,
                        showBioCharCounter,
                        setShowBioCharCounter,
                    }}
                />

                <WebsiteFieldComponent
                    props={{
                        websiteRef,
                        onInputchange,
                        inputCharCounter,
                        showWebsiteCharCounter,
                        setShowWebsiteCharCounter,
                    }}
                />

                <DobFieldComponent
                    props={{
                        dobRef,
                        onInputchange,
                        changeDob,
                        setChangeDob,
                    }}
                />

                <PasswordFieldComponent
                    props={{
                        currentPasswordRef,
                        validateCurrentUser,
                        newPasswordRef,
                        newPasswordConfirmRef,
                        canChangePassword,
                        changePassword,
                        setChangePassword,
                    }}
                />
            </Form>

            <DeleteAccountFieldComponent
                props={{ showDeletePrompt, setShowDeletePrompt, deleteConfirmPasswordRef }}
            />
        </>
    )
}

export default UpdateUserProfileComponent
