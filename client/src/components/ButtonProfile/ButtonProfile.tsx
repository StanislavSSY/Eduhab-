import React, { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import styled from "./ButtonProfile.module.css";

export default function ButtonProfile({ logOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { firstName, lastName } = useAppSelector(
    (store) => store.userSlice.user
  )
  console.log("⚠️  firstName,lastName【】➜ ", firstName, lastName);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styled["dropdown-container"]} ref={dropdownRef}>
      <div className={styled["button-icon"]} onClick={toggleMenu}>
        {firstName[0].toLocaleUpperCase()}
        {lastName[0].toLocaleUpperCase()}
      </div>

      {isOpen && (
        <div
          className={styled["dropdown-menu"]}
          onBlur={closeMenu}
          tabIndex="0"
        >
          <ul>
            <li>Профиль</li>
            <li>Настройки</li>
            <li>Уведомления</li>
            <li>Что нового</li>
            <hr />
            <li>
              <div className={styled.logout} onClick={logOut}>
                Выход {""}
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
