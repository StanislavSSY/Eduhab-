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

    const response = await fetch(`${import.meta.env.VITE_URL}/users/reg`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(state),
    });

    if (response.status === 200) {
      navigate('/');
    }
  };

  return (
    <div
      className={`${styled["form-container"]} ${styled["sign-up-container"]}`}
    >
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default SignUpForm;
