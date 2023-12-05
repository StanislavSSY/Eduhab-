import React, { useEffect } from 'react';
import styled from './Search.module.css';

export default function Search({ inpvalue, setInpValue, data, setData, filtredCourses, setNewData }): JSX.Element {


  useEffect(() => {
    void(async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/courses/`, {
        credentials: 'include',
      });
  
      if (response.status === 200) {
        const result = await response.json();
        setData(result);
      }
    })();
  }, [])

  function itemClickHandler(e): void {
    setInpValue(e.target.textContent);
  }

  function searchCoursesHandler(): void {
    const newData = data.filter((el) => el.title.toLowerCase().includes(inpvalue.toLowerCase()))
    setNewData(newData);
  }


  return (
    <div className={styled['search-form']}>
      <div className={styled['search-form__form']}>
        <div className={styled['search-form__input-wrapper']}>
          <span className={styled['search-form__autocomplete']}>
            <div className={styled['drop-down']}>
              <div className={styled['with-autocomplete__drop-down']}>
                <div className={styled['with-autocomplete__content']}>
                  <input
                    className={styled['search-form__input']}
                    placeholder="Название курса, автор или предмет"
                    autoComplete="off"
                    spellCheck="false"
                    aria-label="Search"
                    type="search"
                    onChange={(e) => setInpValue(e.target.value)}
                    value={inpvalue}
                  />
                  <ul className={styled.autocomplete}>
                    {
                      inpvalue ? 
                      filtredCourses.length >= 1 ? (
                        filtredCourses.map((el) => (
                          <li className={styled.autocomplete_item} onClick={itemClickHandler}>{el.title}</li>
                        ))
                      ) : (
                        <></>
                      ) : null
                    }
                  </ul>
                </div>
              </div>
            </div>
          </span>
        </div>

        <label className={styled['form-checkbox']}>
          <input type="checkbox" />
          <span>С сертификатами</span>
        </label>

        <label className={styled['form-checkbox']}>
          <input type="checkbox" />
          <span>Бесплатные</span>
        </label>

        <button
          className={`${styled['button_with-loader']} ${styled['search-form__submit']}`}
          type="button"
          data-ember-action=""
          data-ember-action-345="345"
          onClick={searchCoursesHandler}
        >
          Искать
        </button>
      </div>
    </div>
  );
}
