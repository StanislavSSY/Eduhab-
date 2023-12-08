import React, { memo, useEffect, useState } from "react";
import styled from "./LearnTextComponent.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addProgress } from "../../../store/slice/entrySlice";
import LearnComment from "../LearnComment/LearnComment";

export default function LearnTextComponent({ id, title }) {
  const [step, setStep] = useState({});
  const { entry } = useAppSelector((store) => store.entrySlice);
  const { steps } = useAppSelector((store) => store.stepsSlice);

  const [buttonClicked, setButtonClicked] = useState(false);
  const dispatch = useAppDispatch();
  const { stepNum, courseid, lessonid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/steps/${id}`, {
        credentials: "include",
      });

      const data = await response.json();
      setStep(data);
    })();
  }, [id]);

  useEffect(() => {
    setButtonClicked(false);
  }, [stepNum]);

  useEffect(() => {
    console.log("⚠️  【@@@】➜ ");
    (async () => {
      if (buttonClicked) {
        const response = await fetch(
          `${import.meta.env.VITE_URL}/entries/${courseid}/${step.id}`,
          {
            method: "PATCH",
            credentials: "include",
          }
        );

        const result = await response.json();
        dispatch(addProgress(result.progress));
      }
    })();
  }, [buttonClicked]);

  const checkStep = () => {
    const oneStep = steps.find((el) => {
      return el.stepNum === stepNum;
    });

    return entry.progress.includes(oneStep?.id);
  };
  return (
    <>
      <div className={styled["title-content"]}>{title}</div>
      <div className={styled["body-fragment"]}>
        <div
          className={styled["body-content"]}
          dangerouslySetInnerHTML={{ __html: step.data }}
        ></div>
      </div>
      <div className={styled["footer-fragment"]}>
        <div className={styled["footer-content"]}>
          <div className={styled["button-fragment"]}>
            {!checkStep() && !buttonClicked ? (
              <div
                onClick={() => {
                  setButtonClicked(!checkStep());
                }}
                className={styled["button-next"]}
              >
                Изучить
              </div>
            ) : (
              <></>
            )}
            {stepNum !== steps.at(-1).stepNum && (
              <div
                onClick={() =>
                  navigate(
                    `/teach/courses/${courseid}/lesson/${lessonid}/step/${
                      Number(stepNum) + 1
                    }`
                  )
                }
                className={styled["button-next"]}
              >
                Следующий шаг{" "}
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
