import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { Link } from "react-router-dom";

export default function MenuMyLearn() {
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  return (
    <nav>
      <ul>
        <li>
          <Link to="">
            <button type="button">Моё обучение</button>
          </Link>
        </li>
        <li>
          <button
            {...getToggleProps({
              onClick: () => setExpanded((prevExpanded) => !prevExpanded),
            })}
          >
            <span>Курсы</span>
          </button>
          <ul {...getCollapseProps()}>
            <ul>
              <li>
                <Link to="courses">
                  <button type="button">Прохожу</button>
                </Link>
              </li>
              <li>
                <Link to="favorites">
                  <button type="button">Избранное</button>
                </Link>
              </li>
            </ul>
          </ul>
        </li>
        <li>
          <Link to="notifications">
            <button type="button">Уведомления</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
