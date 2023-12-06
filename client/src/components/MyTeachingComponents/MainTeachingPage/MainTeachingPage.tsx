import React, { useState, useEffect} from 'react';
import styles from './MainTeachingPage.module.css';
import { Link } from 'react-router-dom';
import MenuMyTeaching from '../MenuMyTeaching/MenuMyTeaching';
import CardCourseAuthor from '../CardCourseAuthor/CardCourseAuthor';
import { CoursesTypes } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addCourses } from '../../../store/slice/coursesSLice';
import Search from '../Searchv3/Search';


export default function MainTeachingPage(): JSX.Element {
  const [coursesState, setCourses] = useState<CoursesTypes>([]);
  const courses = useAppSelector((store) => store.coursesSlice.courses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCourses(courses);
  }, [courses])

  useEffect(() => {
    void(async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/courses/user`, {
        credentials: 'include',
      });

      if (response.status === 200) {
        const result = await response.json();
        setCourses(result);
        dispatch(addCourses(result));
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
            <Search coursesState={coursesState} setCourses={setCourses} />
          </div>
          <div className={styles.coursecontainer}>
            {coursesState.map((el) => (
              <CardCourseAuthor el={el} key={el.id} />
            ))}
          </div>
        </div>
      </div>
  );
}
