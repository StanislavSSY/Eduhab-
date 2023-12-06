import React, { useState, useEffect } from 'react'
import styled from './Authors.module.css'
import Author from '../Author/Author'
import Carousel from '../Carousel/Carousel'

export default function Authors(): JSX.Element {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    void(async() => {
      const response = await fetch(`${import.meta.env.VITE_URL}/users`, {
        credentials: 'include',
      });

      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        
        setAuthors(result);
      }
    })();
  }, [])
  return (
    <div className={styled.authorscontainer}>
      <div className={styled.aboutblock}>
        <div className={styled.title}>Авторы курсов</div>
      </div>
      <div className={styled.authorscontainercontent}>
        <Carousel>
          {authors.map((el, index) => (
            <div key={index}>
              <button className={styled.btnrefpeopleprofile}>
                <Author el={el} />
              </button>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
