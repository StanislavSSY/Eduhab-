// FindCourse.tsx
import React from "react";
import styles from "./FindCourse.module.css";

export default function FindCourse(): JSX.Element {
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
                    placeholder="Название курса, автор или предмет"
                    autoComplete="off"
                    spellCheck="false"
                    aria-label="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
          </span>
        </div>

        <label className={styles["form-checkbox"]}>
          <input type="checkbox" />
          <span>С сертификатами</span>
        </label>

        <label className={styles["form-checkbox"]}>
          <input type="checkbox" />
          <span>Бесплатные</span>
        </label>

        <button
          className={`${styles["button_with-loader"]} ${styles["search-form__submit"]}`}
          type="button"
          data-ember-action=""
          data-ember-action-345="345"
        >
          Искать
        </button>
      </div>
    </div>
  );
}
