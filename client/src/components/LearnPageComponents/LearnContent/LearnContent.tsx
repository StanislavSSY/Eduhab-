import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styled from "./LearnContent.module.css";

import { Link, useParams } from "react-router-dom";
import { initSteps } from "../../../store/thunkActions";
import LearnTextComponent from "../LearnTextComponent/LearnTextComponent";

function LearnContent() {
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
        setActualComponent(<LearnTextComponent id={stepFinded.id} />);
      }
    }
  }, [stepNum, steps]);

  useEffect(() => {
    dispatch(initSteps(lessonid));
  }, [lessonid]);

  return (
    <div className={styled["content-main"]}>
      <div className={styled.steps}>
        {steps.map((el) => (
          <Link
            key={el.stepNum}
            to={`/teach/courses/${courseid}/lesson/${lessonid}/step/${el.stepNum}`}
          >
            <span
              className={
                el.stepNum == stepNum
                  ? styled["step-box-active"]
                  : styled["step-box"]
              }
            ></span>
          </Link>
        ))}
      </div>
      <div className={styled["actual-component"]}>{actualComponent}</div>{" "}
    </div>
  );
}

export default memo(LearnContent);
