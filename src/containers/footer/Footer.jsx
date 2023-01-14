import React from 'react';
import './footer.css';
import logoGold from '../../assets/logo_gold.png';

const Footer = () => {
  return (
    <div className='RO__footer' id='footer'>
      <div className='RO__footer-content'>
      <div className='RO__footer-content_logo'>
        <img src= {logoGold} alt='logo in gold' />
        <h1>Rafael Oliva</h1>
      </div>
      <div className='RO__footer-content_links'>
        <p>Contact</p>
        <div className='RO__footer-content_links-bar'></div>
        <p>Social</p>
        <div className='RO__footer-content_links-bar'></div>
        <p>Services</p>
      </div>
      </div>
    </div>
  )
}

export default Footer