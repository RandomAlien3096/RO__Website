import React, { useEffect, useRef } from 'react';
import './portfolio.css';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const uniqueRand = (min, max, prev) => {
    let next = prev;
    while(prev === next) next = rand(min, max);
    
    return next;
  }
  const combinations = [
    { configuration: 1, roundness: 1 },
    { configuration: 1, roundness: 2 },
    { configuration: 1, roundness: 3 },
    { configuration: 2, roundness: 2 },
    { configuration: 2, roundness: 3 }
  ];

  let prev = 0;

  
const Portfolio = () => {

  const wrapperRef = useRef();
  const interval = useRef();
  //const wrapper = document.getElementById("wrapper");

  useEffect(() => {
    let wrapper = wrapperRef.current;

    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = setInterval(() => {
      const index = uniqueRand(0, combinations.length - 1, prev),
        combination = combinations[index];

      wrapper.dataset.configuration = combination.configuration;
      wrapper.dataset.roundness = combination.roundness;

      console.log({
        configuration: wrapper.dataset.configuration,
        roundness: wrapper.dataset.roundness
      });
      prev = index;
    }, 3000);
  }, []);
  
  return (
    <div className='RO__portfolio' id='portfolio'>
      <div 
        className='RO__portfolio-content' 
        data-roundness="1" 
        data-configuration ="1" 
        id='wrapper'
        ref={wrapperRef}  >
        <div className='RO__portfolio-content_shape'></div>
        <div className='RO__portfolio-content_shape'></div>
        <div className='RO__portfolio-content_shape'></div>
        <div className='RO__portfolio-content_shape'></div>
        <div className='RO__portfolio-content_shape'></div>
        <div className='RO__portfolio-content_shape'></div>
        <div className='RO__portfolio-content_shape'></div>
      </div>
    </div>
  )

}

export default Portfolio