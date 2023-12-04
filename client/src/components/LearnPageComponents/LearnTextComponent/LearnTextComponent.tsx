import React, { memo, useEffect, useState } from "react";
import styled from "./LearnTextComponent.module.css";
export default function LearnTextComponent({ id, title }) {
  const [step, setStep] = useState({});
  useEffect(() => {
    (async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/steps/${id}`, {
        credentials: "include",
      });

      const data = await response.json();
      setStep(data);
    })();
  }, [id]);

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
          <div className={styled["button-next"]}>
            Следующий шаг <i class="fa fa-angle-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </>
  );
}
