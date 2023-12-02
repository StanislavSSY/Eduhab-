import React, { useState } from 'react'
import styled from './Lesson.module.css'
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';
import { BsFillPencilFill } from "react-icons/bs";

export default function Lesson({ lesson, m, l}): JSX.Element {
  const [check, setCheck] = useState();
  const { id } = useParams();

  return (
    <div className={clsx(`${styled.lessoncontainer} ${styled.border}`)}>
      <div className={styled.leftcont}>
        <div className={styled.imgidk}>
          <img className={styled.imgmain} src="/src/assets/react.svg" alt="" />
        </div>
        <div className={styled.counter}>{m}.{l}.</div>
        <div className={styled.lessontitle}>
          <Link className={styled.reftitle} to={`/course/${id}/lesson/${lesson.id}/step/1`} >{lesson.title}</Link>
        </div>
      </div>
      <div className={styled.rightcont}>
        <div className={styled.btnlessoneditcont}>
          <Link to={`/course/${id}/edit-lesson/${lesson.id}/step/1`} className={styled.linkreflessonedit}>
            <BsFillPencilFill/>
          </Link>
        </div>
      </div>
    </div>
  )
}
