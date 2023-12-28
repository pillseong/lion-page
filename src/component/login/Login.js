import React, { useState } from "react";
import axios from "axios";
import Header from "../Main/header/header";
import { useAuth } from "./AuthContext";
import './Login.css';
import cookie from 'react-cookies';

function Login() {
  const { setLoginInfo } = useAuth();

  // 사용자 데이터와 학생 정보를 상태로 관리
  const [userData, setUserData] = useState({
    student_id: "",
    password: "",
  });

  const [studentInfo, setStudentInfo] = useState(null);

  // 폼을 제출할 때 동작하는 함수
  const FormEvent = async (event) => {
    event.preventDefault();

    try {
      // 쿠키 만료 시간 설정
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      // 로그인 요청 및 응답 저장
      const loginResponse = await axios.post("http://192.168.0.4:8080/api/token/", {
        student_id: userData.student_id,
        password: userData.password,
      });

      // 액세스 토큰과 리프래시 토큰을 쿠키에 저장
      cookie.save('accessToken', loginResponse.data.access, {
        path: '/',
        expires,
      });
      cookie.save('refreshToken', loginResponse.data.refresh, {
        path: '/',
        expires,
      });

      let studentInfoResponse;

      // 액세스 토큰의 유효성을 확인하는 요청
      const getAccessTokenResponse = await axios.post("http://192.168.0.4:8080/api/token/");
      if (getAccessTokenResponse.status === 200) {
        // 액세스 토큰이 유효하면 학생 정보를 가져옴
        studentInfoResponse = await axios.post(
          `http://192.168.0.4:8080/api/token/`,
          {
            token: cookie.load('accessToken'),
          }
        );
      } else {
        // 액세스 토큰이 만료되면 리프래시 토큰으로 새로고침 시도
        const refreshTokenResponse = await axios.post(
          "http://192.168.0.4:8080/api/token/refresh/",
          {
            refresh: loginResponse.data.refresh,
          }
        );

        // 리프래시된 액세스 토큰을 저장
        cookie.save("accessToken", refreshTokenResponse.data.access, {
          path: '/',
          expires,
        });

        // 새로고침된 액세스 토큰으로 다시 학생 정보를 가져옴
        studentInfoResponse = await axios.post(
          `http://192.168.0.4:8080/api/token/`,
          {
            token: refreshTokenResponse.data.access,
          }
        );

        // 새로고침된 토큰을 서버에 다시 보내는 예시 요청
        const validateRefreshToken = await axios.post(
          "http://192.168.0.4:8080/api/token/",
          {
            refresh: refreshTokenResponse.data.refresh,
          }
        );
        console.log("Validate Refresh Token Response:", validateRefreshToken.data);
      }

      // 로그인 및 학생 정보 출력
      console.log("Login Response:", loginResponse.data);
      setLoginInfo(loginResponse.data);

      console.log("Student Info Response:", studentInfoResponse.data);
      setStudentInfo(studentInfoResponse.data);
    } catch (error) {
      // 에러가 발생하면 콘솔에 에러 메시지 출력
      console.error("Error:", error);
    }
  };

  // 사용자 ID 변경 함수
  const changeId = (value) => {
    setUserData({ ...userData, student_id: value });
  };

  // 사용자 비밀번호 변경 함수
  const changePw = (value) => {
    setUserData({ ...userData, password: value });
  };

  return (
    <>
      <Header />
      <div className="login_Border">
        <div className="login_state">
          {/* 폼 제출 시 FormEvent 함수 호출 */}
          <form onSubmit={FormEvent}>
            <label htmlFor="id">ID:</label>
            {/* 사용자 ID 입력 필드 */}
            <input
              type="text"
              id="id"
              name="id"
              value={userData.student_id}
              onChange={(e) => changeId(e.target.value)}
            />

            <label htmlFor="pw">PW:</label>
            {/* 사용자 비밀번호 입력 필드 */}
            <input
              type="password"
              id="pw"
              name="pw"
              value={userData.password}
              onChange={(e) => changePw(e.target.value)}
            />

            {/* 로그인 버튼 */}
            <div className="login_Button">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
