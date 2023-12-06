import React, { useEffect, useState } from "react";
import CardProgress from "../../../components/MyLearnComponents/CardProgress";
import UserStatMyLearn from "../../../components/MyLearnComponents/UserStatMyLearn";
import CardMinMyLearn from "../../../components/MyLearnComponents/CardMinMyLearn";
import { useAppSelector } from "../../../store/hooks";
import styled from "./MyLearnIndex.module.css";
import axios from "axios";

export default function MyLearnIndex() {
  const [courses, setCourses] = useState([]);
  const [allCompleted, setAllCompleted] = useState(0);

  const { user } = useAppSelector((store) => store.userSlice);

  useEffect(() => {
    void (async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/entries/info`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const coursesRaw = response.data;
        console.log(coursesRaw);

        const coursesData = coursesRaw.map((el) => ({
          id: el.id,
          title: el.title,
          image_url: el.image_url,
          completed: el.progress.length,
          stepsNum: el.stepsNum,
        }));
        setCourses(coursesData);
        if (coursesData.length) {
          const aComp = coursesData.reduce((acc, el) => acc + el.completed, 0);
          setAllCompleted(aComp);
        }
      }
    })();
  }, []);

  return (
    <div className={styled.container}>
      <h1>Моё обучение</h1>
      {courses.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardProgress course={courses[0]} />
          <UserStatMyLearn allCompleted={allCompleted} />
        </div>
      )}
      <h2>Прохожу сейчас</h2>
      <div>
        {courses.map((el) => (
          <CardMinMyLearn course={el} key={el.id} />
        ))}
      </div>
    </div>
  );
}
