import React from 'react';
import styled from './CardCourse.module.css';
import { Link } from 'react-router-dom';
import { CardProps } from '../../types';

export default function CardCourse({ el }: CardProps): JSX.Element {
  console.log(el.new_price);
  console.log(el.old_price);
  
  
  return (
    <div className={styled.cardcontainer}>
        <div className={styled['top-block']}>
          <div className={styled.text}>
            <Link to={`/course/${el.id}/promo`}>
              <div className={styled.coursename}>{el.title}</div>
            </Link>
            <Link to={'/'}>
              <div className={styled.authortitle}>
                {el.User.firstName} {el.User.lastName}
              </div>
            </Link>
          </div>
          <img className={styled.cardimg} src={`/img/${el.image_url}`} />
        </div>
        <div className={styled.widgets}>
          <i className="fa fa-star" aria-hidden="true"></i>
          <div className={styled.contentwidget}>{el.rate}</div>
          <i className="fa fa-user" aria-hidden="true"></i>
          <div className={styled.contentwidget}>{el.quantity_people}</div>
          <i className="fas fa-clock"></i>
          <div className={styled.contentwidget}>{el.time_passage}</div>
          <i className="fa fa-address-card" aria-hidden="true"></i>
        </div>

        <div className={styled.price}>
          {el.new_price ? (
            el.old_price ? (
            <div>
              <span className={styled['last-price']}>
                {el.old_price && el.old_price}
              </span>
              <span className={styled['actual-price']}>
                {el.new_price && el.new_price} ₽
              </span>
            </div>
            ) : (
            <span className={styled.withoutsale}>{el.new_price} ₽</span>
            )
          ) : (
            <div className={styled['free-price']}>Бесплатно</div>
          )}
        </div>
    </div>
  );
}
