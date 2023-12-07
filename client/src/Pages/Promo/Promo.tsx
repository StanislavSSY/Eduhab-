import React, { useState, useEffect } from 'react';
import styled from '../Promo/Promo.module.css';

import Stripe from '../../components/Stripe/Stripe';

import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addfullCourse } from '../../store/slice/fullCourseSlice';
import Comment from './Comment/Comment';
import clsx from 'clsx';
import Video from './Video/Video';
import getYouTubeID from 'get-youtube-id';
import { ReviewType, ReviewsType } from '../../types';


export default function Promo(): JSX.Element {
  const [comments, setComments] = useState<ReviewsType>([]);
  const [vision, setVision] = useState(false);
  const [dis, setDis] = useState(false);
  const [yid, setYid] = useState("");
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState(false);
  const [twoStatus, setTwoStatus] = useState(true);
  const [allSteps, setAllSteps] = useState([]);
  const [userSteps, setUserSteps] = useState({});
  const [procent, setProcent] = useState(0);
  const [inpValue, setInpValue] = useState('');
  const [inpRate, setInpRate] = useState(0);
  const [res, setRes] = useState('');
  const course = useAppSelector((store) => store.fullCourseSlice.course);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/courses/${id}`,
        {

          credentials: 'include',

        }
      );
      if (response.status === 200) {
        const result = await response.json();
        dispatch(addfullCourse(result));
        const youtubeid = getYouTubeID(result.intro_video);
        if (youtubeid) {
          setYid(youtubeid);
        }
      }
      const resp = await fetch(`${import.meta.env.VITE_URL}/reviews/${id}`, {
        credentials: "include",
      });

      if (resp.status === 200) {
        const res = await resp.json();

        setComments(res);
        if (res.length >= 1) {
          let sumRate = 0;
          res.forEach((el: ReviewType) => {
            sumRate += el.user_rate;
          });
          const fullRate = sumRate / res.length;
          setRate(fullRate);
        }
      }

      const res = await fetch(
        `${import.meta.env.VITE_URL}/entries/check/${id}`,
        {
          credentials: 'include',
        }
      );

      if (res.status === 200) {
        setDis(true);
      }
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/anyendpoints/${id}`,
        {
          credentials: 'include',
        }
      );

      if (response.status === 200) {
        const result = await response.json();
        setAllSteps(result);
      }

      const res = await fetch(`${import.meta.env.VITE_URL}/entries/info`, {
        credentials: 'include',
      });

      if (res.status === 200) {
        const resul = await res.json();
        const newresult = resul.filter((el) => el.id === Number(id));
        setUserSteps(newresult[0]);
      }

    })();
  }, []);

  useEffect(() => {
    void(async () => {
      const response = await fetch(`${import.meta.env.VITE_URL}/reviews/check/${id}`, {
        credentials: 'include',
      });

      if (response.status === 200) {
        setTwoStatus(false);
      }

    })();
  }, []);

  useEffect(() => {
    if (allSteps.length >= 1) {
      if (userSteps?.progress?.length >= 1) {
        const newprocent = (userSteps?.progress?.length / allSteps.length) * 100;
        setProcent(newprocent);
      }
    }
  }, [allSteps, userSteps]);

  useEffect(() => {
    if (procent > 85) {
      setStatus(true);
    }
  }, [procent]);

  function delay(): void {
    setVision(true);
    setTimeout(() => {
      setVision(false);
    }, 3000);
  }

  async function freeAddCourseHandler(): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_URL}/entries/${id}`, {
      credentials: 'include',
      method: 'POST',

    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      setDis(true);
      delay();
    }
  }

  function checkRateHandler(): boolean {
    const regexp = /^[0-5]{1}$/g;
    const str = inpRate.toString()
    let result;
    if (regexp.test(str)) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }

  async function addReviewHandler(): Promise<void> {
    if (checkRateHandler()) {
      const data = {
        courseid: id,
        text: inpValue,
        user_rate: inpRate,
      }
      const response = await fetch(`${import.meta.env.VITE_URL}/reviews`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        setComments((prev) => ([...prev, result]))
      }
    } else {
      setRes('Введите число от 0 до 5')
    }
  }

  return (
    <div className={styled['main-promo']}>
      <div className={styled['page-fragment']}>
        <section>
          <article>
            <h1>{course.title}</h1>
            <p>{course.short_description}</p>
            <ul>
              <li>Сертификат EDUHUB</li>
            </ul>
          </article>
          <article>
            <Link to={'/'}>
              <Video yid={yid} />
            </Link>
            <div className={styled.feedback}>
              <div>{rate} Оценка курса</div>
              <a href="#comments">
                {comments.length === 1
                  ? '1 отзыв'

                  : `${comments.length} отзывов`}
              </a>
            </div>
            <p>{`${course.quantity_people} учащихся`}</p>
          </article>
        </section>
      </div>
      <section className={styled['body-promo']}>
        <div className={styled.content}>
          <h2>О курсе</h2>
          <p>{course.long_description}</p>
        </div>

        <div className={styled['side-bar']}>

          {course.new_price ? (
            <>
              <div className={styled.price}>
                <span
                  className={styled['new-price']}
                >{`${course.new_price} ₽`}</span>
                <span className={styled['prev-price']}>
                  {course.old_price ? course.old_price : ''}
                </span>
              </div>
              {course.old_price && <p>При оплате до 1 января</p>}
              <div className={styled.buy}>
                <button className={styled.btnbuycourse}>Купить</button>
              </div>
              {/* <div className={styled.favorite}>Добавить в избранные</div> */}
            </>
          ) : dis ? (
            <>
              <div className={styled.btncontinuecont}>
                <Link
                  className={styled.btncontinue}
                  to={`/teach/courses/${id}/lesson/1/step/1`}
                >
                  Перейти к прохождению
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={styled.freebtncont}>
                <button
                  onClick={freeAddCourseHandler}
                  disabled={dis}
                  className={`${styled.btnfreeEntrie} ${
                    dis ? styled.disa : ''
                  }`}
                >
                  Начать прохождение
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      <div className={styled.footerpromopage}>
        <div className={styled.reviewscont} id="comments">
          {status ? (
            twoStatus ? (
              <></>
            ) : (
              <div className={styled.yourcom}>
              <div className={styled.yourcomtitle}>
                Напишите свой отзыв о курсе !
              </div>
              <div className={styled.yourcomcontainer}>
                <textarea
                  className={styled.cominp}
                  name="text"
                  placeholder="Этот курс мне очень понравился =)"
                  onChange={(e) => setInpValue(e.target.value)}
                />
                <div className={styled.containerscoreinp}>
                  <div className={styled.yourscorerate}>Ваша оценка:</div>
                  <input onChange={(e) => setInpRate(Number(e.target.value))} className={styled.yourratecom} type="number" name='user_rate' placeholder='5' maxLength={1} />
                </div>
                <div>{res}</div>
                <button onClick={addReviewHandler} className={styled.btnsendcom}>Отправить</button>
              </div>
            </div>
            )
          ) : (
            <></>
          )}
          <div className={styled.reviewstitle}>Отзывы прошедших курс</div>
          {comments.length >= 1 ? (
            comments.map((comment: ReviewType) => (
              <div className={styled.percommentcont} key={comment.id}>
                <Comment comment={comment} />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className={clsx(`${styled.modal} ${vision ? styled.vision : ''}`)}>
        Курс успешно добавлен
      </div>
    </div>
  );
}
