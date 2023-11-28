import React from "react";
import styled from "./Auth.module.css";
import { useNavigate } from "react-router-dom";

function SignInForm(): JSX.Element {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    // const { email, password } = state;
    // alert(`You are login with email: ${email} and password: ${password}`);

    const response = await fetch(`${import.meta.env.VITE_URL}/users/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(state),
    });

    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <div
      className={`${styled["form-container"]} ${styled["sign-in-container"]}`}
    >
      <form onSubmit={handleOnSubmit}>
        <h1>Вход</h1>
        <span>Введите свои данные</span>
        <input
          type="email"
          placeholder="Почта"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={state.password}
          onChange={handleChange}
        />
        {/* <a href="#">Забыли пароль?</a> */}
        <button>Войти</button>
      </form>
    </div>
  );
}

export default SignInForm;
