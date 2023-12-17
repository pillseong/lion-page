import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className="header">
            <Link to="/">홈</Link>
            <Link to="/Board">게시판</Link>
            <Link to="/Introduction">공지사항</Link>
            <Link to="/Login">로그인</Link>
            <Link to="/info">내정보</Link>
            <Link to="/Notice">소개</Link>
            <Link to="/Task">과제함</Link>
        </div>
    )
}

export default Header