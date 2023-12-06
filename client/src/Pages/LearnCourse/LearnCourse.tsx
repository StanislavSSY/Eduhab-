import LearnSideBarMenu from "../../components/LearnPageComponents/LearnSideBarMenu/LearnSideBarMenu";
import LearnContent from "../../components/LearnPageComponents/LearnContent/LearnContent";
import styled from "./LearnCourse.module.css";
import LearnNavbar from "../../components/LearnPageComponents/LearnNavbar/LearnNavbar";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addProgress } from "../../store/slice/entrySlice";
import { useParams } from "react-router-dom";
export default function LearnCourse() {
  const [title, setTitle] = useState("");

  // const [progress, setProgress] = useState("");
  const { courseid } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/entries/progress/${courseid}`,
        {
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const result = await response.json();
        dispatch(addProgress(result));
      } else {
        console.log("⚠️  【err】➜ ");
      }
    })();
  }, []);

  return (
    <div className={styled["page-main"]}>
      <LearnNavbar />
      <LearnSideBarMenu getTitle={setTitle} />
      <LearnContent title={title} />
    </div>
  );
}
