import React, { useState, useEffect} from 'react'
import styled from './Course.module.css'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { CourseInt, CourseType } from '../../types';
import clsx from 'clsx';

export default function Course(): JSX.Element {
  const { id } = useParams();
  const [data, setData] = useState<CourseInt>({});
  const [isOpen, setIsOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    void(async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/courses/${id}`, {
        credentials: 'include',
      });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        setData(result);
      }
    })();
  }, []);

  useEffect(() => {
    navigate('info');
  },[data])

  return (
    <div className={styled.coursecontainer}>
      <div className={styled.leftcont}>
        <div className={styled.imgcont}>
          <img src={'/src/assets/react.svg'} alt="" />
        </div>
        <div className={styled.coursetitle}>{data.title}</div>
        <div className={styled.btnpubliccont}>
          <button>Опубликовать</button>
        </div>
        <ul className={styled.mainul}>
          <li className={styled.mainli}>
            <button onClick={() => setIsOpen(!isOpen)} className={styled.btnlist}>
            <div className={styled.listcont}>Курс</div>
          </button>
          <ul className={clsx(`${styled.podul} ${styled.vision} ${isOpen ? styled.active : ''}`)}>
              <li className={styled.podli}>
                <Link className={styled.reflink} to={'info'}>Описание</Link>
              </li>
              <li className={styled.podli}>
                <Link className={styled.reflink} to={'plan'}>Содержание</Link>
              </li>
            </ul>
          </li>
          <li className={styled.mainli}>
            <button onClick={() => setSettingsIsOpen(!settingsIsOpen)} className={styled.btnlist}>
              <div className={styled.listcont}>Настройки</div>
            </button>
            <ul className={clsx(`${styled.podul} ${styled.vision} ${settingsIsOpen ? styled.active : ''}`)}>
              <li className={styled.podli}>
                <Link className={styled.reflink} to={'publication'}>Публикация</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={styled.rightcont}>
        <Outlet />
      </div>
    </div>
  )
}
