import React, { useState, useEffect } from 'react'
import styled from './ModuleEx.module.css'
import { useAppDispatch } from '../../../../../store/hooks';
import { delModule, editModule } from '../../../../../store/slice/fullCourseSlice';

import { BiX } from "react-icons/bi";

export default function ModuleEx({ el, i, setFuncArr }): JSX.Element {
  const [inpmodels, setInpModels] = useState({ id: el.id, title: el.title });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (el.id) {
      setFuncArr((prev) => ({ Model: {...prev.Model, [el.id]: changeData}, Lesson: prev.Lesson }))
    }
  }, [inpmodels]);

  function modulschangeHandler(e): void {
    setInpModels({ id: el.id, title: e.target.value });
  }

  async function changeData(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/modules`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(inpmodels),
    });

    if (response.status === 200) {
      const result = await response.json();
      dispatch(editModule({ id: result.id, title: result.title }));
    } else {
      console.log('не изменил');
    }
  }

  async function delModuleHandler(): Promise<void> {
    console.log('da');
    
    const response = await fetch(`${import.meta.env.VITE_URL}/modules/${el.id}`, {
      credentials: 'include',
      method: 'DELETE',
    });

    if (response.status === 200) {
      dispatch(delModule({ id: el.id }));
    }
  }

  return (
    <div className={styled.modulexample}>
      <div className={styled.indexmodule}>{i + 1}</div>
      <input onChange={modulschangeHandler} className={styled.inputtitle} type="text" name={`${el.id}`} value={inpmodels.title} />
      <button onClick={delModuleHandler} className={styled.btndellesson}>
        <BiX />
      </button>
  </div>
  )
}
