import React, { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import styled from "./ButtonProfile.module.css";
import { Link } from "react-router-dom";

export default function ButtonProfile({ logOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { firstName, lastName, img_url } = useAppSelector(
    (store) => store.userSlice.user
  );

  useEffect(() => {
    console.log(img_url);
  },[img_url]);

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
      {img_url !== 'stock_avatar.jpg' ? (
      <div className={styled["button-icon-two"]} onClick={toggleMenu}>
        <img className={styled.imgprofile} src={`/img/${img_url}`} alt="" />
      </div>
      ) : (
        <div className={styled["button-icon"]} onClick={toggleMenu}>
          {firstName[0].toLocaleUpperCase()}
          {lastName[0].toLocaleUpperCase()}
        </div>
      )}

      {isOpen && (
        <div
          className={styled["dropdown-menu"]}
          onBlur={closeMenu}
          tabIndex="0"
        >
          <ul>
            <li>
              <Link onClick={closeMenu} to="/user/profile">
                Профиль
              </Link>
            </li>

            <li>
              <Link onClick={closeMenu} to="/user/settings">
                Настройки
              </Link>
            </li>
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
