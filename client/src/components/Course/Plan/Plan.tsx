import React, { useState, useEffect } from 'react'
import styled from './Plan.module.css'
import { Link, useParams } from 'react-router-dom'
import Lesson from './Lesson/Lesson';
import Module from './Module/Module';
import { BigCourseType } from '../../../types';
import { useAppDispatch } from '../../../store/hooks';
import { addfullCourse } from '../../../store/slice/fullCourseSlice';


export default function Plan(): JSX.Element {
  const [data, setData] = useState<BigCourseType>({})
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void (async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/study/${id}`, {
        credentials: 'include',
        method: 'GET',
      });
      
      if (response.status === 200) {
        const result = await response.json();
        setData(result);
        dispatch(addfullCourse(result))
      }
    })();
  }, []);

  return (
    <div className={styled.coursestructurecontainer}>
      <div className={styled.headertitle}>Программа курса</div>
      <div className={styled.editstructuredbtncont}>
        <Link className={styled.linktorefedit} to={`/course/${id}/plan/edit`}>Редактировать Содержимое</Link>
      </div>
      <div className={styled.structuredcontent}>
        {data.Modules?.length >= 1 ? (
          data.Modules.map((modul, i) => (
            <div className={styled.struccontent} key={modul.id}>
              <Module key={modul.id} module={modul} i={i + 1} />
              {modul.Lessons.map((lesson, l) => (
              <Lesson key={lesson.id} lesson={lesson} m={i + 1} l={l + 1}/>
              ))}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}