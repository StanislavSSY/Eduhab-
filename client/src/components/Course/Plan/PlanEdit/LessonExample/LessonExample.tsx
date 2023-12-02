import React, { useState, useEffect, memo} from 'react'
import styled from './LessonExample.module.css'

import { BiX } from "react-icons/bi";
import { InpType } from '../../../../../types';
import { useAppDispatch } from '../../../../../store/hooks';
import { delLesson, editLesson } from '../../../../../store/slice/fullCourseSlice';

function LessonExample({ elem, i, l, setFuncArr }): JSX.Element {
  const [inpData, setInpData] = useState<InpType>({ id: elem.id, title: elem.title });
  const dispatch = useAppDispatch();
  const id = elem.id;

  useEffect(() => {
    if (elem.id) {
      setFuncArr((prev) => ({ Model: prev.Model, Lesson: {...prev.Lesson, [elem.id]: changeData} }))
    }
  }, [inpData]);
  
  function lessonsChangeHandler(e): void {
    setInpData({ id: e.target.name, title: e.target.value });
    console.log(inpData);
  }

  async function changeData(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/lessons`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(inpData),
    });
    
    if (response.status === 200) {
      const result = await response.json();
      dispatch(editLesson({ id: result.id, moduleid: result.moduleid, title: result.title }));
    } else {
      console.log('не изменил');
    }
  }


  async function delLessonHandler(): Promise<void> {
    console.log('da');
    
    const response = await fetch(`${import.meta.env.VITE_URL}/lessons/${elem.id}`, {
      credentials: 'include',
      method: 'DELETE',
    });

    if (response.status === 200) {
      dispatch(delLesson({ id, moduleid: elem.moduleid }));
    }
  }

  return (
    <div className={styled.lessonexample} key={elem.id}>
      <div className={styled.containerleftcont}>
        <div className={styled.lessonindex}>{i}.{l}</div>
        <input onChange={lessonsChangeHandler} className={styled.inputlessontitle} type="text" name={`${elem.id}`} value={inpData.title} />
      </div>
      <button onClick={delLessonHandler} className={styled.btndellesson}>
        <BiX />
      </button>
  </div>
  )
}


export default memo(LessonExample);
