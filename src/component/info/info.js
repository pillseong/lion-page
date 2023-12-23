import React from 'react';
import Header from '../Main/header/header'
import { useAuth } from '../Login/AuthContext';

function My_info() {
    const {loginInfo} = useAuth();

    return (
        <>
            <Header />
            <h1>여긴 내정보 페이지</h1>
        </>
    );
}

export default My_info;
