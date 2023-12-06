import React, { useState, useEffect } from 'react'
import styled from './Author.module.css'

export default function Author({ el }): JSX.Element {
  const [subs, setSubs] = useState(0);


  useEffect(() => {
    if (el.Courses.length > 1) {
      const totalQuantity = el.Courses.reduce((acc, cr) => {
        return acc + cr.quantity_people;
      }, 0);
      console.log(totalQuantity);
      setSubs(totalQuantity);
    }
  },[el]);

  return (
    <div className={styled.containerauthor}>
      <div className={styled.imgcontainer}>
        <img className={styled.imgauthor} src={`/img/${el.img_url}`} alt="" />
      </div>
      <div className={styled.rightcontent}>
        <div className={styled.nametitle}>{el.firstName} {el.lastName}</div>
        <div className={styled.downcontent}>
          <div className={styled.coursecontainer}>{el.Courses.length > 1 ? `Курсов: ${el.Courses.length}` : ''}</div>
          <div className={styled.subscontainer}>Подписчиков: {subs}</div>
        </div>
      </div>
    </div>
  )
}
