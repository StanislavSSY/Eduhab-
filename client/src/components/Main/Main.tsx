import React from "react";
import styled from './Main.module.css'
import FindCourse from "../FindCourse/FindCourse";
import OftenSearched from "../OftenSearched/OftenSearched";
import Authors from "../Authors/Authors";

export default function Main(): JSX.Element {
  return (
    <div className={styled.maincontainer}>
      <FindCourse />
      <div className={styled.mainbody}>
        <div className={styled.titlepopular}>Самые популярные:</div>
      </div>
      <OftenSearched />
      <Authors />
    </div>
  );
}
