import React, { useState, useEffect } from "react";
import styled from "./CardCourseList.module.css";
import CardCourse from "../CardCourse/CardCourse";

export default function CardCourseList(): JSX.Element {
  const [data, setData] = useState([]);

  useEffect(() => {
    void(async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/courses`, {
        credentials: 'include',
      })

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        setData(result);
      }
    })();
  }, []);

  return (
    <div className={styled["card-list"]}>
      {data.length >= 1 ? (
        data.map((el) => (
          <div key={el.id}>
            <CardCourse el={el} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
