import React from "react";
import styled from "./Navbar.module.css";
import { Link, useNavigate, NavLink } from "react-router-dom";

export default function Navbar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styled.containernavbar}>
      <div className={styled.leftcont}>
        {" "}
        <Link to={"/"} className={styled.title}>
          <h3>
            <span>G</span> Galera
          </h3>
        </Link>
        <div className={styled.titlecont}>
          <NavLink to={"/a"} className={styled.title}>
            Каталог
          </NavLink>
          <NavLink to={"/3"} className={styled.title}>
            Преподавание
          </NavLink>
        </div>
      </div>
      <div className={styled.rightcont}>
        <NavLink className={styled.auth} to={"/auth"}>
          Авторизироваться
        </NavLink>
      </div>
    </div>
  );
}
