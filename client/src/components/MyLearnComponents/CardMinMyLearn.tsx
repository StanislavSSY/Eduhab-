import React from "react";
import { Link } from "react-router-dom";

export default function CardMinMyLearn({ zagluhskaObj }): JSX.Element {
  const { title, imgUrl, completed, stepsNum, courseUrl } = zagluhskaObj;
  return (
    <div
      style={{
        border: "1px solid black",
        width: "820px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <img src={imgUrl} alt={`${title} image`} />
      <div>
        <h3>{title}</h3>
        <p>{`${completed} / ${stepsNum}`}</p>
      </div>

      <Link to={courseUrl}>
        <button type="button">Продолжить</button>
      </Link>
    </div>
  );
}
