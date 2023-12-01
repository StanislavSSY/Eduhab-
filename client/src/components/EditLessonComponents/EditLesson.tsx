import React, { ChangeEvent, useEffect, useState } from 'react';
import StepEdit from './StepEdit';
import { useAppDispatch } from '../../store/hooks';
import { useParams } from 'react-router-dom';
import { initSteps } from '../../store/thunkActions';

export default function EditLesson() {
  const { lessonid } = useParams();
  const [input, setInput] = useState({ title: '' });
  const [data, setData] = useState('');
  const [stepId, setStepId] = useState({ id: '', type: '' });
  const dispatch = useAppDispatch();

  useEffect(() => {
    void (async () => {
      const lesson = await fetch(`http://localhost:3100/lessons/${lessonid}`);
      const lessonData = await lesson.json();
      setInput({ title: lessonData.title });
    })();
  }, []);

  useEffect(() => {
    dispatch(initSteps(lessonid));
  }, [dispatch]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      <div>
        <div>Настройки урока</div>
        <div>
          <input
            onChange={changeHandler}
            type="text"
            name="title"
            id="title"
            value={input.title}
          />
        </div>
      </div>
      <StepEdit data={data} setData={setData} setStepId={setStepId} />
      <button onClick={() => void submitHandler()} type="button">
        СОХРАНИТЬ
      </button>
    </div>
  );
}
