import LearnSideBarMenu from "../../components/LearnPageComponents/LearnSideBarMenu/LearnSideBarMenu";
import LearnContent from "../../components/LearnPageComponents/LearnContent/LearnContent";
import styled from "./LearnCourse.module.css";
export default function LearnCourse() {
  return (
    <div className={styled["page-main"]}>
      <LearnSideBarMenu />
      <LearnContent />
    </div>
  );
}
