import React from 'react';
import { IpynbRenderer } from 'react-ipynb-renderer';
import "react-ipynb-renderer/dist/styles/monokai.css"

import './project1.css';
import ipynb from './TelstraNotebookCatboost.ipynb';


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
      
    </div>
  );
}

export default Project1