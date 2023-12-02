import React from 'react'
import styled from './Module.module.css'


export default function Module({ module, i }): JSX.Element {

  return (
    <div className={styled.maincontcontent}>
      <div className={styled.modulecontainer}>
        <div className={styled.contentcontainer}>
          <div className={styled.counter}>{i}.</div>
          <div className={styled.headertitle}>{module.title}</div>
        </div>
      </div>
    </div>
  )
}
