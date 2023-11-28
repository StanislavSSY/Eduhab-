import React from "react";
import CardProgress from "../../../components/MyLearnComponents/CardProgress/CardProgress";
import UserStatMyLearn from "../../../components/MyLearnComponents/UserStatMyLearn/UserStatMyLearn";
import CardMinMyLearn from "../../../components/MyLearnComponents/CardMinMyLearn/CardMinMyLearn";

export default function MyLearnCourses() {
  const zagluhskaObj = {
    title: "HTML",
    imgUrl: "/vite.svg",
    completed: "14",
    stepsNum: "101",
    courseUrl: "nashurl",
  };
  const zagluhskaObjs = [
    { ...zagluhskaObj, id: 4 },
    { ...zagluhskaObj, id: 5 },
    { ...zagluhskaObj, id: 6 },
  ];
  console.log(zagluhskaObjs);
  return (
    <>
      <h1>Курсы</h1>
      <div>
        {zagluhskaObjs.map((el) => (
          <CardMinMyLearn zagluhskaObj={el} key={el.id} />
        ))}
      </div>
    </>
  );
}
