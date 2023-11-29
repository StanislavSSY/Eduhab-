import React from "react";
import { Link } from "react-router-dom";

export default function ProfileMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="profile">
            <button type="button">Профиль</button>
          </Link>
        </li>
        <li>
          <Link to="settings">
            <button type="button">Настройки</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
