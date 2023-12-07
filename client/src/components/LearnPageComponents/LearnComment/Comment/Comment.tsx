import React, { useState, useEffect } from 'react'
import styled from './Comment.module.css'

export default function Comment({ el }): JSX.Element {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    function calculateTimeAgo (): void {
      const createdAt = new Date(el.createdAt);
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
  }, [el.createdAt]);
  return (
    <div className={styled.commentcontainer}>
      <div className={styled.content}>
        <div className={styled.leftcont}>
          <img className={styled.userimg} src={`/img/${el.User?.img_url}`} alt="" />
        </div>
        <div className={styled.rightcont}>
          <div className={styled.headercont}>
            <div className={styled.usernametitle}>{el.User.firstName} {el.User.lastName}</div>
            <div className={styled.timepassed}>{timeAgo}</div>
          </div>
          <div className={styled.bodycont}>
            <div className={styled.commenttitle}>{el.text}</div>
          </div>
          <div className={styled.footercont}></div>
        </div>
      </div>
    </div>
  )
}
