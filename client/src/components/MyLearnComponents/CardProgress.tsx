import React from "react";
import { Link } from "react-router-dom";
import styled from "./CardProgress.module.css";
export default function CardProgress({ course }): JSX.Element {
  return (
    <div className={styled.container}>
      <div className={styled["top-box"]}>
        <h3>{course.title}</h3>
        <img
          src={`/img/${
            course.image_url ? course.image_url : "/ava-course.png"
          }`}
          alt={`${course.title} image`}
        />
      </div>
      <div>
        <div className={styled["progress-conteiner"]}>
          <div
            className={styled.progress}
            style={{
              width: `${
                (Number(course.completed) / Number(course.stepsNum)) * 100
              }%`,
            }}
          ></div>
        </div>
        {/* <progress value={Number(course.completed) / Number(course.stepsNum)} /> */}
        <p>
          {`${Math.floor(
            (Number(course.completed) / Number(course.stepsNum)) * 100
          )}%`}{" "}
          <span>материала пройдено</span>
        </p>
        <p>
          {`${course.completed}/${course.stepsNum}`} <span>шагов</span>
        </p>
      </div>
      <div>
        <Link to={`/teach/courses/${course.id}/lesson/1/step/1`}>
          Продолжить
        </Link>
      </div>
    </div>
  );
}
