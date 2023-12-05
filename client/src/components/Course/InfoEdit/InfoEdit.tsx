import React, { useState, useEffect, FormEvent } from 'react';
import styled from './InfoEdit.module.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../../store/slice/courseSlice';
import clsx from 'clsx';

export default function InfoEdit(): JSX.Element {
  const [vision, setVision] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  function delay(): void {
    setVision(true);
    setTimeout(() => {
      setVision(false);
    }, 3000);
  }

  async function formSubmit(e): Promise<void> {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_URL}/courses/${id}`, {
      credentials: 'include',
      method: 'PUT',
      body: new FormData(e.target),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      dispatch(addCourse(result));
      delay();
    }
    // const resp = await fetch(`${import.meta.env.VITE_URL}/courses/img/${id}`, {
    //   credentials: 'include',
    //   method: 'PUT',
    //   body: data,
    // })
    // if (resp.status === 200) {
    //   console.log('изменил фото');
    // }
  }

  return (
    <div className={styled.containercourseinfoedit}>
      <div className={styled.headertitle}>Описание</div>
      <form onSubmit={formSubmit} className={styled.formeditinfo}>
        <div className={styled.notextcontent}>
          <div className={styled.inpimg}>
            <span>Изображение</span>
            <input type="file" name="image" />
          </div>
          <div className={styled.inpvideo}>
            <span>Видео</span>
            <input className={styled.inputvideo} type="text" name="intro_video" />
          </div>
        </div>
        <div className={styled.titlecoursecontainer}>
          <div className={styled.title}>Название</div>
          <input className={styled.inputtitle} type="text" name="title" />
        </div>
        <div className={styled.categoriescontainer}>
          <div className={styled.categorytitle}>Категории курса</div>
          <div className={styled.btntakecont}>
            <button className={styled.btntakecat}>Выбрать категорию</button>
          </div>
        </div>
        <div className={styled.shortdescripcont}>
          <div className={styled.shortdescriptitle}>Краткое описание</div>
          <textarea className={styled.shortdescriparea} name="short_description" ></textarea>
        </div>
        <div className={styled.longdescripcont}>
          <div className={styled.longdescriptitle}>Длинное описание</div>
          <textarea className={styled.longdescriparea} name="long_description" ></textarea>
        </div>
        <div className={styled.timecont}>
          <div className={styled.timetitle}>Время прохождения курса</div>
          <input className={styled.inptimepassage} type="text" name="time_passage" />
        </div>
        <div className={styled.btncontainer}>
          <div className={styled.btnsavedinfocont}>
            <button type="submit" className={styled.btnsaveinfo}>Сохранить</button>
          </div>
          <div className={styled.btnrefbackcont}>
            <Link className={styled.btnrefback} to={`/course/${id}/info`}>вернуться</Link>
          </div>
          <div className={clsx(`${styled.modal} ${vision ? styled.vision : ''}`)}>
            Изменения успешно сохранены
          </div>
        </div>
      </form>
    </div>
  );
}
