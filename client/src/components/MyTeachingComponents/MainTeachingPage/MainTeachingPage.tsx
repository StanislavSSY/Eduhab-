import React from 'react';
import styles from './MainTeachingPage.module.css';
import { Link } from 'react-router-dom';
import MenuMyTeaching from '../MenuMyTeaching/MenuMyTeaching';
import CardCourseAuthor from '../CardCourseAuthor/CardCourseAuthor';


export default function MainTeachingPage() {
  const zagluhskaCardAuthor = {
    title: "Основы SMM ВКонтакте без \"воды\" с нуля до специалиста",
    imgUrl: "https://cdn.stepik.net/media/cache/images/courses/115018/cover_2pHpRcf/11ab681f09f1df98cc47e9c5ad25d47c.png",
    star: 5,
    users: 200,
    time: 5,
  };
  const zagluhskaCardAuthorObjs = [
    { ...zagluhskaCardAuthor, id: 1 },
    { ...zagluhskaCardAuthor, id: 2 },
    { ...zagluhskaCardAuthor, id: 3 },
    { ...zagluhskaCardAuthor, id: 4 },
  ];
  console.log(zagluhskaCardAuthorObjs);
    return (

    
    <>
   
      <div className={styles['teacher-cabinet']}>
        <MenuMyTeaching />
      </div>

      <div className={styles['main-teaching-page']}>
       
        <div className={styles['menu-wrapper']}>
         
        {/* {zagluhskaObjs.map((el) => (
          <CardMinMyLearn zagluhskaObj={el} key={el.id} />
        ))} */}
        {zagluhskaCardAuthorObjs.map((el) => (
          <CardCourseAuthor  zagluhskaCardAuthor={el} key={el.id} />
        ))}
          {/* <CardCourseAuthor />
          <CardCourseAuthor />
          <CardCourseAuthor /> */}
        </div>
        <div className={styles['content-wrapper']}>
          {/* Вставьте здесь другие компоненты, которые должны отображаться в центре */}
        </div>
      </div>
    </>
  );
}
