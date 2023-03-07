import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import { RiMenu3Line } from 'react-icons/ri';
import { HiUser, HiOutlineCubeTransparent, HiPuzzle, HiOutlinePaperAirplane } from 'react-icons/hi';
import logo from '../../assets/logo.png';
import { HashLink as Link } from 'react-router-hash-link' ;


const Menu = () => (
  <>

  <Link to='/#about'><HiUser /></Link>
  <p>
    <Link to='/#about'>
      About Me
    </Link>
  </p>
  {/* <p><a href = "#about">About me</a></p> */}
  
  <Link to='/#services'><HiOutlineCubeTransparent /></Link>
  <p>
    <Link to='/#services'>
      Services
    </Link>
  </p>
  <Link to='/#portfolio'><HiPuzzle /></Link>
  <p>
    <Link to='/#portfolio'>
      Portfolio
    </Link>
  </p>

  <Link to='/contactForm'><HiOutlinePaperAirplane /></Link>
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

let menuRef = useRef();

  useEffect(() => {
    let handler = (e) =>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handler);

    return() => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <div className ="RO__navbar" id='home'>
      <div className='RO__navbar-links'>
        <div className='RO__navbar-links_logo'>
          <img src = {logo} alt = "logo" id='logo'/>
          <div className='RO__navbar-rafael'>
            <p><a href='#header'>Rafael Oliva</a></p>
          </div>
        </div>
        <div className='RO__navbar-links_container'>
          <Menu />
        </div>
      </div>
      <div className='RO__navbar-menu2' ref={menuRef}>
        <button type='button' className='RO__navbar-menu2_trigger' onClick={() => setOpen(!open)}>
          <h3>Menu </h3><RiMenu3Line />
        </button>
        <div className={`RO__navbar-menu2_dropdown ${open? 'active' : 'inactive'}`}>
          <div className='RO__navbar-menu2_dropdown-links'>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar