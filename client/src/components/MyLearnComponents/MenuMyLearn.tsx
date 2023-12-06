import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { Link } from "react-router-dom";
import styled from "./MenuMyLearn.module.css";

export default function MenuMyLearn() {
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <nav className={styled.nav}>
      <ul>
        <li>
          <Link to="">
            <i class="fa fa-home" aria-hidden="true"></i> Моё обучение
          </Link>
        </li>
        <li>
          <div
            {...getToggleProps({
              onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            })}
          >
            <span>
              <i class="fa fa-graduation-cap" aria-hidden="true"></i> Курсы{" "}
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </div>
          <ul {...getCollapseProps()}>
            <ul>
              <li>
                <Link to="courses">Прохожу</Link>
              </li>
              <li>
                <Link to="favorites">Избранное</Link>
              </li>
            </ul>
          </ul>
        </li>
        <li>
          <Link to="notifications">
            <i class="fa fa-bell" aria-hidden="true"></i> Уведомления
          </Link>
        </li>
      </ul>
    </nav>
  );
}
