import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
// import JupyterViewer from 'react-jupyter-notebook';
import { JupyterNotebookViewer } from "react-jupyter-notebook-viewer";

import notebook from'./01_TelstraNetworkDisruption/TelstraNotebookCatboost.json';
import './project2.css';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;


const Project2 = () => {
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
 
  //---------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function() {
    var btns = document.querySelectorAll('.btn-6');
  
    btns.forEach(function(btn) {
      btn.addEventListener('mouseenter', function(e) {
        var parentOffset = this.getBoundingClientRect(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        this.querySelector('span').style.top = relY + 'px';
        this.querySelector('span').style.left = relX + 'px';
      });
  
      btn.addEventListener('mouseout', function(e) {
        var parentOffset = this.getBoundingClientRect(),
            relX = e.pageX - parentOffset.left,
            relY = e.pageY - parentOffset.top;
        this.querySelector('span').style.top = relY + 'px';
        this.querySelector('span').style.left = relX + 'px';
      });
    });
  });

  //---------------------------------------------------------------------

  return (
    <>
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
      <div className='RO__ComingSoon-button'>
        <Link to='/'>
          <button type='button'>Back to Landing Page</button>
        </Link>
      </div>
    </div>
    
    {/* ------------------------------------------------------------- */}

    <div class="wrap">
      <a class="btn" href="#">Position Aware<span></span></a>
      <a class="btn" href="#"><span>Alternate</span></a>
      <a class="btn" href="#">Smoosh</a>
      <a class="btn" href="#"><span>Vertical Overlap</span></a>
      <a class="btn" href="#"><span>Horizontal Overlap</span></a>
      <a class="btn" href="#">Collision</a>
    </div>

    {/* ------------------------------------------------------------- */}
    

    </>
  );
}

export default Project2