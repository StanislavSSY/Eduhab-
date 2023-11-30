import React from 'react';
import styled from './CardCourseAuthor.module.css';
import { Link } from "react-router-dom";
import { CoursesType } from '../../../types';

export default function CardCourseAuthor({ el }: CoursesType): JSX.Element {


  return (
    <Link className={styled["main-link"]} to={`/`}>
      <div className={styled["course-cards"]}>
        <div className={styled["top-block"]}>
        
          <div className={styled.text}>
          <span>Номер ID: {el.id}</span>
       
            <Link to={`/course/${el.id}`}>
            {el.title}
            </Link>
           
          </div>
          <img src= {el.image_url}/>
        </div>
        <div className={styled.widgets}>
          <i className="fa fa-star" aria-hidden="true"></i> {el.rate}
          <i className="fa fa-user" aria-hidden="true"></i> {el.quantity_people}
          <i className="fas fa-clock"></i> {el.time_passage}
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