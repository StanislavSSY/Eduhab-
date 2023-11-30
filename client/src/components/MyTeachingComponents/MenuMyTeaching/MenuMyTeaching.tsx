import React from 'react';
import styles from './MenuMyTeaching.module.css';
import { Link } from "react-router-dom";

export default function MenuMyTeaching() {
  return (
    <>
      <nav className={styles['menu-container']}>
        <ul className={styles['menu-list']}>
          <li>
            <Link to="/teach/courses" className={styles['menu-link']}>
              <button type="button" className={styles['menu-button']}>Мои курсы</button>
            </Link>
          </li>
          <li>
            <button type="button" className={styles['menu-button']}>
              <span>Мой хелп</span>
            </button>
          </li>
          <li>
            <Link to="/teach/courses/new" className={styles['menu-link']}>
              <button type="button" className={styles['menu-button']}>Создать курс</button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
