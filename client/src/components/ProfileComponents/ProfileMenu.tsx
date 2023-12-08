import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from './ProfileMenu.module.css';
import { useAppSelector } from '../../store/hooks';

export default function ProfileMenu() {
  const { user } = useAppSelector((store) => store.userSlice);
  const { pathname } = useLocation();
  const [imageUrl, setImageUrl] = useState(
    `/img/${user.img_url}` || '/img/stock_avatar.jpg'
  );
  const [fullName, setFullName] = useState(
    `${user.firstName} ${user.lastName}`
  );
  const isActive = (to) => {
    console.log('⚠️  【】➜ ', pathname.endsWith(`${to}`));
    if (pathname.endsWith(`${to}`)) return true;
    // if (pathname.split("/")[pathname.split("/").length - 1] === to) return true;
  };

  useEffect(() => {
    setImageUrl(`/img/${user.img_url}`);
  }, [user.img_url]);

  useEffect(() => {
    setFullName(`${user.firstName} ${user.lastName}`);
  }, [user.firstName, user.lastName]);
  return (
    <nav className={styled.nav}>
      <div className={styled.user_info_wrap}>
        <div className={styled.img_wrap}>
          <img
            style={{
              width: '200px',
              marginBottom: '10px',
              borderRadius: '10px',
            }}
            src={imageUrl}
            alt="avatar"
          />
        </div>
        <div className={styled.user_name}>
          <p>{fullName}</p>
        </div>
      </div>
      <ul>
        <li>
          <Link
            to="profile"
            className={isActive('profile') ? styled.active : ''}
          >
            <i className="fa fa-user-circle" aria-hidden="true"></i> Профиль
          </Link>
        </li>
        <li>
          <Link
            to="settings"
            className={isActive('settings') ? styled.active : ''}
          >
            <i className="fa fa-cog" aria-hidden="true"></i> Настройки
          </Link>
        </li>
      </ul>
    </nav>
  );
}
