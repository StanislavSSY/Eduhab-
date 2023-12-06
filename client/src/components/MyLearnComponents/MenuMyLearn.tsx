import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "./MenuMyLearn.module.css";

export default function MenuMyLearn() {
  const { pathname } = useLocation();

  const isActive = (to) => {
    console.log("⚠️  【】➜ ", pathname.endsWith(`${to}`));
    if (pathname.endsWith(`${to}`)) return true;
    // if (pathname.split("/")[pathname.split("/").length - 1] === to) return true;
  };
  console.log('⚠️    isActive("courses");【】➜ ', isActive("courses"));
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <nav className={styled.nav}>
      <ul>
        <li>
          <Link to="" className={isActive("courses") ? "" : styled.active}>
            <i className="fa fa-home" aria-hidden="true"></i> Моё обучение
          </Link>
        </li>
        <li>
          <Link
            to="courses"
            className={isActive("courses") ? styled.active : ""}
          >
            <i className="fa fa-graduation-cap" aria-hidden="true"></i> Прохожу
          </Link>
        </li>
        {/* <li>
          <div
            {...getToggleProps({
              onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            })}
          >
            <span>
              <i className="fa fa-graduation-cap" aria-hidden="true"></i> Курсы{" "}
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </div>
          <ul {...getCollapseProps()}>
            <ul>
              <li>
                <Link
                  to="courses"
                  className={isActive("courses") ? styled.active : ""}
                >
                  Прохожу
                </Link>
              </li>
            </ul>
          </ul>
        </li> */}
        {/* <li>
          <Link to="notifications">
            <i class="fa fa-bell" aria-hidden="true"></i> Уведомления
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}
