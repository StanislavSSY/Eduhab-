import React, { memo, useEffect, useState } from "react";
import styled from "./LearnTextComponent.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
export default function LearnTextComponent({ id, title }) {
  const [step, setStep] = useState({});
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
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/entries/${courseid}/${stepNum}`,
        {
          credentials: "include",
          method: "PATCH",
        }
      );

      const data = await response.json();
      console.log("⚠️  【data】➜ ", data);
    })();
  }, [buttonClicked]);

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
          {buttonClicked ? (
            <div className={styled["button-next"]}>
              Следующий шаг <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
          ) : (
            <div
              onClick={() => setButtonClicked(true)}
              className={styled["button-next"]}
            >
              Изучить
            </div>
          )}
        </div>
      </div>
    </>
  );
}
