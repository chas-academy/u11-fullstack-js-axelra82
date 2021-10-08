/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useContext, useState, useEffect } from 'react'
import { Timestamp } from 'firebase/firestore'
import { Button } from 'react-bootstrap'
import TopBar from '../../user/top'
import LoadingComponent from '../../loading'
import SignUpComponent from '../../signup'
import UpdateUserProfileComponent from '../../user/update'
import { dateFunctions, displayFunctions } from '../../../helper-functions'
import StoreContext from '../../../context/StoreContext'

const AdminPanelComponent = () => {
    const {
        store: { modalContent, modalState, setModalState, setModalContent },
    } = useContext(StoreContext)

    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)

    const { formatDateString } = dateFunctions
    const { toggleModal } = displayFunctions

    const createUser = async () => {
        setModalContent({
            ...modalContent,
            header: {
                ...modalContent.header,
                show: true,
                title: 'Create user',
            },
            body: <SignUpComponent />,
        })
        toggleModal(modalState, setModalState, setModalContent)
    }

    const editUser = async (formatedData) => {
        setModalContent({
            ...modalContent,
            header: {
                ...modalContent.header,
                show: true,
                title: 'Edit user profile',
            },
            body: <UpdateUserProfileComponent userData={formatedData} />,
            footer: {
                ...modalContent.footer,
                show: true,
                buttons: [
                    {
                        type: 'cancel',
                    },
                    {
                        type: 'save',
                        text: 'update',
                    },
                ],
            },
        })
        toggleModal(modalState, setModalState, setModalContent)
    }

    const deleteUser = async (id) => {
        const confirmAction = confirm('Are you sure? This can not be undone!')

        if (confirmAction) {
            const response = await fetch(`${process.env.REACT_APP_WEB_API}/user/delete/${id}`, {
                method: 'delete',
            })
            if (response.status === 200) {
                const newUserList = users.filter((user) => user.id !== id)
                setUsers([...newUserList])
            }
        }
    }
    const usersList = async () => {
        const getUsers = await fetch(`${process.env.REACT_APP_WEB_API}/users/list`)
        if (getUsers.status === 200) {
            const usersJson = await getUsers.json()
            setUsers(usersJson)
        }
        setLoading(false)
    }

    useEffect(() => {
        usersList()
    }, [])

    return (
        <>
            <header className="border-bottom py-3">
                <TopBar />
            </header>
            <main>
                <>
                    <section className="p-3 border-bottom d-flex justify-content-end">
                        <Button variant="outline-success" onClick={createUser}>
                            create user
                        </Button>
                    </section>
                    {loading ? (
                        <LoadingComponent messageBottom="getting users" />
                    ) : (
                        users &&
                        users.map((user) => {
                            const { id, data } = user
                            const {
                                dob: { _seconds: dobSeconds },
                                name,
                                username,
                                email,
                                joined: { _seconds: joinedSeconds },
                            } = data
                            const { first: firstName, last: lastName } = name
                            const dobTimestamp = Timestamp.fromMillis(dobSeconds * 1000)
                            const joinedTimestamp = Timestamp.fromMillis(joinedSeconds * 1000)
                            const dobDate = formatDateString(dobTimestamp.toDate())
                            const joinedDate = formatDateString(joinedTimestamp.toDate())
                            const formatedData = {
                                ...data,
                                dob: dobDate,
                                joined: joinedDate,
                                uid: id,
                            }

                            return (
                                <section
                                    key={`admin-panel-list-user-${id}`}
                                    className="d-flex p-2 border-bottom"
                                >
                                    <div>
                                        <div>
                                            <strong className="me-1 fs-5">
                                                {firstName} {lastName}
                                            </strong>
                                            ·<small className="mx-1 text-muted">@{username}</small>·
                                            <small className="mx-1 text-muted">{joinedDate}</small>
                                            <div>
                                                <small>
                                                    <strong>email:</strong> {email}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms-auto align-self-center">
                                        <Button
                                            variant="outline-primary"
                                            className="me-2"
                                            onClick={() => editUser(formatedData)}
                                        >
                                            edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => deleteUser(id)}
                                        >
                                            delete
                                        </Button>
                                    </div>
                                </section>
                            )
                        })
                    )}
                </>
            </main>
        </>
    )
}

export default AdminPanelComponent
