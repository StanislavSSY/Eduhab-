import React from 'react';
import styled from './CardCourseAuthor.module.css';
import { Link } from "react-router-dom";

export default function CardCourseAuthor({zagluhskaCardAuthor}) {
  const { id, title, imgUrl, star, users, time } = zagluhskaCardAuthor;
  console.log('nnnnnnnnnn', zagluhskaCardAuthor)
  return (


    
    <Link className={styled["main-link"]} to={"/"}>
      <div className={styled["course-cards"]}>
        <div className={styled["top-block"]}>
        
          <div className={styled.text}>
          <span>Номер ID: {id}</span>
       
            <Link to={"/"}>
            {title}
            </Link>
           
          </div>
          <img src= {imgUrl}/>
        </div>
        <div className={styled.widgets}>
          <i className="fa fa-star" aria-hidden="true"></i> {star}
    
          <i className="fa fa-user" aria-hidden="true"></i> {users}
          <i className="fas fa-clock"></i> {time.zagluhskaCardAuthor} ч
          
        </div>

        {/* <div className={styled.price}>
          <span className={styled["last-price"]}>Начальная стоимость: 1 299 руб.</span>
          <br />
          <span className={styled["actual-price"]}>Актуальная стоимость: 899 руб.</span>
        </div> */}
      </div>
    </Link>
  );
}