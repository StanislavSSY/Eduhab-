import React, { useState, useEffect } from 'react';
import styled from './LessonInpExTwo.module.css';

import { BsPlus } from 'react-icons/bs';
import clsx from 'clsx';
import { useAppDispatch } from '../../../../../store/hooks';
import { addLesson } from '../../../../../store/slice/fullCourseSlice';

export default function LessonInpExTwo({ el }): JSX.Element {
  const [inplessons, setInpLessons] = useState({ moduleid: 0, title: '' });
  const [dis, setDis] = useState(true);
  const dispatch = useAppDispatch();
  const regexp = /^[а-яА-Яa-zA-Z\d\s.,!@#$%^&*()_+{}\[\]:;<>,.?~|\\/=-]+$/gi;
  const maxChars = 55;

  useEffect(() => {
    if (inplessons !== undefined) {
      if (regexp.test(inplessons.title)) {
        setDis(false);
        console.log('true');
      } else {
        setDis(true);
        console.log('false');
      }
    }
  }, [inplessons]);

  function lessonsChangeHandler(e): void {
    setInpLessons({ moduleid: Number(e.target.name), title: e.target.value });
  }

  async function createLesson(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/lessons/`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(inplessons),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      const data = {
        id: inplessons.moduleid,
        anyLesson: result,
      };
      dispatch(addLesson(data));
      setInpLessons({ moduleid: 0, title: '' });
    }
  }

  return (
    <div className={styled.lessonexample}>
      <div className={styled.headercontentlesson}>
        <input
          onChange={lessonsChangeHandler}
          className={styled.inputlessontitle}
          type="text"
          maxLength={maxChars}
          name={`${el.id}`}
          placeholder="Введите название нового урока"
          value={inplessons.title}
        />
        <div
          className={clsx(
            `${styled.btncreatelessoncont} ${dis ? styled.disable : ''}`
          )}
        >
          <button
            onClick={createLesson}
            disabled={dis}
            className={clsx(
              `${styled.btncreatelesson} ${dis ? styled.disable : ''}`
            )}
          >
            <BsPlus />
            <div className={styled.createlesson}>Создать урок</div>
          </button>
        </div>
      </div>
      <div className={styled.sybmolsnumbers}>{inplessons.title.length}/{maxChars}</div>
    </div>
  );
}
