import React, { useState, useEffect} from 'react';
import styles from './MainTeachingPage.module.css';
import { Link } from 'react-router-dom';
import MenuMyTeaching from '../MenuMyTeaching/MenuMyTeaching';
import CardCourseAuthor from '../CardCourseAuthor/CardCourseAuthor';
import { CoursesTypes } from '../../../types';


export default function MainTeachingPage(): JSX.Element {
  const [courses, setCourses] = useState<CoursesTypes>([]);
  useEffect(() => {
    void(async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/courses/user`, {
        credentials: 'include',
      });

      if (response.status === 200) {
        const result = await response.json();
        setCourses(result);
      }
    })();
  }, [])
    return (
      <div className={styles.containeryourcourse}>
        <div className={styles.leftcont}>
          <MenuMyTeaching />
        </div>
        <div className={styles.rightcont}>
          <div className={styles.title}>Курсы</div>
          <div className={styles.filtercourse}>
            <div className={styles.filter}>Тут будет селект фильтр</div>
            <div>Тут будет поиск</div>
          </div>
          <div className={styles.coursecontainer}>
            {courses.map((el) => (
              <CardCourseAuthor  el={el} key={el.id} />
            ))}
          </div>
        </div>
      </div>
  );
}
