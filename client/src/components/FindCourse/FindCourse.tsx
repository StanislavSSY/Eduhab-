import React, { useState, useEffect } from "react";
import styles from "./FindCourse.module.css";
import { useNavigate } from "react-router-dom";

export default function FindCourse(): JSX.Element {

  const [inpData, setInpData] = useState('');
  const [free, setFree] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(inpData);
    console.log(free); 
  },[inpData, free]);


  function handleKeyPress(event): void {
    if (event.key === "Enter") {
      redirectHandler();
    }
  }

  function redirectHandler(): void {
    if (free) {
      if (inpData) {
        navigate(`/catalog/search?q=${inpData}&?free=true`);
      } else {
        navigate(`/catalog/search?free=true`);
      }
    } else {
      navigate(`/catalog/search?q=${inpData}`);
    }
  }

  return (
    <div className={styles["search-form"]}>
      <div className={styles["search-form__form"]}>
        <div className={styles["search-form__input-wrapper"]}>
          <span className={styles["search-form__autocomplete"]}>
            <div className={styles["drop-down"]}>
              <div className={styles["with-autocomplete__drop-down"]}>
                <div className={styles["with-autocomplete__content"]}>
                  <input
                    className={styles["search-form__input"]}
                    placeholder="Название курса или ключевое слово"
                    autoComplete="off"
                    spellCheck="false"
                    aria-label="Search"
                    type="search"
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setInpData(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </span>
        </div>

        <label className={styles["form-checkbox"]}>
          <input onChange={() => setFree(!free)} type="checkbox"  />
          <span>Бесплатные</span>
        </label>

        <button
          className={`${styles["button_with-loader"]} ${styles["search-form__submit"]}`}
          type="button"
          data-ember-action=""
          data-ember-action-345="345"
          onClick={redirectHandler}
        >
          Искать
        </button>
      </div>
    </div>
  );
}
