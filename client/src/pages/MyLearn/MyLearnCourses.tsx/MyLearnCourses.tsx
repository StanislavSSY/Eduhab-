import React, { useEffect, useState } from "react";
import CardMinMyLearn from "../../../components/MyLearnComponents/CardMinMyLearn";
import axios from "axios";
import { useAppSelector } from "../../../store/hooks";

export default function MyLearnCourses() {
  const [courses, setCourses] = useState([]);

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
      }
    })();
  }, []);
  return (
    <>
      <h1>Курсы</h1>
      <div>
        {courses.map((el) => (
          <CardMinMyLearn course={el} key={el.id} />
        ))}
      </div>
    </>
  );
}
