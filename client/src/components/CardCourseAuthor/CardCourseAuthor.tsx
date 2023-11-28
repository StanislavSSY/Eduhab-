import React from 'react';
import styled from './CardCourseAuthor.module.css';
import { Link } from "react-router-dom";

export default function CardCourseAuthor() {
  return (


    
    <Link className={styled["main-link"]} to={"/"}>
      <div className={styled["course-cards"]}>
        <div className={styled["top-block"]}>
        
          <div className={styled.text}>
          <span>Номер ID: 5</span>
       
            <Link to={"/"}>
              Основы SMM ВКонтакте без "воды" с нуля до специалиста
            </Link>
           
          </div>
          <img src="https://cdn.stepik.net/media/cache/images/courses/115018/cover_2pHpRcf/11ab681f09f1df98cc47e9c5ad25d47c.png" />
        </div>
        <div className={styled.widgets}>
          <i className="fa fa-star" aria-hidden="true"></i> 5
    
          <i className="fa fa-user" aria-hidden="true"></i> 235
          <i className="fas fa-clock"></i> 5 ч
          
        </div>

        <div className={styled.price}>
          <span className={styled["last-price"]}>Начальная стоимость: 1 299 руб.</span>
          <br />
          <span className={styled["actual-price"]}>Актуальная стоимость: 899 руб.</span>
        </div>
      </div>
    </Link>
  );
}