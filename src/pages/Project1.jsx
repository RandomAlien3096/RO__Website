import React from 'react';
import { IpynbRenderer } from 'react-ipynb-renderer';
import "react-ipynb-renderer/dist/styles/monokai.css"
import { useEffect, useState } from 'react';

import './project1.css';
import ipynb from './TelstraNotebookCatboost.ipynb';


const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown)
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };

const Project1 = () => {
  return (
    <div className='RO__ComingSoon'>
      <div className='RO__ComingSoon-content'>
        <p>Page is under construction</p>
        <h1>Launching Soon this Project</h1>
      </div>
      <div className='RO__ComingSoon-timer'>
        <div className='RO__ComingSoon-timer_Days'>
          <p>00</p>
          <span>Days</span>
        </div>
        <div className='RO__ComingSoon-timer_Hours'>
          <p>00</p>
          <span>Hours</span>
        </div>
        <div className='RO__ComingSoon-timer_Minutes'>
          <p>00</p>
          <span>Minutes</span>
        </div>
        <div className='RO__ComingSoon-timer_Seconds'>
          <p>00</p>
          <span>Seconds</span>
        </div>
      </div>
      <div className='RO__ComingSoon-button'>
          <button type='button'>Go back to Landingpage</button>
      </div>
    </div>
  );
}

export default Project1