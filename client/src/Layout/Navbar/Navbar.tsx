import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { UserButton, useUser } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isSignedIn } = useUser();

  return (
    <div className="nav-main">
      <div className="nav-box">
        <div className="nav-right">
          <div className="logo_main">
            <h1>Triper</h1>
          </div>
          <div className="nav-links">
            <NavLink to="/">
              <h4>Home</h4>
            </NavLink>
            <NavLink to="/bookings">
              <h4>Bookings</h4>
            </NavLink>

            <h4
              onClick={() => {
                alert("comming soon");
              }}
            >
              Places
            </h4>
          </div>
        </div>

        <div className="nav-left">
          <button className="theme" onClick={toggleDarkMode}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {isSignedIn ? (
            <div className="user_bar">
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <NavLink to="/sign-in">
              <button className="sign-in-button">Sign In</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
