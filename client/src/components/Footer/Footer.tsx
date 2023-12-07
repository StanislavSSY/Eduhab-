import React from "react";
import styled from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styled.footer}>
      <div className={styled["body-footer"]}>
        {/* <ul>
          <li>Есть вопросы? Звоните!</li>
          <li>8-800-535-35-35</li>
          <li>Это всегда проще</li>
        </ul>
        <hr /> */}
        {/* <ul>
          <li>Договор услуг копирайтинга</li>
          <li>Лицензионное соглашение</li>
          <li>Cогласие на обработку персональных данных</li>
          <li>Политика конфиденциальности</li>
          <li>Соглашение об использовании курсов</li>
        </ul> */}
        <div className={styled["link-block"]}>
          <ul>
            <Link to={"/"}>
              <li>Авторам курсов</li>
            </Link>
            <Link to={"/"}>
              <li>Компаниям</li>
            </Link>
            <Link to={"/"}>
              <li>Помощь</li>
            </Link>
            <Link to={"/"}>
              <li>Контакты</li>
            </Link>
          </ul>
          <ul>
            <Link to={"/"}>
              <li>О проекте</li>
            </Link>{" "}
            <Link to={"/"}>
              <li>Команда</li>
            </Link>{" "}
            <Link to={"/"}>
              <li>Вакансии</li>
            </Link>{" "}
            <Link to={"/"}>
              <li>Прессе</li>
            </Link>{" "}
          </ul>
        </div>
        <ul className={styled.social}>
          <li>
            <a href="">
              <i className="fa-brands fa-whatsapp fa-lg" target="_blank"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa-brands fa-telegram fa-lg" target="_blank"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa-brands fa-viber fa-lg" target="_blank"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="fa-brands fa-github fa-lg" target="_blank"></i>
            </a>
          </li>
        </ul>
        <ul>
          <li>EDUHUB © 2023 Все права защищены</li>
        </ul>
      </div>
    </footer>
  );
}
