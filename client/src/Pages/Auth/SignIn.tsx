import React from "react";
import styled from "./Auth.module.css";
function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    // const { email, password } = state;
    // alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
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
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
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
