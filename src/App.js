import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './component/Main/main/main';
import Board from './component/Board/Board';  
import Introduction from './component/Introduction/introduction';
import IntroductionWrite from './component/Introduction/introduction_write';

import Login from './component/Login/Login';
import { AuthProvider } from './component/Login/AuthContext';

import Info from './component/info/info';
import Notice from './component/Notice/Notice';
import Task from './component/Task/Task';
import BoardWrite from './component/Board/Board_write';

import Test from './component/Board/Board_test';

import Board_Edit from './component/Board/Board_edit';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    
                    <Route path="/Board" element={<Board />} />
                    <Route path="/BoardWrite" element={<BoardWrite />} />
                    <Route path="/boardEdit/:id" element={<Board_Edit />} />

                    <Route path="/Introduction" element={<Introduction />} />
                    <Route path='/IntroductionWrite' element={<IntroductionWrite />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/Notice" element={<Notice />} />
                    <Route path="/Task" element={<Task />} />

                    <Route path='/test' element={<Test />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
