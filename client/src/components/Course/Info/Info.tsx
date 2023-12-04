import React, { useState, useEffect} from 'react'
import styled from './Info.module.css'
import Course from '../Course'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Link, Outlet, useParams } from 'react-router-dom';
import { addfullCourse } from '../../../store/slice/fullCourseSlice';

export default function Info(): JSX.Element {
  const [data, setData] = useState({});
  const user = useAppSelector((store) => store.userSlice.user);
  const course = useAppSelector((store) => store.courseSlice.course);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    void (async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/study/${id}`, {
        credentials: 'include',
      });

      if (response.status === 200) {
        const result = await response.json();
        dispatch(addfullCourse(result));
        console.log('info');
      }
    })();
  }, []);


  return (
    <div className={styled.infocontainer}>
      <div className={styled.inforightcont}>
        <div className={styled.headertitle}>Описание</div>
        <div className={styled.bodycontentcontainer}>
          <div className={styled.leftcont}>
            <div className={styled.promocont}>
              <div className={styled.promotitle}>У этого курса есть промо страница</div>
              <div className={styled.btnpromocont}>
                <Link className={styled.btnrefcheckpromo} to={`/course/${id}/promo`}>Посмотреть</Link>
                {/* <button className={styled.btnrefcheckpromo}>Посмотреть</button> */}
              </div>
            </div>
            <div className={styled.aboutcourse}>
              <div className={styled.headeraboutcourse}>Описание курса</div>
              <div className={styled.contentaboutcourse}>{course.long_description}</div>
            </div>
            <div className={styled.teachercont}>
                <div className={styled.teacherheader}>Преподаватели</div>
                <div className={styled.teachcontent}>
                  <div className={styled.imgteacher}>
                    <img src="/src/assets/react.svg" alt="" />
                  </div>
                  <div className={styled.teachfirstname}>{user.firstName}</div>
                  <div className={styled.teachlastname}>{user.lastName}</div>
                </div>
              </div>
          </div>
          <div className={styled.rightcont}>
            <div className={styled.btnconteditinfo}>
              <Link className={styled.btneditinfo} to={`/course/${id}/edit`}>Редактировать информацию</Link>
            </div>
            <div className={styled.shortdescripcontainer}>
              <div className={styled.headershortdescrip}>Краткое описание</div>
              <div className={styled.shortdescripcontent}>{course.short_description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
