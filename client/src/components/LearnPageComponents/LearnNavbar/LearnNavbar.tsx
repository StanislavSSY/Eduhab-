import React, { useState, useEffect } from "react";
import styled from "./LearnNavbar.module.css";
import { Link, useNavigate, NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { delUser } from "../../../store/slice/userSlice";
import ButtomProfile from "../../ButtonProfile/ButtonProfile";

export default function LearnNavbar(): JSX.Element {
  const [isUser, setIsUser] = useState<boolean>();
  const { user, isLoggedIn } = useAppSelector((store) => store.userSlice);
  const { steps } = useAppSelector((store) => store.stepsSlice);
  const { lessonid, stepNum, courseid } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsUser(true);
  }, [isLoggedIn]);

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
        <div className={styled.steps}>
          {steps.map((el) => (
            <Link
              className={
                el.stepNum == stepNum
                  ? styled["step-box-active"]
                  : styled["step-box"]
              }
              key={el.stepNum}
              to={`/teach/courses/${courseid}/lesson/${lessonid}/step/${el.stepNum}`}
            >
              <span></span>
            </Link>
          ))}
        </div>
      </div>
      <div className={styled.rightcont}>
        {isUser ? (
          isLoggedIn ? (
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
