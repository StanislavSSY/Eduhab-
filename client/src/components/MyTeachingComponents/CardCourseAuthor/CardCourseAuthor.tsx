import React, { useEffect, useRef, useState } from 'react';
import styled from './CardCourseAuthor.module.css';
import { Link, useNavigate } from "react-router-dom";
import { CoursesType } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { delCourse } from '../../../store/slice/courseSlice';
import { delCoursein } from '../../../store/slice/coursesSLice';

import { BsThreeDotsVertical } from "react-icons/bs";

export default function CardCourseAuthor({ el }: CoursesType): JSX.Element {
  const [status, setStatus] = useState(false);
  const course = useAppSelector((store) => store.courseSlice.course);
  const dispatch = useAppDispatch();
  const dropmenu = useRef(null);

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

  function closeMenu(): void {
    setStatus(false);
  }

  function openMenu(): void {
    setStatus(true);
  }

  function handleClickOutside(e): void {
    if (dropmenu.current && !dropmenu.current.contains(e.target)) {
      closeMenu();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  },[]);

  return (
    <div className={styled.cardcontainer}>
      <div className={styled.headercontent}>
        <div className={styled.leftcontent}>
          <img className={styled.imgcourse} src= {`/img/${el.image_url}`}/>
          <div className={styled.textcont}>
            <Link className={styled.texttile} to={`/course/${el.id}/info`}>{el.title}</Link>
            <div className={styled.price}>
            {el.new_price ? (
              el.old_price !== 0 ? (
              <div>
                <span className={styled['last-price']}>
                  {el.old_price && el.old_price}
                </span>
                <span className={styled['actual-price']}>
                  {el.new_price && el.new_price} ₽
                </span>
              </div>
              ) : (
              <span className={styled.withoutsale}>{el.new_price} ₽</span>
              )
            ) : (
              <div className={styled['free-price']}>Бесплатно</div>
            )}
            </div>
          </div>
        </div>

        <div className={styled.rightcontent}>
          <button onClick={openMenu} className={styled.vertmenu}>
            <BsThreeDotsVertical />
          </button>
          <div ref={dropmenu} className={`${styled.cardvertmenu} ${status ? styled.visible : ''}`}>
            <Link to={`/course/${el.id}/plan/edit`} className={styled.btnrefedit}>Редактировать</Link>
            <button onClick={() => void delCourseHandler()} className={styled.btndelcourse}>удалить</button>
          </div>
        </div>
      </div>
      <div className={styled.polocka}></div>
    </div>
  );
}