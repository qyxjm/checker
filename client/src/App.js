import React from 'react';
import {Routes, Route} from 'react-router-dom';
import GamePage from './components/Pages/GamePage';
import LoginPage from './components/Pages/LoginPage';

const App = () => {
    return(
        <Routes>
            <Route path='/' element={<GamePage />} />
            <Route path='login' element={<LoginPage />} />
        </Routes>
    )
}

export default App;