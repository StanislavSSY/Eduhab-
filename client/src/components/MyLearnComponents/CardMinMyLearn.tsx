import React from 'react';
import { Link } from 'react-router-dom';

export default function CardMinMyLearn({ course }): JSX.Element {
  return (
    <div
      style={{
        border: '1px solid black',
        width: '820px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <img
        style={{ width: '100px' }}
        src={`/img/${course.image_url}`}
        alt={`${course.title} image`}
      />
      <div>
        <h3>{course.title}</h3>
        <p>{`${course.completed} / ${course.stepsNum}`}</p>
      </div>

      <Link to={`/teach/courses/${course.id}/lesson/1/step/1`}>
        <button type="button">Продолжить</button>
      </Link>
    </div>
  );
}
