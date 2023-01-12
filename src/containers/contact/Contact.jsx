import React from 'react';
import './contact.css';

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
            <button type='button'>Let's start</button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Contact