import React from "react";

export default function UserStatMyLearn({ allCompleted }) {
  return (
    <div>
      <div>
        Количество пройденых шагов: <strong>{allCompleted}</strong>
      </div>
    </div>
  );
}
