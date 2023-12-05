import React, { useState, useEffect } from "react";
import { Link, Route, useNavigate, useParams } from "react-router-dom";
import styled from "./LearnSideBarMenu.module.css";

export default function LearnSideBarMenu({ getTitle }) {
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
        // console.log("⚠️  【】➜ ", data);
        const lessonTitle = data.Modules.reduce((acc, el) => {
          const lesson = el.Lessons.find((les) => {
            return les.id == lessonid;
          });
          if (lesson) {
            return lesson.title;
          } else return acc;
        }, "");

        getTitle(lessonTitle);
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
                  {/* {lesson.id === lessonid ? getTitle(lesson.title) : null} */}
                  <Link
                    onClick={() => getTitle(lesson.title)}
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
