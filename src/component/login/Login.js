import React, { useState } from "react";
import Header from "../Main/header/header";

function Login() {
  const [userData, setuserData] = useState({
    id: "",
    pw: "",
  });
  //폼 동작 시 새로 고침 현상 막음
  //콘솔 창에 로그인 정보 저장
  const FormEvent = (event) => {
    event.preventDefault();

    console.log("ID:", userData.id);
    console.log("PW:", userData.pw);
  };
  const changeid = (value) => {
    setuserData({ ...userData, id: value });
  };
  const changepw = (value) => {
    setuserData({ ...userData, pw: value });
  };

  return (
    <>
      <Header />
      <div className='login_Border'>
        <div className='login state'>
          <form onSubmit={FormEvent}>
            <label htmlFor='id '>ID:</label>
            <input
              type='text'
              id='id'
              name='id'
              value={userData.id}
              onChange={(e) => changeid(e.target.value)}
            />
            <label htmlFor='pw'>PW:</label>
            <input
              type='password'
              id='pw'
              name='pw'
              value={userData.pw}
              onChange={(e) => changepw(e.target.value)}
            />
            <div className='login_Buttton'>
              <button type='submit'>login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;