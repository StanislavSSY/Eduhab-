import React from "react";
import styled from "./CardCourse.module.css";
import { Link } from "react-router-dom";

export default function CardCourse(): JSX.Element {
  return (
    <Link className={styled["main-link"]} to={"/"}>
      <div className={styled["course-cards"]}>
        <div className={styled["top-block"]}>
          <span className={styled.like}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </span>
          <div className={styled.text}>
            <Link to={"/"}>
              <h3>Основы SMM ВКонтакте без "воды" с нуля до специалиста</h3>
            </Link>
            <Link to={"/"}>
              <span>Владислава Шлепцова</span>
            </Link>
          </div>
          <img src="https://cdn.stepik.net/media/cache/images/courses/115018/cover_2pHpRcf/11ab681f09f1df98cc47e9c5ad25d47c.png" />
        </div>
        <div className={styled.widgets}>
          <i className="fa fa-star" aria-hidden="true"></i> 5
          <i className="fa fa-user" aria-hidden="true"></i> 235
          <i className="fas fa-clock"></i> 5 ч
          <i className="fa fa-address-card" aria-hidden="true"></i>
        </div>

        <div className={styled.price}>
          <span className={styled["last-price"]}>1 299</span>
          <span className={styled["actual-price"]}>899 ₽</span>
        </div>
      </div>
    </Link>
  );
}
