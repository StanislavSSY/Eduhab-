import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { useDispatch } from 'react-redux';
import { updateImg } from '../../../store/slice/userSlice';

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
    }
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const response = await fetch(`${import.meta.env.VITE_URL}/users/img`, {
        credentials: 'include',
        method: 'PATCH',
        body: formData,
      });
      dispatch(updateImg(imageUrl));
    }
  };

  return (
    <div>
      <h4>Редактирование профиля</h4>
      <div>
        <div>Ваше имя</div>
        <div>
          <input
            onChange={changeHandler}
            type="text"
            name="firstName"
            id="firstName"
            maxLength={30}
            defaultValue={inputs.firstName}
          />
        </div>
      </div>
      <div>
        <div>Фамилия</div>
        <div>
          <input
            onChange={changeHandler}
            type="text"
            name="lastName"
            id="lastName"
            maxLength={30}
            defaultValue={inputs.lastName}
          />
          <label htmlFor="lastName">
            Ваше имя и фамилия будут использоваться в сертификате
          </label>
        </div>
      </div>
      <div>
        <div>Аватарка</div>
        <div>
          <div>
            <img src={imageUrl} alt="avatar" />
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
      <button onClick={(e) => void submitForm(e)} type="button">
        Применить изменения
      </button>
    </div>
  );
}
