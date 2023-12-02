import React, { useState, useEffect } from "react";
import styled from "./Navbar.module.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { delUser } from "../../store/slice/userSlice";
import ButtomProfile from "../ButtonProfile/ButtonProfile";

export default function Navbar(): JSX.Element {
  const [isUser, setIsUser] = useState<boolean>();
  const user = useAppSelector((store) => store.userSlice.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsUser(true);
  }, [user.isLoggedIn]);

  async function logOut(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/users/logout`, {
      credentials: "include",
    });

    if (response.status === 200) {
      navigate("/");
      dispatch(delUser(""));
    }
  }

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
          <NavLink to={"/"} className={styled.title}>
            Каталог
          </NavLink>
          <NavLink to={"teach/courses"} className={styled.title}>
            Преподавание
          </NavLink>
        </div>
      </div>
      <div className={styled.rightcont}>
        {isUser ? (
          user.isLoggedIn ? (
            <>
              {/* <div className={styled.logout} onClick={logOut}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </div> */}
              <ButtomProfile logOut={logOut} />
            </>
          ) : (
            <NavLink className={styled.auth} to={"/auth"}>
              Авторизироваться
            </NavLink>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
