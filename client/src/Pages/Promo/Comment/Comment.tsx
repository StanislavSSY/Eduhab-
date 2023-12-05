import React, { useState, useEffect } from 'react';
import styled from './Comment.module.css';

import { BiChevronDown } from 'react-icons/bi';
import { BiChevronUp } from 'react-icons/bi';
import { ComProps } from '../../../types';

export default function Comment({ comment }: ComProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeAgo, setTimeAgo] = useState('');

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
  console.log(comment);

  return (
    <div className={styled.commentcontainer}>
      <div className={styled.headertitle}>
        <div className={styled.usernametitle}>
          {comment.User?.firstName} {comment.User?.lastName}
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
      {/* <div className={styled.commentrate}>
        <div className={styled.btncontlike}>
          <button className={styled.btnlike}>LIKE</button>
        </div>
        <div className={styled.btncontdis}>
          <button className={styled.btndis}>DISLIKE</button>
        </div>
      </div> */}
    </div>
  );
}
