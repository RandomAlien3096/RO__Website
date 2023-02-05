import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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

  const handleClick = (event, shapeNum) => {
    console.log(event.currentTarget);
    console.log('shape clicked: ' + shapeNum);
  };


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
        
        <Link className='RO__portfolio-content_shape' onClick={event => handleClick(event, '1')} to = '/project1'>
          <div className='RO__portfolio-content_shape'></div>
        </Link>

        <Link className='RO__portfolio-content_shape' onClick={event => handleClick(event, '2')} to = '/project2'>
          <div className='RO__portfolio-content_shape'></div>
        </Link>
        
        <Link className='RO__portfolio-content_shape' onClick={event => handleClick(event, '3')} to = '/project3'>
          <div className='RO__portfolio-content_shape'></div>
        </Link>

        <Link className='RO__portfolio-content_shape' onClick={event => handleClick(event, '4')} to = '/project4'>
          <div className='RO__portfolio-content_shape'></div>
        </Link>

        <Link className='RO__portfolio-content_shape' onClick={event => handleClick(event, '5')} to = '/project5'>
          <div className='RO__portfolio-content_shape'></div>
        </Link>

        <Link className='RO__portfolio-content_shape' onClick={event => handleClick(event, '6')} to = '/project6'>
          <div className='RO__portfolio-content_shape'></div>
        </Link>

        <Link className='RO__portfolio-content_shape' onClick={event => handleClick(event, '7')} to = '/project7'>
          <div className='RO__portfolio-content_shape'></div>
        </Link>
        
      </div>
    </div>
  )

}

export default Portfolio