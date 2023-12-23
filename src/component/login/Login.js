import React, { useState } from "react";
import axios from "axios";
import Header from "../Main/header/header";
import { useAuth } from "./AuthContext";
import './Login.css';

function Login() {
  const { setLoginInfo } = useAuth();

  const [userData, setUserData] = useState({
    id: "",
    pw: "",
  });

  const [studentInfo, setStudentInfo] = useState(null);

  // 폼 동작 시 새로 고침 현상 막음
  // 콘솔 창에 로그인 정보 및 학생 정보 저장
  const FormEvent = async (event) => {
    event.preventDefault();

    try {
      // 로그인 요청
      const loginResponse = await axios.post("http://127.0.0.1:8000/login/", {
        id: userData.id,
        pw: userData.pw,
      });

      console.log("Login Response:", loginResponse.data);
      setLoginInfo(loginResponse.data);

      // 로그인 성공 시 학생 정보 요청
      const studentInfoResponse = await axios.get(
        `http://127.0.0.1:8000/student_info/${loginResponse.data.id}/`
      );

      console.log("Student Info Response:", studentInfoResponse.data);
      setStudentInfo(studentInfoResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const changeId = (value) => {
    setUserData({ ...userData, id: value });
  };

  const changePw = (value) => {
    setUserData({ ...userData, pw: value });
  };

  return (
    <>
      <Header />
      <div className="login_Border">
        <div className="login_state">
          <form onSubmit={FormEvent}>
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={userData.id}
              onChange={(e) => changeId(e.target.value)}
            />

            <label htmlFor="pw">PW:</label>
            <input
              type="password"
              id="pw"
              name="pw"
              value={userData.pw}
              onChange={(e) => changePw(e.target.value)}
            />

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
