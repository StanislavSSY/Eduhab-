import React, { useState, useEffect } from "react";
import { Link, Route, useNavigate, useParams } from "react-router-dom"; // Импорт компонента Link
import styles from "./LessonSidebarCourse.module.css";
import LessonContent from "../LessonContent/LessonContent";
import ReactMarkdown from "react-markdown";
// /lesson/:lessonid/step/1

// ... (ваш импорт и стиль)

const LessonSidebarCourse = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const paramsId = useParams();

  useEffect(() => {
    (async () => {
      const responseId = await fetch(
        `${import.meta.env.VITE_URL}/lessons/${paramsId.id}`,
        {
          credentials: "include",
        }
      );
      const idCourse = await responseId.json();
      console.log("⚠️  【data】➜ ", idCourse);
      //! Полный пиздец
      const response = await fetch(`${import.meta.env.VITE_URL}/study/${1}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data && data.Modules) {
        setMenuItems(data.Modules);
        console.log("⚠️  &#8203;``【oaicite:0】``&#8203;➜ ", data.Modules);
      } else {
        console.error("Data or Modules property is missing.");
      }
    })();
  }, [paramsId.id]);

  const handleMenuItemClick = (id) => {
    setSelectedMenuItem(id);

    // Сбросить выбранный шаг при изменении урока
    // setSelectedStep(null);
    // navigate(`/teach/courses/lesson/${id}`);
    navigate(`/teach/courses/lesson/${id}/step/${1}`);
  };
  console.log("⚠️  【selectedMenuItem】➜ ", menuItems);
  const handleStepClick = (stepId) => {
    setSelectedStep(stepId);
    navigate(
      `/teach/courses/lesson/${paramsId.id}${stepId ? `/step/${stepId}` : ""}`
    );
  };

  return (
    <div className={styles.menucourse}>
      <div className={styles.menu}>
        <h2>Меню курса</h2>
        <div>Название курса</div>
        <ul>
          {menuItems?.map((menuItem) => (
            <li key={menuItem.Lessons.moduleid}>
              {/* {menuItem.moduleTitle} */}
              <ul>
                {menuItem?.Lessons?.map((lesson) => (
                  <li
                    key={lesson.id}
                    onClick={() => handleMenuItemClick(lesson.id)}
                    className={selectedMenuItem === lesson.id ? "active" : ""}
                  >
                    {/* <Link
                      to={`/teach/courses/lesson/${lesson.id}${
                        selectedStep === null ? "" : "/step/" + selectedStep
                      }`}
                    > */}
                    {lesson.title}
                    {/* </Link> */}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        <h2>Содержание курса</h2>

        {selectedMenuItem !== null ? (
          <div>
            <h2>
              {
                menuItems
                  .flatMap((module) => module.Lessons)
                  .find((lesson) => lesson.id === selectedMenuItem).title
              }
            </h2>

            {selectedStep !== null ? (
              <div>
                <ul className={styles.stepButtons}>
                  {menuItems
                    .flatMap((module) => module.Lessons)
                    .find((lesson) => lesson.id === selectedMenuItem)
                    .Steps.map((step, index) => (
                      <li key={step.id}>
                        {/* <Link
                          to={`/teach/courses/lesson/${step.lessonid}${
                            selectedStep === null ? "" : "/step/" + selectedStep
                          }`}
                        > */}
                        <button onClick={() => handleStepClick(index + 1)}>
                          Шаг {index + 1}
                        </button>
                        {/* </Link> */}
                      </li>
                    ))}
                </ul>
                <h3>Шаг {selectedStep}</h3>

                <div
                  dangerouslySetInnerHTML={{
                    __html: `${
                      menuItems
                        .flatMap((module) => module.Lessons)
                        .find((lesson) => lesson.id === selectedMenuItem)
                        .Steps.find((step) => step.id === selectedStep)?.data
                    }`,
                  }}
                />
                {/* <p>
                  {
                    menuItems
                      .flatMap((module) => module.Lessons)
                      .find((lesson) => lesson.id === selectedMenuItem)
                      .Steps.find((step) => step.id === selectedStep).data
                  }
                </p> */}
              </div>
            ) : (
              <div>
                <ul className={styles.stepButtons}>
                  {menuItems
                    .flatMap((module) => module.Lessons)
                    .find((lesson) => lesson.id === selectedMenuItem)
                    .Steps.map((step, index) => (
                      <li key={step.id}>
                        {/* <Link
                          to={`/teach/courses/lesson/${step.lessonid}${
                            selectedStep === null ? "" : "/step/" + selectedStep
                          }`}
                        > */}
                        <button onClick={() => handleStepClick(index + 1)}>
                          Шаг {index + 1}
                        </button>
                        {/* </Link> */}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>Выберите элемент меню для просмотра содержания.</p>
        )}
      </div>
    </div>
  );
};

export default LessonSidebarCourse;
