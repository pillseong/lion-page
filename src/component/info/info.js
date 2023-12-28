import React from 'react';
import Header from '../Main/header/header'
// import { useAuth } from '../Login/AuthContext';

function My_info() {
    // const {loginInfo} = useAuth();

    return (
        <>
            <Header />
            <table>
            <h1>여긴 내정보 페이지</h1>
            <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>

                <th></th>
            </tr>
            </table>
        </>
    );
}

export default My_info;
