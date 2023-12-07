import React, { useState, useEffect } from 'react';
import styled from './Comment.module.css';

import { BiChevronDown } from 'react-icons/bi';
import { BiChevronUp } from 'react-icons/bi';
import { ComProps } from '../../../types';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';

export default function Comment({ comment }: ComProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeAgo, setTimeAgo] = useState('');
  // const [status, setStatus] = useState(false);
  // const [allSteps, setAllSteps] = useState([]);
  // const [userSteps, setUserSteps] = useState({});
  // const [procent, setProcent] = useState(0);
  const { id } = useParams();
  const user = useAppSelector((store) => store.userSlice.user);

  // useEffect(() => {
  //   void(async() => {
  //     const response = await fetch(`${import.meta.env.VITE_URL}/anyendpoints/${id}`, {
  //       credentials: 'include',
  //     });

  //     if (response.status === 200) {
  //       const result = await response.json();
  //       setAllSteps(result);
  //     }

  //     const res = await fetch(`${import.meta.env.VITE_URL}/entries/info`, {
  //       credentials: 'include',
  //     });

  //     if (res.status === 200) {
  //       const resul = await res.json();
  //       const newresult = resul.filter((el) => el.id === Number(id))
  //       setUserSteps(newresult[0]);
  //     }
  //   })();
  // },[]);

  // useEffect(() => {
  //   if (allSteps.length >= 1) {
  //     if (userSteps.progress?.length >= 1) {
  //       const newprocent = (userSteps.progress?.length / allSteps.length) * 100;
  //       setProcent(newprocent)
  //     }
  //   }
  // },[allSteps, userSteps])

  // useEffect(() => {
  //   if (procent > 85) {
  //     setStatus(true);
  //   }
  // },[procent]);

  useEffect(() => {
    function calculateTimeAgo (): void {
      const createdAt = new Date(comment.createdAt);
      const now = new Date();
      const timeDifference = now - createdAt;

      const sec = Math.floor(timeDifference / 1000);
      const min = Math.floor(sec / 60);
      const hours = Math.floor(min / 60);
      const days = Math.floor(hours / 24);

      let result;

      if (days > 0) {
        result = `${days} ${days === 1 ? 'день' : 'дней'} назад`;
      } else if (hours > 0) {
        result = `${hours} ${hours === 1 ? 'час' :  'часа'} назад`;
      } else if (min > 0) {
        result = `${min} ${min === 1 ? 'минуту' : 'минут'} назад`;
      } else {
        result = 'менее минуты назад';
      }

      setTimeAgo(result);
    }

    calculateTimeAgo();
  }, [comment.createdAt]);

  function handleExpandClick(): void {
    setIsExpanded(!isExpanded);
  }

  const displayedText = isExpanded
    ? comment.text
    : `${comment.text.slice(0, 200)}...`;

  return (
    <div className={styled.containercomm}>
      <div className={styled.commentcontainer}>
        <div className={styled.headertitle}>
          <div className={styled.usernametitle}>
            {user.firstName} {user.lastName}
          </div>
          <div className={styled.createddate}>{timeAgo}</div>
        </div>
        <div className={styled.userRate}></div>
        <div className={styled.bodycontent}>
          <div className={styled.contenttitle}>
            {comment.text.length >= 200 ? displayedText : comment.text}
          </div>
        </div>
        {comment.text.length >= 200 ? (
          <div className={styled.btncheckmorecont}>
            <button onClick={handleExpandClick} className={styled.btncheckmore}>
              {isExpanded ? (
                <>
                  Скрыть
                  <BiChevronUp />
                </>
              ) : (
                <>
                  Подробнее <BiChevronDown />
                </>
              )}
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className={styled.userscoreratecont}>Оценка пользователя: {comment.user_rate}</div>
      </div>
    </div>
  );
}
