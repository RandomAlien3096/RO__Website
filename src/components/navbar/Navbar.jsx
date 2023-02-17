import React, { useState } from 'react';
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png';
import { HashLink as Link } from 'react-router-hash-link' ;


const Menu = () => (
  <>
  <p>
    <Link to='/#about'>
      About Me
    </Link>
  </p>
  {/* <p><a href = "#about">About me</a></p> */}
  <p>
    <Link to='/#services'>
      Services
    </Link>
  </p>
  <p>
    <Link to='/#portfolio'>
      Portfolio
    </Link>
  </p>
  <p>
    <Link to='/contactForm'>
    Contact
    </Link>
  </p>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [ open, setOpen ] = useState(false);

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
      {/* <div className='RO__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine ClassName='CloseLine' color="#000000" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line ClassName='MenuLine' color='#000000' size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='RO__navbar-menu_container'>
            <div className='RO__navbar-menu_container-links'>
              <Menu  />
            </div>
          </div>
        )}
      </div> */}
      <div className='RO__navbar-menu'>
        <button type='button' className='RO__navbar-menu_trigger' onClick={() => setOpen(!open)}>
          <h3>Menu <RiMenu3Line /></h3>
        </button>
        <div className={`RO__navbar-menu_dropdown ${open? 'active' : 'inactive'}`}>
          <div className='RO__navbar-menu_container-links'>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar