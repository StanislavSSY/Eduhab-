import React from "react";
import "./Auth.module.css";
import styled from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
function SignUpForm() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
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

    // const { name, email, password } = state;
    // alert(
    //   `You are sign up with name: ${name} email: ${email} and password: ${password}`
    // );

    const response = await fetch(`${import.meta.env.VITE_URL}/users/reg`, {
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
      className={`${styled["form-container"]} ${styled["sign-up-container"]}`}
    >
      <form onSubmit={handleOnSubmit}>
        <h1>Создать аккаунт</h1>
        <span>используйте актуальную электронную почту для регистрации</span>
        <input
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          placeholder="Имя"
        />
        <input
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          placeholder="Фамилия"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Почта"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <button>Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default SignUpForm;
