import React, { useState } from 'react'
import styled from './NewCourse.module.css'
import MenuMyTeaching from '../MenuMyTeaching/MenuMyTeaching'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addCoursein } from '../../../store/slice/coursesSLice';
import { addCourse } from '../../../store/slice/courseSlice';

export default function NewCourse(): JSX.Element {
  const [state, setState] = useState({ title: '' });
  const user = useAppSelector((store) => store.userSlice.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function changeHandle(e): void {
    setState((prev) => ({...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmitHandle(e): Promise<void> {
    e.preventDefault();
    const { title } = state;
    const data = {
      userid: user.id,
      title,
    }

    const response = await fetch(`${import.meta.env.VITE_URL}/courses`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result)
      dispatch(addCourse(result));
      dispatch(addCoursein(result));
      navigate(`/course/${result.id}/info`);

    } else {
      console.log('ошибка');
    }
  }
  

  return (
    <div className={styled.newcoursepagecontainer}>
      <div className={styled.leftcont}>
        <MenuMyTeaching />
      </div>
      <div className={styled.rightcont}>
        <div className={styled.title}>Создание нового курса</div>
        <div className={styled.coursetitle}>
          <div className={styled.cluetitle}>Название курса *</div>
          <div className={styled.divinp}>
            <form onSubmit={onSubmitHandle} className={styled.formcreator}>
              <input onChange={changeHandle} className={styled.maininpcreator} type="text" name="title" maxLength={64} />
              <div className={styled.cluenumbers}>Максимум 64 символа</div>
              <div className={styled.containerbtn}>
                <button className={styled.btncreatecourse} type='submit'>Создать курс</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
