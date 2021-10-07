import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import MenuComponent from '../../components/menu'
import PostIcon from '../../components/icons/post'
import CreatPostComponent from '../../components/create-post'
import { displayFunctions } from '../../helper-functions'
import StoreContext from '../../context/StoreContext'

const BottomComponent = () => {
    const {
        store: { modalContent, modalState, setModalState, setModalContent },
    } = useContext(StoreContext)
    const { toggleModal } = displayFunctions

    const showCreatePost = () => {
        setModalContent({
            ...modalContent,
            fullscreen: null,
            body: <CreatPostComponent isModal />,
        })
        toggleModal(modalState, setModalState, setModalContent)
    }

    return (
        <footer
            className="d-md-none position-fixed vw-100 border-top bg-white fixed-bottom"
            style={{ zIndex: 98 }}
        >
            <Button
                className="position-absolute py-2 px-2 rounded-circle"
                style={{ top: '-107%', right: '3%' }}
                onClick={showCreatePost}
            >
                <PostIcon color="white" size="extra-large" classes="m-2" />
            </Button>
            <MenuComponent />
        </footer>
    )
}

export default BottomComponent
