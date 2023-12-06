import React, { useState, useEffect } from 'react';
import styled from './InfoEdit.module.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../../store/slice/courseSlice';
import clsx from 'clsx';
import { useAppSelector } from '../../../store/hooks';

import { BiX } from "react-icons/bi";

export default function InfoEdit(): JSX.Element {
  const [vision, setVision] = useState(false);
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useAppSelector((store) => store.fullCourseSlice.course);

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
  }

  function checkInput(e): void {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      console.log('Файл был выбран', selectedFile)
    } else {
      setFile(null);
      console.log('Файл был удален');
    }
  }

  function btnImgDelHandler(): void {
    setFile(null);
  }

  return (
    <div className={styled.containercourseinfoedit}>
      <div className={styled.headertitle}>Описание</div>
      <form onSubmit={formSubmit} className={styled.formeditinfo}>
        <div className={styled.notextcontent}>
          <div className={styled.inpscont}>
            <div className={styled.inpimg}>
              <div>
                <div className={styled.imgtitle}>Изображение</div>
                <label htmlFor="fileInput" className={styled['custom-file-input']}>Загрузить изображение</label>
                <input id='fileInput' style={{ display: 'none' }} type="file" name="image" onChange={checkInput} />
              </div>
            </div>
            <div className={styled.inpvideo}>
              <div className={styled.videotitle}>Видео</div>
              <input className={styled.inputvideo} type="text" name="intro_video" defaultValue={course.intro_video} placeholder='Ссылка на видео с YouTube' />
            </div>
          </div>
          <div className={styled.imgres}>
              {file ? (
                <div className={styled.ifbtn}>
                  <div>{`Файл: ${file.name} был успешно загружен`}</div>
                  <button onClick={btnImgDelHandler} className={styled.btndelinpimg}><BiX/></button>
                </div>
              ) : (
              <div>{'Файл не выбран'}</div>
              )}
            </div>
        </div>
        <div className={styled.titlecoursecontainer}>
          <div className={styled.title}>Название</div>
          <input className={styled.inputtitle} type="text" name="title" defaultValue={course.title} />
        </div>
        <div className={styled.categoriescontainer}>
          <div className={styled.categorytitle}>Категории курса</div>
          <div className={styled.btntakecont}>
            <button className={styled.btntakecat}>Выбрать категорию</button>
          </div>
        </div>
        <div className={styled.shortdescripcont}>
          <div className={styled.shortdescriptitle}>Краткое описание</div>
          <textarea className={styled.shortdescriparea} name="short_description" defaultValue={course.short_description} ></textarea>
        </div>
        <div className={styled.longdescripcont}>
          <div className={styled.longdescriptitle}>Длинное описание</div>
          <textarea className={styled.longdescriparea} name="long_description" defaultValue={course.long_description} ></textarea>
        </div>
        <div className={styled.timecont}>
          <div className={styled.timetitle}>Время прохождения курса</div>
          <input className={styled.inptimepassage} type="text" name="time_passage" defaultValue={course.time_passage} />
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
