import React, { useState, useEffect } from 'react'
import styled from './CatalogSearch.module.css'
import Search from './Search/Search';
import CardCourse from '../../components/CardCourse/CardCourse';
import { CourseType } from '../../types';
import { useNavigate } from 'react-router-dom';

export default function CatalogSearch(): JSX.Element {
  const [inpvalue, setInpValue] = useState('');
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const q = queryParams.get('q');
  const free = queryParams.get('free');

  useEffect(() => {
    if (q) {
      if (free) {
        setInpValue(q);
        const newArg = data.filter((course: CourseType) => {
          return course.title.toLowerCase().includes(q.toLowerCase());
        })
        const superNewArg = newArg.filter((course: CourseType) => course.new_price === 0);
        setNewData(superNewArg);
        setFlag(true);
      } else {
        setInpValue(q);
        const newArg = data.filter((course: CourseType) => {
          return course.title.toLowerCase().includes(q.toLowerCase());
        })
        setNewData(newArg);
        setFlag(true);
      }
    } else {
      if (free) {
        const arg = data.filter((course: CourseType) => course.new_price === 0)
        setNewData(arg);
        setFlag(true);
      }
    }
  }, [data])

  useEffect(() => {
    if (flag) {
      if (inpvalue === '') {
        navigate('/catalog/search');
      }
    }
  },[inpvalue]);

  

  const filtredCourses = data.filter((course: CourseType) => {
    return course.title.toLowerCase().includes(inpvalue.toLowerCase());
  })

  return (
    <div className={styled.searchcontainer}>
      <div className={styled.onlysearchcont}>
        <Search inpvalue={inpvalue} setInpValue={setInpValue} data={data} setData={setData} filtredCourses={filtredCourses} setNewData={setNewData} />
      </div>
      <div className={styled.resultcont}>
        <div className={styled.resultsearchtitle}>Результаты Поиска:</div>
        <div className={styled.searchedcourses}>
          {newData.length >= 1 ? (
            newData.map((el) => (
              <div className={styled.contperdata} key={el.id}>
                <CardCourse el={el} />
              </div>
            ))
          ): (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
