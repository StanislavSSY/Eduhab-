import React from "react";
import CardProgress from "../../../components/MyLearnComponents/CardProgress/CardProgress";
import UserStatMyLearn from "../../../components/MyLearnComponents/UserStatMyLearn/UserStatMyLearn";
import CardMinMyLearn from "../../../components/MyLearnComponents/CardMinMyLearn/CardMinMyLearn";

export default function MyLearnIndex() {
  const zagluhskaObj = {
    title: "HTML",
    imgUrl: "/vite.svg",
    completed: "14",
    stepsNum: "101",
    courseUrl: "nashurl",
  };
  const zagluhskaObjs = [
    { ...zagluhskaObj, id: 1 },
    { ...zagluhskaObj, id: 2 },
    { ...zagluhskaObj, id: 3 },
  ];
  console.log(zagluhskaObjs);
  return (
    <>
      <h1>Моё обучение</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardProgress />
        <UserStatMyLearn />
      </div>
      <h2>Прохожу сейчас</h2>
      <div>
        {zagluhskaObjs.map((el) => (
          <CardMinMyLearn zagluhskaObj={el} key={el.id} />
        ))}
      </div>
    </>
  );
}
