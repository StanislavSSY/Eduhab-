import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styled from "./LearnContent.module.css";

import { Link, useParams } from "react-router-dom";
import { initSteps } from "../../../store/thunkActions";
import LearnTextComponent from "../LearnTextComponent/LearnTextComponent";
import LearnComment from "../LearnComment/LearnComment";

import VideoStep from "./VideoStep";

function LearnContent({ title }) {
  const dispatch = useAppDispatch();
  const { steps } = useAppSelector((store) => store.stepsSlice);
  const [actualComponent, setActualComponent] = useState(<></>);
  const [actualid, setActualID] = useState(0);

  const { lessonid, stepNum, courseid } = useParams();

  useEffect(() => {
    const stepFinded = structuredClone(
      steps.find((el) => el.stepNum === stepNum)
    );
    if (stepFinded) {
      if (stepFinded?.type === "TEXT") {
        setActualComponent(
          <LearnTextComponent title={title} id={stepFinded.id} />
        );
        setActualID(stepFinded.id);
      } else if (stepFinded?.type === "VIDEO") {
        setActualComponent(<VideoStep title={title} id={stepFinded.id} />);
      }
    }
  }, [stepNum, steps, title]);

  useEffect(() => {
    dispatch(initSteps(lessonid));
  }, [lessonid]);

  return (
    <div className={styled["content-main"]}>
      <div className={styled["actual-component"]}>{actualComponent}</div>{" "}
      <div className={styled.commentscontent}>
        <LearnComment />
      </div>
    </div>
  );
}

export default memo(LearnContent);
