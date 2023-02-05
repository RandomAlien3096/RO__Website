import React from 'react';
import './header.css';

import Typewriter from 'typewriter-effect';

const Header = () => {
  return (
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
  )
}

export default Header