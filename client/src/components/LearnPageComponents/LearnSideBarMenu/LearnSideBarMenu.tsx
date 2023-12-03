import React, { useState, useEffect } from "react";
import { Link, Route, useNavigate, useParams } from "react-router-dom";
import styled from "./LearnSideBarMenu.module.css";

export default function LearnSideBarMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const { courseid, lessonid } = useParams();

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
        console.log("⚠️  【】➜ ", data.Modules);
      }
    })();
  }, []);

  return (
    <div className={styled.menu}>
      <h3>Меню курса</h3>
      {/* <div>Название курса</div> */}
      <ul>
        {menuItems?.map((menuItem) => (
          <li key={menuItem.id}>
            <h3>{menuItem.title}</h3>
            <ul>
              {menuItem?.Lessons?.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    className={
                      lesson.id == lessonid ? styled["link-active"] : ""
                    }
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
