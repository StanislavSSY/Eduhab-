import React, { useState, useEffect} from "react";
import styled from "./Auth.module.css";
import "./Auth.module.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function Auth() {
  const [type, setType] = useState("signIn");
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.userSlice.user);
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate('/');
    }
  },[user.isLoggedIn]);


  return (
    <div className={styled.AppAuth}>
      <div
        className={
          styled.container +
          " " +
          (type === "signUp" ? styled["right-panel-active"] : "")
        }
        id={styled.container}
      >
        <SignUpForm />
        <SignInForm />

        <div className={styled["overlay-container"]}>
          <div className={styled.overlay}>
            <div
              className={`${styled["overlay-panel"]} ${styled["overlay-left"]}`}
            >
              <h2>С возвращением!</h2>
              <p>Для продолжения, пожалуйста войдите в систему</p>
              <button
                className={styled.ghost}
                id={styled.signIn}
                onClick={() => handleOnClick("signIn")}
              >
                Вход
              </button>
            </div>
            <div
              className={`${styled["overlay-panel"]} ${styled["overlay-right"]}`}
            >
              <h2>Добро пожаловать!</h2>
              <p>Для продолжения, пожалуйста зарегистрируйтесь в системе</p>
              <button
                className={styled.ghost}
                id={styled.signUp}
                onClick={() => handleOnClick("signUp")}
              >
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
