import React, { useState, useEffect } from 'react';
import styled from './Search.module.css';

import { BiSearchAlt2 } from 'react-icons/bi';
import { BsX } from 'react-icons/bs';
import { useAppSelector } from '../../../store/hooks';

export default function Search({ coursesState, setCourses }): JSX.Element {
  const [inpvalue, setInpValue] = useState('');
  const [status, setStatus] = useState(false);
  const courses = useAppSelector((store) => store.coursesSlice.courses);

  useEffect(() => {
    if (inpvalue !== '') {
      setStatus(true);
    } else {
      setStatus(false);
    }
  },[inpvalue]);

  function handleKeyPress(e): void {
    if (e.key === 'Enter') {
      searchCoursesHandler();
    }
  }

  function searchCoursesHandler(): void {
    if (inpvalue === '') {
      setCourses(courses);
    } else {
      const newData = coursesState.filter((el) =>
        el.title.toLowerCase().includes(inpvalue.toLowerCase())
      );
      setCourses(newData);
    }
  }

  function clearInputHandler(): void {
    setInpValue('');
  }

  return (
    <div className={styled.searchcontainer}>
      <div className={styled.inpcontainer}>
        <div className={styled.icon}>
          <BiSearchAlt2 />
        </div>
        <input
          className={styled.maininp}
          type="text"
          onKeyDown={handleKeyPress}
          onChange={(e) => setInpValue(e.target.value)}
          value={inpvalue}
          placeholder="Название курса"
        />
        {status && (
          <div onClick={clearInputHandler} className={styled.delIcon}>
            <BsX />
          </div>
        )}
      </div>
      <div className={styled.btnsearchcont}>
        <button onClick={searchCoursesHandler} className={styled.btnsearch}>
          Искать
        </button>
      </div>
    </div>
  );
}
