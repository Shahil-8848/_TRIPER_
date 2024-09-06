import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa'; // Importing FaSun for light mode icon

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className='nav-main'>
      <div className="nav-box">
        <div className='nav-right'>
          <div className='logo_main'>
            <h1>MoClet</h1>
          </div>
          <div className='nav-links'>
            <h4>Home</h4>
            <h4>Bookings</h4>
            <h4>Places</h4>
          </div>
        </div>
        <div className='nav-left'>
          <div className='sign-in'>
            <NavLink to='/login'>
              <button>Sign-In</button>
            </NavLink>
          </div>
          <div className='theme-box'>
            <button className='theme' onClick={toggleDarkMode}>
              {isDarkMode ? <FaMoon /> : <FaSun />} {/* Conditional rendering */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
