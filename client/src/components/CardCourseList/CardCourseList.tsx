import React from "react";
import styled from "./CardCourseList.module.css";
import CardCourse from "../CardCourse/CardCourse";

export default function CardCourseList() {
  return (
    <div className={styled["card-list"]}>
      <CardCourse />
      <CardCourse />
      <CardCourse />
      <CardCourse />
      <CardCourse />
      <CardCourse />
    </div>
  );
}
