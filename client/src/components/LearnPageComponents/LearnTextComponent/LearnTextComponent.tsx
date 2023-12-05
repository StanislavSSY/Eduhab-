import React, { memo, useEffect, useState } from "react";
import styled from "./LearnTextComponent.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
export default function LearnTextComponent({ id, title }) {
  const [step, setStep] = useState({});

  const { entry } = useAppSelector((store) => store.entrySlice);
  const { steps } = useAppSelector((store) => store.stepsSlice);

  const [buttonClicked, setButtonClicked] = useState(false);
  const { stepNum, courseid } = useParams();

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

        const data = await response.json();
        console.log("⚠️  【data】➜ ", data);
      }
    })();
  }, [buttonClicked]);

  const checkStep = () => {
    const oneStep = steps.find((el) => {
      return el.stepNum === stepNum;
    });

    return entry.progress.includes(oneStep.id);
  };
  console.log("⚠️  checkStep【】➜ ", checkStep());
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
            <div
              onClick={() => setButtonClicked(!checkStep())}
              className={styled["button-next"]}
            >
              Изучить
            </div>
            <div className={styled["button-next"]}>
              Следующий шаг{" "}
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
