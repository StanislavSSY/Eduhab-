import React from 'react'
import styled from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styled.containernavbar}>
      <div className={styled.leftcont}>
        <div className={styled.titlecont}>
          <button className={styled.title}>Galera</button>
        </div>
        <div className={styled.coursecont}>
          <button className={styled.course}>Курсы</button>
        </div>
        <div className={styled.couchcont}>
          <button className={styled.couching}>Преподавание</button>
        </div>
      </div>
      <div className={styled.rightcont}>
        <div className={styled.authcont}>
          <Link className={styled.auth} to={'/auth'}>Авторизироваться</Link>
        </div>
      </div>
    </div>
  )
}
