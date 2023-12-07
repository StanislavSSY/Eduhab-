import React, { ChangeEvent, useEffect, useState } from 'react';
import StepEdit from './StepEdit';
import { useAppDispatch } from '../../store/hooks';
import { Link, useParams } from 'react-router-dom';
import { initSteps } from '../../store/thunkActions';

import './EditLesson.css';

export default function EditLesson() {
  const { lessonid } = useParams();
  const [input, setInput] = useState({ title: '' });
  const [data, setData] = useState('');
  const [stepId, setStepId] = useState({ id: '', type: '' });
  const dispatch = useAppDispatch();
  const [courseid, setCourseid] = useState('');

  useEffect(() => {
    void (async () => {
      const lesson = await fetch(`http://localhost:3100/lessons/${lessonid}`);
      const lessonData = await lesson.json();
      setInput({ title: lessonData.title });
      setCourseid(lessonData.Module.courseid);
    })();
  }, []);

  useEffect(() => {
    dispatch(initSteps(lessonid));
  }, [dispatch]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async () => {
    const resultLesson = await fetch(
      `http://localhost:3100/lessons/${lessonid}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.title }),
      }
    );
    const newTitle = (await resultLesson.json()).title;
    setInput({ title: newTitle });
    if (data) {
      const resultStep = await fetch(
        `http://localhost:3100/steps/${stepId.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data, type: stepId.type }),
        }
      );
      const stepData = await resultStep.json();
      setData(stepData.data);
    }
  };
  return (
    <div className="edit-container">
      <div className="lesson-header">
        <div className="lesson-editor-header">Настройки урока</div>
        <div>
          <div className="lesson-editor-title">
            <div className="lesson-widget">
              <div className="lesson-image" />
            </div>
            <div className="lesson-editor-info">
              <div className="lesson-title-edit">
                <input
                  onChange={changeHandler}
                  type="text"
                  name="title"
                  id="title"
                  value={input.title}
                  className="input-editor"
                  maxLength={55}
                />
                <div className="symbols-left">{`${
                  55 - Number(input.title.length)
                } characters left`}</div>
              </div>
              <div className="zaglushka-div" />
            </div>
          </div>
        </div>
      </div>
      <StepEdit data={data} setData={setData} setStepId={setStepId} />
      <div className={`${!stepId.id ? 'empty-page' : ''}`}>
        <div className="buttons-wrapper">
          <Link to={`/course/${courseid}/plan`}>
            <div className="btn-back">
              <span className="arrow-wrapper">
                <img
                  className="back-arrow"
                  src="/icons/noun-arrow-back.svg"
                  alt=""
                />
              </span>
              <span className="soder" style={{ paddingBottom: '3px' }}>
                Вернуться к содержимому
              </span>
            </div>
          </Link>
          <div className="btn-save" onClick={() => void submitHandler()}>
            <div>Сохранить</div>
          </div>
        </div>
      </div>
    </div>
  );
}
