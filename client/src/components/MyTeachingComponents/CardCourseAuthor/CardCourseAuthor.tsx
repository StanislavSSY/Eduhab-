import React from 'react';
import styled from './CardCourseAuthor.module.css';
import { Link, useNavigate } from "react-router-dom";
import { CoursesType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { delCourse } from '../../../store/slice/courseSlice';
import { delCoursein } from '../../../store/slice/coursesSLice';

export default function CardCourseAuthor({ el }: CoursesType): JSX.Element {
  const course = useAppSelector((store) => store.courseSlice.course);
  const dispatch = useAppDispatch();

  async function delCourseHandler(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/courses/${el.id}`, {
      credentials: 'include',
      method: 'DELETE',
    });
    if (response.status === 200) {
      if (course.id === el.id) {
        dispatch(delCourse({}));
      }
      dispatch(delCoursein({ id: el.id }));
    }
  }

  return (
    <div className={styled["main-link"]}>
      <div className={styled["course-cards"]}>
        <div className={styled["top-block"]}>
          <div className={styled.text}>
            <Link to={`/course/${el.id}/info`}>{el.title}</Link>
          </div>
          <img src= {el.image_url}/>
        </div>
        <div className={styled.widgets}>
          <i className="fa fa-star" aria-hidden="true"></i> {el.rate}
          <i className="fa fa-user" aria-hidden="true"></i> {el.quantity_people}
          <i className="fas fa-clock"></i> {el.time_passage}
        </div>
        <button onClick={() => void delCourseHandler()} className={styled.btndelcourse}>удалить</button>

        {/* <div className={styled.price}>
          <span className={styled["last-price"]}>Начальная стоимость: 1 299 руб.</span>
          <br />
          <span className={styled["actual-price"]}>Актуальная стоимость: 899 руб.</span>
        </div> */}
      </div>
    </div>
  );
}