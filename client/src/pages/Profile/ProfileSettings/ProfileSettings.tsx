import React from "react";

export default function ProfileSettings() {
  return (
    <div>
      <h4>Редактирование профиля</h4>
      <div>
        <div>Ваше имя</div>
        <div>
          <input type="text" name="firstName" id="firstName" maxLength={30} />
        </div>
      </div>
      <div>
        <div>Фамилия</div>
        <div>
          <input type="text" name="lastName" id="lastName" maxLength={30} />
          <label htmlFor="lastName">
            Ваше имя и фамилия будут использоваться в сертификате
          </label>
        </div>
      </div>
    </div>
  );
}
