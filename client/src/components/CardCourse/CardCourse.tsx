import React from "react";
import styled from "./CardCourse.module.css";
import { Link } from "react-router-dom";
import { CourseType } from "../../types";

export default function CardCourse({ el }: CourseType ): JSX.Element {
  return (
    <Link className={styled["main-link"]} to={"/"}>
      <div className={styled["course-cards"]}>
        <div className={styled["top-block"]}>
          <span className={styled.like}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </span>
          <div className={styled.text}>
            <Link to={`/course/${el.id}/promo`}>
              <h3>{el.title}</h3>
            </Link>
            <Link to={"/"}>
              <span>{el.User.firstName} {el.User.lastName}</span>
            </Link>
          </div>
          <img src={`${el.image_url}`} />
        </div>
        <div className={styled.widgets}>
          <i className="fa fa-star" aria-hidden="true"></i> {el.rate}
          <i className="fa fa-user" aria-hidden="true"></i> {el.quantity_people}
          <i className="fas fa-clock"></i> {el.time_passage}
          <i className="fa fa-address-card" aria-hidden="true"></i>
        </div>

        <div className={styled.price}>
          <span className={styled["last-price"]}>{el.old_price && el.old_price}</span>
          <span className={styled["actual-price"]}>{el.new_price && el.new_price}</span>
        </div>
      </div>
    </Link>
  );
}
