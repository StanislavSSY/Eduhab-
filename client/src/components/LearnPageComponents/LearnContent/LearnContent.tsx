import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styled from "./LearnContent.module.css";

import { Link, useParams } from "react-router-dom";
import { initSteps } from "../../../store/thunkActions";
import LearnTextComponent from "../LearnTextComponent/LearnTextComponent";

function LearnContent({ title, setUpdateNav }) {
  const dispatch = useAppDispatch();
  const { steps } = useAppSelector((store) => store.stepsSlice);
  const [actualComponent, setActualComponent] = useState(<></>);

  const { lessonid, stepNum, courseid } = useParams();

  useEffect(() => {
    const stepFinded = structuredClone(
      steps.find((el) => el.stepNum === stepNum)
    );
    if (stepFinded) {
      if (stepFinded?.type === "TEXT") {
        setActualComponent(
          <LearnTextComponent
            title={title}
            id={stepFinded.id}
            setUpdateNav={setUpdateNav}
          />
        );
      }
    }
  }, [stepNum, steps, title]);

  useEffect(() => {
    dispatch(initSteps(lessonid));
  }, [lessonid]);

  return (
    <div className={styled["content-main"]}>
      <div className={styled["actual-component"]}>{actualComponent}</div>{" "}
    </div>
  );
}

export default memo(LearnContent);
