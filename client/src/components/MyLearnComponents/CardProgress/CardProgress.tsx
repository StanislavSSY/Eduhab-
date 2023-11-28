import React from "react";
import { Link } from "react-router-dom";

export default function CardProgress(): JSX.Element {
  const zagluhskaObj = {
    title: "HTML",
    imgUrl: "vite.svg",
    completed: "14",
    stepsNum: "101",
    courseUrl: "nashurl",
  };
  const { title, imgUrl, completed, stepsNum, courseUrl } = zagluhskaObj;
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <img src={imgUrl} alt={`${title} image`} />
      </div>
      <div>
        <progress value={Number(completed) / Number(stepsNum)} />
        <p>{`${Math.floor((Number(completed) / Number(stepsNum)) * 100)}%`}</p>
        <p>{`${completed} / ${stepsNum}`}</p>
      </div>

      <Link to={courseUrl}>
        <button type="button">Продолжить</button>
      </Link>
    </div>
  );
}
