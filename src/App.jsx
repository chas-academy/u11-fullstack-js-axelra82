import React from 'react'
import { LeftPanel, MainPanel, RightPanel, BottomPanel } from './components/panels'
import './style/style.scss'

const App = () => {
    return (
        <section id="app-container">
            <LeftPanel />
            <MainPanel />
            <RightPanel />
            <BottomPanel />
        </section>
    )
}

export default App
