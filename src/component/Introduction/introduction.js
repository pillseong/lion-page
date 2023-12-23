// Introduction.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Main/header/header';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';

function Introduction() {
  const { loginInfo } = useAuth();
  const address = "http://172.20.10.7:3000/";
  // loginInfo에 사용자 로그인정보를 가져옴

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${address}notice/`);
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
    fetchNotices(); })


  return (
    <>
      <Header />
      <h1>공지사항 페이지</h1>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>
            <div>
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
            </div>
              <Link to={`/IntroductionWrite/${notice.id}`}>수정하기</Link>
          </li>
        ))}
      </ul>
      <Link to="/IntroductionWrite">새로운 공지 작성</Link>
    </>
  );
}

export default Introduction;
