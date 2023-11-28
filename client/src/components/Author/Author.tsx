import React from 'react'
import styled from './Author.module.css'

export default function Author({ el }): JSX.Element {
  return (
    <div className={styled.containerauthor}>
      <div className={styled.imgcontainer}>
        <img className={styled.imgauthor} src="./src/assets/react.svg" alt="" />
      </div>
      <div className={styled.rightcontent}>
        <div className={styled.nametitle}>{el.name}</div>
        <div className={styled.downcontent}>
          <div className={styled.coursecontainer}>{el.course} курсов</div>
          <div className={styled.subscontainer}>{el.subs} подписчиков</div>
        </div>
      </div>
    </div>
  )
}
