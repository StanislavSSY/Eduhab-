import React from 'react';
import { Link } from 'react-router-dom';

export default function CardProgress({ course }): JSX.Element {
  return (
    <div>
      <div>
        <h3>{course.title}</h3>
        <img
          style={{ width: '100px' }}
          src={`/img/${course.image_url}`}
          alt={`${course.title} image`}
        />
      </div>
      <div>
        <progress value={Number(course.completed) / Number(course.stepsNum)} />
        <p>{`${Math.floor(
          (Number(course.completed) / Number(course.stepsNum)) * 100
        )}%`}</p>
        <p>{`${course.completed} / ${course.stepsNum}`}</p>
      </div>

      <Link to={`/teach/courses/${course.id}/lesson/1/step/1`}>
        <button type="button">Продолжить</button>
      </Link>
    </div>
  );
}
