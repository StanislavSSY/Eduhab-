import React, { ChangeEvent, useState } from 'react';
import StepEdit from './StepEdit';
import { useAppDispatch } from '../../store/hooks';

export default function EditLesson() {
  const [input, setInput] = useState({ title: '' });
  const [data, setData] = useState('');
  const [stepId, setStepId] = useState({ id: '', type: '' });
  /* const dispatch = useAppDispatch(); */
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (): void => {
    console.log(data, stepId, '------------------------------------');
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
