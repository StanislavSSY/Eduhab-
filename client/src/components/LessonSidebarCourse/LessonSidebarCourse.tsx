import React, { useState } from "react";
import { Link, Route } from "react-router-dom"; // Импорт компонента Link
import styles from "./LessonSidebarCourse.module.css";
import LessonContent from "../LessonContent/LessonContent";
// /lesson/:lessonid/step/1

// ... (ваш импорт и стиль)

const LessonSidebarCourse = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);

  const menuItems = [
    {
      moduleid: 1,
      moduleTitle: "Урок 1",
      lesson: [
        {
          id: 1,
          title: "Введение в программирование",
          steps: [
            {
              id: 1,
              type: "TEXT",
              data: "какая-то дата",
            },
            {
              id: 2,
              type: "TEXT",
              data: "какая-то дата2",
            },
          ],
        },
        {
          id: 2,
          title: "Основы JavaScript",
          steps: [
            {
              id: 1,
              type: "TEXT",
              data: "какая-то дата3",
            },
            {
              id: 2,
              type: "TEXT",
              data: "какая-то дата4",
            },
          ],
        },
        {
          id: 3,
          title: "Работа с React",
          steps: [
            {
              id: 1,
              type: "TEXT",
              data: "какая-то дата5",
            },
            {
              id: 2,
              type: "TEXT",
              data: "какая-то дат6",
            },
          ],
        },
      ],
    },
    {
      moduleid: 2,
      moduleTitle: "Урок 2",
      lesson: [
        {
          id: 4,
          title: "Введение в программирование",
          steps: [
            {
              id: 1,
              type: "TEXT",
              data: "какая-то дата6",
            },
            {
              id: 2,
              type: "TEXT",
              data: "какая-то дат7",
            },
          ],
        },
        {
          id: 5,
          title: "Основы JavaScript",
          steps: [
            {
              id: 1,
              type: "TEXT",
              data: "какая-то дата8",
            },
            {
              id: 2,
              type: "TEXT",
              data: "какая-то дат9",
            },
          ],
        },
        {
          id: 6,
          title: "Работа с React",
          steps: [
            {
              id: 1,
              type: "TEXT",
              data: "какая-то дата10",
            },
            {
              id: 2,
              type: "TEXT",
              data: "какая-то дат10",
            },
          ],
        },
      ],
    },
  ];

  const handleMenuItemClick = (id) => {
    setSelectedMenuItem(id);
    // Сбросить выбранный шаг при изменении урока
    setSelectedStep(null);
  };

  const handleStepClick = (stepId) => {
    setSelectedStep(stepId);
  };

  return (
    <div className={styles.menucourse}>
      <div className={styles.menu}>
        <h2>Меню курса</h2>
        <div>Название курса</div>
        <ul>
          {menuItems.map((menuItem) => (
            <li key={menuItem.moduleid}>
              {menuItem.moduleTitle}
              <ul>
                {menuItem.lesson.map((lesson) => (
                  <li
                    key={lesson.id}
                    onClick={() => handleMenuItemClick(lesson.id)}
                    className={selectedMenuItem === lesson.id ? "active" : ""}
                  >
                    <Link
                      to={`/teach/courses/lesson/${lesson.id}/step/${lesson.steps[0].id}`}
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

      <div className={styles.content}>
        <h2>Содержание курса</h2>

        {selectedMenuItem !== null ? (
          <div>
            <h2>
              {
                menuItems
                  .flatMap((module) => module.lesson)
                  .find((lesson) => lesson.id === selectedMenuItem).title
              }
            </h2>
            {selectedStep !== null ? (
              <div>
                <h3>Шаг {selectedStep}</h3>
                <p>
                  {
                    menuItems
                      .flatMap((module) => module.lesson)
                      .find((lesson) => lesson.id === selectedMenuItem)
                      .steps.find((step) => step.id === selectedStep).data
                  }
                </p>
              </div>
            ) : (
              <div>
                <h3>Выберите шаг для просмотра содержания.</h3>
                <ul className={styles.stepButtons}>
                  {menuItems
                    .flatMap((module) => module.lesson)
                    .find((lesson) => lesson.id === selectedMenuItem)
                    .steps.map((step) => (
                      <li key={step.id}>
                        <button onClick={() => handleStepClick(step.id)}>
                          Шаг {step.id}
                        </button>
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
