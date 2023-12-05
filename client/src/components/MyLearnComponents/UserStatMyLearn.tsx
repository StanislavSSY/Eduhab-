import React from 'react';

export default function UserStatMyLearn({ allCompleted }) {
  return (
    <div>
      <div>{`${allCompleted} задач решено`}</div>
    </div>
  );
}
