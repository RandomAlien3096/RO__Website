import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

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


//----------------------------- Position Aware --------------------------
// document.addEventListener('DOMContentLoaded', function() {
//   var btns = document.querySelectorAll('.btn-6');

//   btns.forEach(function(btn) {
//     btn.addEventListener('mouseenter', function(e) {
//       var parentOffset = this.getBoundingClientRect(),
//           relX = e.pageX - parentOffset.left,
//           relY = e.pageY - parentOffset.top;
//       this.querySelector('span').style.top = relY + 'px';
//       this.querySelector('span').style.left = relX + 'px';
//     });

//     btn.addEventListener('mouseout', function(e) {
//       var parentOffset = this.getBoundingClientRect(),
//           relX = e.pageX - parentOffset.left,
//           relY = e.pageY - parentOffset.top;
//       this.querySelector('span').style.top = relY + 'px';
//       this.querySelector('span').style.left = relX + 'px';
//     });
//   });
// });
//-----------------------------------------------------------------------

 
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
{/* -----------------------Button Project------------------------ */}
    {/* <div class="wrap">
    <a class="btn-6" href="#">Position Aware<span></span></a>
    <a class="btn-7" href="#"><span>Alternate</span></a>
    <a class="btn-8" href="#">Smoosh</a>
    <a class="btn-9" href="#"><span>Vertical Overlap</span></a>
    <a class="btn-10" href="#"><span>Horizontal Overlap</span></a>
    <a class="btn-11" href="#">Collision</a>
  </div> */}

{/* ------------------------------------------------------------ */}
    </>
  );
}

export default Project2