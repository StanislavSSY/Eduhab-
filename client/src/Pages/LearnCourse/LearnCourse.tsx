import LearnSideBarMenu from "../../components/LearnPageComponents/LearnSideBarMenu/LearnSideBarMenu";
import LearnContent from "../../components/LearnPageComponents/LearnContent/LearnContent";
import styled from "./LearnCourse.module.css";
import LearnNavbar from "../../components/LearnPageComponents/LearnNavbar/LearnNavbar";
import { useState } from "react";
export default function LearnCourse() {
  const [title, setTitle] = useState("");

  return (
    <div className={styled["page-main"]}>
      <LearnNavbar />
      <LearnSideBarMenu getTitle={setTitle} />
      <LearnContent title={title} />
    </div>
  );
}
