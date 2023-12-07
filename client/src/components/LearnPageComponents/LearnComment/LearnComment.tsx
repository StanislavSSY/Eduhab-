import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

export default function LearnComment() {
  const { stepNum } = useParams();
  const { steps } = useAppSelector((store) => store.stepsSlice);

  const [comment, setComment] = useState([]);
  const checkStep = () => {
    const oneStep = steps.find((el) => {
      return el.stepNum === stepNum;
    });

    return oneStep.id;
  };

  console.log("⚠️  【xaqx】➜ ", checkStep());

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/comments/${checkStep()}`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      setComment(result);
    })();
  }, [stepNum]);

  console.log("⚠️  【comment】➜ ", comment);

  return <div>{/* <a>fwefwef</a> */}</div>;
}
