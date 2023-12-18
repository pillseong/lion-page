import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './component/Main/main/main';
import Board from './component/Board/Board';  
import Introduction from './component/Introduction/introduction';
import Login from './component/login/Login';
import Info from './component/info/info';
import Notice from './component/Notice/Notice';
import Task from './component/Task/Task';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/Board" element={<Board />} />
                <Route path="/Introduction" element={<Introduction />} />
                <Route path="/login" element={<Login />} />
                <Route path="/info" element={<Info />} />
                <Route path="/Notice" element={<Notice />} />
                <Route path="/Task" element={<Task />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
