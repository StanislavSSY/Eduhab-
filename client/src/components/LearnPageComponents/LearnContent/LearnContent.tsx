import React, { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { Link, useParams } from "react-router-dom";
import LearnTextComponent from "../../LearnTextComponent/LearnTextComponent";
import { initSteps } from "../../../store/thunkActions";

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
    <>
      {steps.map((el) => (
        <Link
          key={el.stepNum}
          to={`/teach/courses/${courseid}/lesson/${lessonid}/step/${el.stepNum}`}
        >
          <button
            type="button"
            style={el.stepNum == stepNum ? { backgroundColor: "green" } : {}}
          >
            <span>Some image</span>
          </button>
        </Link>
      ))}
      <div>{actualComponent}</div>
    </>
  );
}

export default memo(LearnContent);
