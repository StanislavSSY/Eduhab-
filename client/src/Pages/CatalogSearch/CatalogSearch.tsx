import React, { useState, useEffect } from 'react'
import styled from './CatalogSearch.module.css'
import FindCourse from '../../components/FindCourse/FindCourse'

export default function CatalogSearch(): JSX.Element {
  const [inpvalue, setInpValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(inpvalue)
  }, [inpvalue])

  return (
    <div className={styled.searchcontainer}>
      <div className={styled.onlysearchcont}>
        <FindCourse inpvalue={inpvalue} setInpValue={setInpValue} setData={setData} />
      </div>
      <div className={styled.resultcont}>
        {/* {data.length >= 1 ? }  */}
      </div>
    </div>
  )
}
