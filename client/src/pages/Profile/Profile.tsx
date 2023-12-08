import React from 'react';
import ProfileMenu from '../../components/ProfileComponents/ProfileMenu';
import { Outlet } from 'react-router-dom';
import styled from './Profile.module.css';

export default function Profile() {
  return (
    <div className={styled.container}>
      <ProfileMenu />
      <div className={styled.outlet}>
        <Outlet />
      </div>
    </div>
  );
}
