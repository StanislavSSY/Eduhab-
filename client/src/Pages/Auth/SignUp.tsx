import React from "react";
import "./Auth.module.css";
import styled from "./Auth.module.css";
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
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

    // const { name, email, password } = state;
    // alert(
    //   `You are sign up with name: ${name} email: ${email} and password: ${password}`
    // );

    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
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
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
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
