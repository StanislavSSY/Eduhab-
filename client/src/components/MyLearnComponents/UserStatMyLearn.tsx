import React from "react";

export default function UserStatMyLearn() {
  const { days, allCompleted } = { days: 5, allCompleted: 275 };
  return (
    <div>
      <div>{`${days} дней без перерыва`}</div>
      <div>{`${allCompleted} задач решено`}</div>
    </div>
  );
}
