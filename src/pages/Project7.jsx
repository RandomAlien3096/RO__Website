import React from 'react';
import { Link } from 'react-router-dom';
import { IpynbRenderer } from 'react-ipynb-renderer';
import "react-ipynb-renderer/dist/styles/monokai.css"
import { useState, useEffect, useMemo } from 'react';


import './project7.css';
import ipynb from './TelstraNotebookCatboost.ipynb';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;


const Project7 = () => {
  const deadline = new Date('February, 25, 2023').toString();

  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
      const interval = setInterval(
          () => setTime(parsedDeadline - Date.now()),
          1000,
      );

      return () => clearInterval(interval);
  }, []);
 
  return (
    <div className='RO__ComingSoon'>
      <div className='RO__ComingSoon-content'>
        <p>Page is under construction</p>
        <h1>Launching Soon this Project</h1>
      </div>
      <div className='RO__ComingSoon-timer'>
            {Object.entries({
                Days: time / DAY,
                Hours: (time / HOUR) % 24,
                Minutes: (time / MINUTE) % 60,
                Seconds: (time / SECOND) % 60,
            }).map(([label, value]) => (
                <div key={label} className="col-4">
                    <div className="RO__ComingSoon-timer_box">
                        <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                        <span className="text">{label}</span>
                    </div>
                </div>
            ))}
      </div>
      {/* <div className='RO__ComingSoon-timer'>
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
      </div> */}
      <div className='RO__ComingSoon-button'>
        <Link to='/'>
          <button type='button'>Back to Landing Page</button>
        </Link>
      </div>
      
      
    </div>
    
  );
}

export default Project7