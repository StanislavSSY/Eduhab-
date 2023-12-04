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

  useEffect(() => {
    console.log("⚠️  【setTitle】➜ ", title);
  }, [title]);

  return (
    <div>
      <div className={styled["title-content"]}>{title}</div>
      <div
        className={styled["body-content"]}
        dangerouslySetInnerHTML={{ __html: step.data }}
      ></div>
    </div>
  );
}
