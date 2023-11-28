import React, { useState, useEffect } from 'react'
import styled from './Authors.module.css'
import Author from '../Author/Author'
import Carousel from '../Carousel/Carousel'

const arrauthors = [
  {
    id: 1,
    name: 'BRO NE BRO',
    course: 9,
    subs: 234,
  },
  {
    id: 2,
    name: 'BRO NE BRO',
    course: 5,
    subs: 234,
  },
  {
    id: 3,
    name: 'BRO NE BRO',
    course: 4,
    subs: 234,
  },
  {
    id: 4,
    name: 'BRO NE BRO',
    course: 3,
    subs: 234,
  },
  {
    id: 5,
    name: 'BRO NE BRO',
    course: 2,
    subs: 234,
  },
  {
    id: 6,
    name: 'BRO NE BRO',
    course: 1,
    subs: 2353768,
  },
  {
    id: 7,
    name: 'BRO NE BRO',
    course: 45,
    subs: 78078,
  },
  {
    id: 8,
    name: 'BRO NE BRO',
    course: 68,
    subs: 123,
  },
  {
    id: 9,
    name: 'BRO NE BRO',
    course: 9,
    subs: 234,
  },
  {
    id: 10,
    name: 'BRO NE BRO',
    course: 5,
    subs: 234,
  },
  {
    id: 11,
    name: 'BRO NE BRO',
    course: 4,
    subs: 234,
  },
]

export default function Authors(): JSX.Element {
  const [auth, setAuth] = useState([{}])

  useEffect(() => {
    setAuth(arrauthors)
  }, [])
  return (
    <div className={styled.authorscontainer}>
      <div className={styled.aboutblock}>
        <div className={styled.title}>Авторы курсов</div>
      </div>
      <div className={styled.authorscontainercontent}>
        <Carousel>
          {auth.map((el, index) => (
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
