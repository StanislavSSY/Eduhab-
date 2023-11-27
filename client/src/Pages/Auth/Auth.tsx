import React, { useState } from "react";
import "./Auth.module.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

export default function Auth() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      {/* <h2>Sign in/up Form</h2> */}
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>С возвращением!</h2>
              <p>Для продолжения, пожалуйста войдите в систему</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Вход
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Добро пожаловать!</h2>
              <p>Для продолжения, пожалуйста зарегистрируйтесь в системе</p>
              <button
                className="ghost "
                id="signUp"
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
