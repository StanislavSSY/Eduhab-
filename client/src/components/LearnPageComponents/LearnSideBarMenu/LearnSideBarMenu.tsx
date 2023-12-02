import React, { useState, useEffect } from "react";
import { Link, Route, useNavigate, useParams } from "react-router-dom";
import styled from "./LearnSideBarMenu.module.css";

export default function LearnSideBarMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const { courseid } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/study/${courseid}`,
        {
          credentials: "include",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setMenuItems(data.Modules);
      }
    })();
  }, []);
  console.log("⚠️  【】➜ ", menuItems);
  return (
    <div className={styled.menu}>
      <h2>Меню курса</h2>
      <div>Название курса</div>
      <ul>
        {menuItems?.map((menuItem) => (
          <li key={menuItem.id}>
            {menuItem.title}
            <ul>
              {menuItem?.Lessons?.map((lesson) => (
                <li
                  key={lesson.id}
                  //   onClick={() => handleMenuItemClick(lesson.id)}
                  //   className={selectedMenuItem === lesson.id ? "active" : ""}
                >
                  <Link
                    to={`/teach/courses/${courseid}/lesson/${
                      lesson.id
                    }/step/${1}`}
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
