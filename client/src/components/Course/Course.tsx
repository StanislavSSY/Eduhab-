import React, { useState, useEffect} from 'react'
import styled from './Course.module.css'
import { Link, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { CourseInt, CourseType } from '../../types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../store/slice/courseSlice';
import { useAppSelector } from '../../store/hooks';
import Info from './Info/Info';
import InfoEdit from './InfoEdit/InfoEdit';
import Publication from './Publication/Publication';
import { addfullCourse } from '../../store/slice/fullCourseSlice';

export default function Course(): JSX.Element {
  const { id } = useParams();
  const [data, setData] = useState<CourseInt>({});
  const [isOpen, setIsOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const course = useAppSelector((store) => store.courseSlice.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    void(async() => {
      if (course.title === '') {
        const response = await fetch(`${import.meta.env.VITE_URL}/courses/${id}`, {
          credentials: 'include',
        });
  
        if (response.status === 200) {
          const result = await response.json();
          console.log(result);
          setData(result);
          dispatch(addCourse(result));
          const resp = await fetch(`${import.meta.env.VITE_URL}/study/${id}`, {
            credentials: 'include',
            method: 'GET',
          });
          if (resp.status === 200) {
            const res = await resp.json();
            dispatch(addfullCourse(res));
          }
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (course.title !== '') {
      setData(course)
      console.log(course);
    }
  }, [course])

  // useEffect(() => {
  //   navigate('info');
  // },[data])

  return (
    <div className={styled.coursecontainer}>
      <div className={styled.leftcont}>
        <div className={styled.imgcont}>
          <img className={styled.imgcourse} src={`/img/${course.image_url}`} alt="" />
        </div>
        <div className={styled.coursetitle}>{data.title}</div>
        <div className={styled.btnpubliccont}>
          <button className={styled.btnpubliccourse}>Опубликовать</button>
        </div>
        <ul className={styled.mainul}>
          <li className={styled.mainli}>
            <button onClick={() => setIsOpen(!isOpen)} className={styled.btnlist}>
            <div className={styled.listcont}>Курс</div>
          </button>
          <ul className={clsx(`${styled.podul} ${styled.vision} ${isOpen ? styled.active : ''}`)}>
              <li className={styled.podli}>
                <Link className={styled.reflink} to={'info'}>Описание</Link>
              </li>
              <li className={styled.podli}>
                <Link className={styled.reflink} to={'plan'}>Содержание</Link>
              </li>
            </ul>
          </li>
          {/* <li className={styled.mainli}>
            <button onClick={() => setSettingsIsOpen(!settingsIsOpen)} className={styled.btnlist}>
              <div className={styled.listcont}>Настройки</div>
            </button>
            <ul className={clsx(`${styled.podul} ${styled.vision} ${settingsIsOpen ? styled.active : ''}`)}>
              <li className={styled.podli}>
                <Link className={styled.reflink} to={'publication'}>Публикация</Link>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
      <div className={styled.rightcont}>
        <Outlet />
      </div>
    </div>
  )
}
