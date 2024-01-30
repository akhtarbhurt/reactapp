// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useGlobalContext } from '../store/store';

const Navbar = () => {
  const { handledInput, value } = useGlobalContext();
  const [menu, setMenu] = useState();
  const [input, setInput] = useState(false);
  const navigate = useNavigate();
  const handledMenuEvent = () => {
    setMenu(!menu);
  };

  const handledNavigate = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim() !== '') {
        navigate('/SearchResults');
      }
    }
  };
 

  useEffect(()=>{
    const scrollEfect = window.addEventListener(('scroll'), ()=>{
      if(window.scrollY > 52){
        setInput(true)
      } else{
        setInput(false)
      }
    })

    return ()=> {
      window.removeEventListener('scroll', scrollEfect)
    }
  })

  return (
    <nav  className={` nav ${input === true ? "nav-active" : "nav"}`} >
      <div className="logo">
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <ul className={`${menu ? "active" : ""}`} >
        <NavLink to={'/'} onClick={handledMenuEvent}>
       
          Home
        </NavLink>
        <NavLink to={'/movies'} onClick={handledMenuEvent}>
          
          Movies
        </NavLink>
        <NavLink to={'/tvShows'} onClick={handledMenuEvent}>
          
          Tv Shows
        </NavLink>
        <div className="input-forms">
          <input
            type="text"
            placeholder="Search Here...."
            onKeyDown={(e) => {
              handledInput(e);
              handledNavigate(e);
            }}
            
          />

          <button >
            <SearchIcon className='s-icon' />
          </button>
        </div>
      </ul>
      <div className="menubar" onClick={handledMenuEvent}>
        {menu ? <CloseOutlinedIcon /> : <MenuIcon />}
      </div>
    </nav>
  );
};

export default Navbar;
