import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom'; // Импорт компонента Link
import styles from './LessonSidebarCourse.module.css';

// /lesson/:lessonid/step/1

const LessonSidebarCourse = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const menuItems = [
    {
      moduleid: 1,
      moduleTitle: 'Урок 1',
      lesson: [
        { id: 1, title: 'Введение в программирование', content: 'Содержание введения в программирование...' },
        { id: 2, title: 'Основы JavaScript', content: 'Содержание основ JavaScript...' },
        { id: 3, title: 'Работа с React', content: 'Содержание работы с React...' },
      ],
    },
    {
      moduleid: 2,
      moduleTitle: 'Урок 2',
      lesson: [
        { id: 4, title: 'Введение в программирование', content: 'Содержание введения в программирование...' },
        { id: 5, title: 'Основы JavaScript', content: 'Содержание основ JavaScript...' },
        { id: 6, title: 'Работа с React', content: 'Содержание работы с React...Содержание работы с React...'}
      ],
    },
  ];

  const handleMenuItemClick = (id) => {
    setSelectedMenuItem(id);
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
                    className={selectedMenuItem === lesson.id ? 'active' : ''}
                  >
                    <Link to={`${lesson.id}/step/1`}>{lesson.title}</Link>
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
            <h2>{menuItems.flatMap((module) => module.lesson).find((lesson) => lesson.id === selectedMenuItem).title}</h2>
            <p>{menuItems.flatMap((module) => module.lesson).find((lesson) => lesson.id === selectedMenuItem).content}</p>
          </div>
        ) : (
          <p>Выберите элемент меню для просмотра содержания.</p>
        )}
      </div>
    </div>
  );
};

export default LessonSidebarCourse;
