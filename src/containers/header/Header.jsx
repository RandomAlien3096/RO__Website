import React from 'react';
import './header.css';

import Typewriter from 'typewriter-effect';
// ------------NEW STYLE----------------
import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

import video_bg from '../../assets/bg_video1.mp4';
import textil from '../../assets/Guatemala/textil2.jpg';
import tree from '../../assets/Guatemala/tree.png';
import { Circle } from '../../icons';
import { CircleRings } from '../../icons';

const Header = () => {
  return (
    <>
    <div className='RO__header section__padding' >
      <div className='RO__header-content'>
        <h1 className='content_text-1'>
          I’m 
        </h1>
        <div className='content_text-effect'>
          
          <Typewriter 
            options={{
              strings: ['an Engineer', 'a Data Scientist', 'a Web Developer'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <h1 className='content_text-2'>
          here to help you turn your business into something greater
        </h1>
      </div>
    </div>
    <div className='RO__Parallax'>
      <div className='RO__Parallax_background'>
        <video 
          src = {video_bg} autoPlay loop 
          className='RO__Parallax_foreground-video'
          type = 'video/mp4/'
        /> 
      </div>
      <div className='RO__Parallax_foreground'>
        <ParallaxBanner 
        layers={[
          ,
          {
            speed: -15,
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
        translateX={[10, -90]}
        rotate={[-360,0]}>
        <CircleRings className='RO__Overlap-circleRings' />
      </Parallax>
    </div>
    
    </>
  )
}

export default Header