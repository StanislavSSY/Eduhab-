import React, { useState , useEffect } from 'react';
import styled from './MenuMyTeaching.module.css';
import { Link, useLocation } from "react-router-dom";
import { BsBook, BsFillBookFill } from "react-icons/bs";

export default function MenuMyTeaching(): JSX.Element {
  const [active, setActive] = useState(false);
  const [activetwo, setActiveTwo] = useState(false);
  const loc = useLocation();
  const locpath = loc.pathname;

  useEffect(() => {
    console.log(locpath);
    
    if (locpath === '/teach/courses') {
      setActive(true);
    } else {
      setActiveTwo(true);
      console.log(activetwo);
    }
  },[loc]);
  
  return (
    <div className={styled.mymenucontainer}>
      <Link to="/teach/courses" className={`${styled.mycoursecontainer} ${active ? styled.act : ''}`}>
        <div className={styled.icon}>
          <BsFillBookFill />
        </div>
        <div className={styled.textrefto}>Мои курсы</div>
      </Link>
      <Link to="/teach/courses/new" className={`${styled.mycoursecontainer} ${activetwo ? styled.act : ''}`}>
        <div className={styled.icon}>
          <BsBook />
        </div>
        <div className={styled.textrefto}>Создать курс</div>
      </Link>
    </div>
  );
}
