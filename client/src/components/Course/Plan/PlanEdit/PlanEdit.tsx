import React, { useState, useEffect } from 'react'
import styled from './PlanEdit.module.css'
import { Link, useParams } from 'react-router-dom';
import { BigCourseType } from '../../../../types';
import { BsPlus } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import {  addfullCourse, addModule } from '../../../../store/slice/fullCourseSlice';
import { useAppSelector } from '../../../../store/hooks';
import LessonExample from './LessonExample/LessonExample';
import LessonInpExTwo from './LessonInpExTwo/LessonInpExTwo';
import ModuleEx from './ModuleEx/ModuleEx';


export default function Edit(): JSX.Element {
  const { id } = useParams();
  const [data, setData] = useState<BigCourseType>({});
  const [ishave, setisHave] = useState(false);
  const [funcarr, setFuncArr] = useState({ Model: {}, Lesson: {}});
  const dispatch = useDispatch();
  const course = useAppSelector((store) => store.fullCourseSlice.course);

  useEffect(() => {
    void(async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/study/${id}`, {
        credentials: 'include',
      });
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        if (result.Modules.length >= 1) {
          dispatch(addfullCourse(result))
          setData(result);
          setisHave(true);
        }
        console.log('plan-edit');
      }
    })();
  }, []);


  useEffect(() => {
    setData(course)
  }, [course])

  useEffect(() => {
    if (course.Modules.length >= 1) {
      setisHave(true);
    } else {
      setisHave(false);
    }
  }, [course.Modules]);


  async function addfirstModule(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/modules`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify({ courseid: id, title: 'Новый модуль' }),
    });

    if (response.status === 200) {
      const result = await response.json();
      if (result.Lessons === undefined) {
        result.Lessons = [];
        console.log(result);
        dispatch(addModule(result));
      }
    }
  }

  function formHandler(e): void {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const newdata = Object.fromEntries(formdata);
    console.log(newdata);
  }

  function checkarr(): void {
    console.log(funcarr);
    for (const key in funcarr.Lesson) {
      funcarr.Lesson[key]()
    }
    for (const key in funcarr.Model) {
      funcarr.Model[key]()
    }
    
  }


  return (
    <div className={styled.planeditcontainer}>
      <div className={styled.headertitle}>Программа Курса</div>
      {ishave ? (
        <div className={styled.conteinerconstructoredit}>
          {/* <div className={clsx(`${styled.btneditconstructorcont}`)}>
            <button className={styled.btneditconstructor}>
              <BsFillPencilFill />
              <div className={styled.titleeditconstructor}>Редактировать содержание</div>
            </button>
          </div> */}
          <form onSubmit={formHandler}>
            <div className={styled.constructorcontent}>
                {data?.Modules?.length && data.Modules.map((el, i) => (
                  <div className={styled.containerconstructormap} key={el.id}>
                    <ModuleEx el={el} i={i} setFuncArr={setFuncArr} />
                    <div className={styled.lessonscontainers}>
                      <div className={styled.lessonsforbord}>
                        {el?.Lessons?.map((elem, l) => (
                          <LessonExample setFuncArr={setFuncArr} elem={elem} key={elem.id} i={i + 1} l={l + 1} />
                        ))}
                        <LessonInpExTwo el={el} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={styled.containerbottomaddbtn}>
              <div className={styled.btnaddmodulecont}>
                <button onClick={addfirstModule} className={styled.btnaddmodule}>
                  <BsPlus />
                  <div className={styled.titlenewmodule}>Новый модуль</div>
                </button>
              </div>
            </div>
            <div className={styled.containerbottombtns}>
              <div className={styled.btnsavedinfocont}>
                <button onClick={checkarr} type="submit" className={styled.btnsaveinfo}>Сохранить</button>
              </div>
              <div className={styled.btnrefbackcont}>
                <Link className={styled.btnrefback} to={`/course/${id}/plan`}>вернуться</Link>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={styled.respcontainer}>
          <div className={styled.aftertitle}>
            В курсе пока нет ни одного урока.
            <br />
            Создайте первый модуль, чтобы добавить уроки
            </div>
          <div className={styled.btnaddmodulecont}>
            <button onClick={addfirstModule} className={styled.btnaddmodule}>
              <BsPlus />
              <div className={styled.titlenewmodule}>Новый модуль</div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
