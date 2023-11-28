// OftenSearched.tsx
import React from 'react';
import styles from './OftenSearched.module.css';

export default function OftenSearched(): JSX.Element {
  return (
    <>
      <div className={styles['catalog-block__title']}>Часто ищут</div>
      <div className={styles['catalog-block']}>
        <div className={styles['catalog-block__content']}>
          <div id="ember702" className="catalog-block-simple-course-lists ember-view">
            <div className={styles['course-list-cards']} data-list-type="grid">

              {/* Карточка "Разработка на Python" */}
              <div className={styles['course-list-card']}>
                <a className={styles['course-list-card__link-wrapper']} href="/">
                  <div className={styles['course-list-card__title']}>Разработка на Python</div>
                  <div className={styles['course-list-card__courses']}>49 курсов</div>
                </a>
              </div>

              {/* Карточка "Разработка на C++" */}
              <div className={styles['course-list-card']}>
                <a className={styles['course-list-card__link-wrapper']} href="/">
                  <div className={styles['course-list-card__title']}>Разработка на C++</div>
                  <div className={styles['course-list-card__courses']}>21 курс</div>
                </a>
              </div>

              {/* Карточка "SQL и базы данных" */}
              <div className={styles['course-list-card']}>
                <a className={styles['course-list-card__link-wrapper']} href="/">
                  <div className={styles['course-list-card__title']}>SQL и базы данных</div>
                  <div className={styles['course-list-card__courses']}>30 курсов</div>
                </a>
              </div>

           

              {/* Пример для карточки "Data Science и ML" */}
              <div className={styles['course-list-card']}>
                <a className={styles['course-list-card__link-wrapper']} href="/">
                  <div className={styles['course-list-card__title']}>Data Science и ML</div>
                  <div className={styles['course-list-card__courses']}>31 курс</div>
                </a>
              </div>

              {/* Пример для карточки "Excel и Google Таблицы" */}
              <div className={styles['course-list-card']}>
                <a className={styles['course-list-card__link-wrapper']} href="/">
                  <div className={styles['course-list-card__title']}>Excel и Google Таблицы</div>
                  <div className={styles['course-list-card__courses']}>39 курсов</div>
                </a>
              </div>

              {/* Пример для карточки "Маркетинг и продажи" */}
              <div className={styles['course-list-card']}>
                <a className={styles['course-list-card__link-wrapper']} href="/">
                  <div className={styles['course-list-card__title']}>Маркетинг и продажи</div>
                  <div className={styles['course-list-card__courses']}>57 курсов</div>
                </a>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
