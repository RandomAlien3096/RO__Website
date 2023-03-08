import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import textil from '../assets/Guatemala/textil2.jpg';
import tree from '../assets/Guatemala/tree.png';

import './project3.css';
import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

import { Circle } from '../icons';
import { CircleRings } from '../icons';
import { DottedRadial } from '../icons';
import { Footer } from '../containers';
import { Navbar } from '../components';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;


const Project3 = () => {
  const deadline = new Date('February, 27, 2023').toString();

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
  <>
    <div className='RO__Navbar'>
      <Navbar />
    </div>
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
    <div className='RO__Parallax'>
      <div className='RO__Parallax_background'>
        <ParallaxBanner 
          layers={[
            { image: textil, speed: -30}
          ]}>
        </ParallaxBanner>
      </div>
      <div className='RO__Parallax_foreground'>
        <ParallaxBanner 
        layers={[
          {image: tree, speed: -5},
          {
            speed: -7,
            children: (
              <div className='RO__Parallax_foreground-title'>
                  <h1>R A F A E L</h1>  
              </div>
            ),
          }
        ]}>
        </ParallaxBanner>
      </div>
    </div>
    <div className='RO__Overlap'>
      <Parallax
        translateY={[-50, 50]}
        translateX={[-10, 90]}>
        <Circle className='RO__Overlap-Circle' />
      </Parallax>
      <Parallax 
        translateY={[-50, 50]}
        translateX={[10, -90]}>
        <CircleRings className='RO__Overlap-circleRings' />
      </Parallax>
    </div>
    <div className='RO__Overlapfooter'>
        <Footer  />
    </div>
  </>
  );
};

export default Project3