import React, { useState } from 'react';
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png';
import { Link }  from 'react-router-dom';

const Menu = () => (
  <>
  <p><a href = "#about">About me</a></p>
  <p><a href = "#services">Services</a></p>
  <p><a href = "#portfolio">Portfolio</a></p>
  <p><a href = "#contact">Contact</a></p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className ="RO__navbar" id='home'>
      <div className='RO__navbar-links'>
        <div className='RO__navbar-links_logo'>
          <img src = {logo} alt = "logo" />
          <div className='RO__navbar-rafael'>
            <p><a href='#header'>Rafael Oliva</a></p>
          </div>
        </div>
        
        <div className='RO__navbar-links_container'>
          <Menu />
        </div>
      </div>
      <div className='RO__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color="#000000" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='#000000' size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='RO__navbar-menu_container'>
            <div className='RO__navbar-menu_container-links'>
              <Menu />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar