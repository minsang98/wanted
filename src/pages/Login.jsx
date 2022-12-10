import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { postLogin, postSignup } from "../api/auth";

import InputBox from "../components/InputBox";
import Button from "../components/Button";

const LoginComponent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .menu {
    display: flex;
    width: 100%;
    border: 1px solid black;
    box-sizing: border-box;
    border-bottom: none;
    > div {
      flex: 1;
      text-align: center;
      cursor: pointer;
      padding: 10px 0;
    }
    .select {
      background: #f5d042;
    }
  }
  form {
    border: 1px solid black;
    width: 458px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 24px;
      padding: 15px;
    }
    button {
      margin: 15px 0;
    }
    padding: 15px;
  }
`;

function Login() {
  const [menu, setMenu] = useState("로그인");
  const menuArray = ["로그인", "회원가입"];
  const menuClickHandler = (m) => setMenu(m);
  const navigate = useNavigate();

  const LOGIN_INITIAL = {
    email: { txt: "", check: null },
    password: { txt: "", check: null },
  };
  const SIGNUP_INITIAL = {
    ...LOGIN_INITIAL,
    passwordCheck: { txt: "", check: null },
  };
  const [userInfo, setUserInfo] = useState(LOGIN_INITIAL);
  const [cursor, setCursor] = useState(false);
  const onChange = (id, txt) => {
    setUserInfo((state) => {
      const newState = { ...state };
      newState[id].txt = txt;
      newState[id].check = validity(id, txt);
      setCursor(checkCursor(newState));
      return newState;
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (cursor) {
      const data = {
        email: userInfo.email.txt,
        password: userInfo.password.txt,
      };
      if (menu === "로그인") {
        postLogin(data).then((res) => res.status === 200 && navigate("/todo"));
      } else {
        postSignup(data).then((res) => res.status === 200 && navigate("/todo"));
      }
    }
  };

  const validity = (id, txt) => {
    if (id === "email") {
      if (!txt.includes("@")) return "이메일은 @가 포함되어야 합니다";
      else return true;
    } else if (id === "password") {
      if (txt.length < 8) return "비밀번호는 8자리 이상이여야 합니다";
      else return true;
    } else if (id === "passwordCheck") {
      if (txt !== userInfo.password.txt) return "비밀번호가 다릅니다";
      else return true;
    }
  };
  const checkCursor = (obj) => {
    let result = true;
    for (const key in obj) {
      if (obj[key].check !== true) {
        result = false;
        break;
      }
    }
    return result;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) navigate("/todo");
  }, []);
  useEffect(() => {
    if (menu === "로그인") setUserInfo(LOGIN_INITIAL);
    else setUserInfo(SIGNUP_INITIAL);
  }, [menu]);
  return (
    <LoginComponent>
      <div>
        <div className="menu">
          {menuArray.map((v, i) => (
            <div
              key={i}
              onClick={() => menuClickHandler(v)}
              className={menu === v ? "select" : ""}
            >
              {v}
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit}>
          <h1>{menu}</h1>
          <InputBox
            type="text"
            value={userInfo}
            onChange={onChange}
            id={"email"}
          />
          <InputBox
            type="password"
            value={userInfo}
            onChange={onChange}
            id={"password"}
          />
          {menu === "회원가입" ? (
            <InputBox
              type="password"
              value={userInfo}
              id={"passwordCheck"}
              onChange={onChange}
            />
          ) : (
            <></>
          )}

          <Button onClick={onSubmit} style={{ cursor }}>
            {menu}
          </Button>
        </form>
      </div>
    </LoginComponent>
  );
}

export default Login;
