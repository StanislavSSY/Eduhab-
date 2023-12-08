import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { useDispatch } from 'react-redux';
import { updateImg, updateName } from '../../../store/slice/userSlice';
import styled from './ProfileSettings.module.css';
import clsx from 'clsx';

export default function ProfileSettings() {
  const { user } = useAppSelector((store) => store.userSlice);
  const [inputs, setInputs] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const [image, setImage] = useState<Blob>();
  const [imageUrl, setImageUrl] = useState(
    `/img/${user.img_url}` || '/img/stock_avatar.jpg'
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!image) return;
    const newImageUrl = URL.createObjectURL(image);
    setImageUrl(newImageUrl);
  }, [image]);

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_URL}/users`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.status === 200) {
      console.log('запись firstName и lastName удалась');
      dispatch(updateName(inputs));
    }
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const response = await fetch(`${import.meta.env.VITE_URL}/users/img`, {
        credentials: 'include',
        method: 'PATCH',
        body: formData,
      });
      if (response.status === 200) {
        const dataUser = await response.json();
        dispatch(updateImg(dataUser.img_url));
      }
    }
  };

  return (
    <div>
      <div className={styled['flex-row']}>
        <h4 className={styled.form_header}>Редактирование профиля</h4>
      </div>

      <div className={clsx(styled['flex-row'], styled['form-row'])}>
        <div className={styled.input_title}>Ваше имя*</div>
        <div className={styled.input_wrapper}>
          <input
            className={styled.input}
            onChange={changeHandler}
            type="text"
            name="firstName"
            id="firstName"
            maxLength={30}
            defaultValue={inputs.firstName}
          />
        </div>
      </div>

      <div className={clsx(styled['flex-row'], styled['form-row'])}>
        <div className={styled.input_title}>Фамилия*</div>
        <div className={styled.input_wrapper}>
          <input
            className={styled.input}
            onChange={changeHandler}
            type="text"
            name="lastName"
            id="lastName"
            maxLength={30}
            defaultValue={inputs.lastName}
          />
          {/* <label htmlFor="lastName">
            Ваше имя и фамилия будут использоваться в сертификате
          </label> */}
        </div>
      </div>

      <div className={clsx(styled['flex-row'], styled['form-row'])}>
        <div className={styled.input_title}>Аватарка</div>
        <div className={styled['edit-img']}>
          <div>
            <img style={{ width: '200px' }} src={imageUrl} alt="avatar" />
          </div>
          <div>
            <input
              onChange={onImageChange}
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              name="image"
              id="image-input"
            />
          </div>
        </div>
      </div>

      <div className={styled['btn-save']} onClick={(e) => void submitForm(e)}>
        <div>Сохранить</div>
      </div>
    </div>
  );
}
