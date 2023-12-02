import React, { memo, useEffect, useState } from "react";

export default function LearnTextComponent({ id }) {
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
  return <div>{step.data}</div>;
}
