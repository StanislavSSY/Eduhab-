import React, { useState, useEffect, Children, cloneElement, useRef } from 'react';
import styled from './Carousel.module.css';
import clsx from 'clsx';

let position = 0;
const Carousel = ({ children }) => {

  const [prev, setPrev] = useState(false)
  const [next, setNext] = useState(false)

  const slider = useRef(null);

  function prevHandler(): void {
    console.log(position);
    
    if (position === 0) {
      setPrev(true)
    } else {
      setNext(false);
      position += 660
      slider.current.childNodes.forEach((elem) => {
        elem.style = `
        transition: .5s;
        transform: translateX(${position}px)
        `
      });
    }
  }

  function nextHandler(): void {
    console.log(position <= -(children.length - 3) * 330);
    
    console.log(position);
    if (position <= -(children.length - 3) * 330) {
      setNext(true)
      setPrev(false)
    } else {
      setPrev(false)
      position -= 660
      slider.current.childNodes.forEach((elem) => {
        elem.style = `
        transition: .5s;
        transform: translateX(${position}px)
        `
      });
    }
  }

  return (
    <div className={styled.containercarousel}>
      <button className={clsx(styled.carobtn, styled.btnprev)} disabled={prev} onClick={prevHandler}>{`<`}</button>
      <div className={styled.carouselcontent} ref={slider}>
        {children}
      </div>
      <button className={clsx(styled.carobtn, styled.btnnext)} disabled={next} onClick={nextHandler}>{`>`}</button>
    </div>
  )
}

export default Carousel;
