import React from 'react';
import './contact.css';
import { HashLink as Link } from 'react-router-hash-link';
import { useLoaction } from 'react-router-dom';

const Contact = () => {
  return (
    <div className='RO__contact' id='contact'>
      <div className='RO__contact-content'>
        <div className='RO__contact-content_text'>
          <p>Make your project my next obsession.</p>
        </div>
        <div className='RO__contact-content_shape'>
          <div className='RO__contact-content_shape-title'>
            <p>Let's talk</p> 
          </div>
          <div className='RO__contact-content_shape-text'>
            <p>The door is always open for a good cup of coffee.</p> 
          </div>
          <div className='RO__contact-content_shape-button'>
            <Link to='/contactForm' className='RO__contact-content_shape-button_Link'>
              <button type='button'>Let's start</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact