import React from 'react';
import './footer.css';
import logoGold from '../../assets/logo_gold.png';
// import { Link } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link' ;
import { Maps } from '../../components';

const Footer = () => {
  return (
    <div className='RO__footer' id='footer'>
      <div className='RO__footer-content'>
        <div className='RO__footer-content_maps'>
          <Maps />
        </div>
        <div className='RO__footer-content_logo'>
          <Link className='RO__footer-content_logo' to='/#header'>
            <img src= {logoGold} alt='logo in gold' />  
          </Link>
          <h1>Rafael Oliva</h1>
        </div>
        <div className='RO__footer-content_links'>
          <Link to='/contactForm'>
            <p>Contacto</p>
          </Link>
          <div className='RO__footer-content_links-bar'></div>
          <p>Social</p>
          <div className='RO__footer-content_links-bar'></div>
          <Link to='/#services'>
            <p>Servicios</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer