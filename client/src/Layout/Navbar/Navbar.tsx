// src/components/Navbar.tsx
import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import { useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loginWithRedirect } = useAuth0();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".user_dropdown");
      const avatar = document.querySelector(".avatar");
      if (
        dropdown &&
        avatar &&
        !dropdown.contains(event.target as Node) &&
        !avatar.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //logic for the logout
  // const handleLogout = () => {
  //   setTimeout(() => {
  //     logout();
  //     window.location.href = "/";
  //   }, 2000);
  // };

  return (
    <div className="nav-main">
      <div className="nav-box">
        {/* Right side: Logo and navigation links */}
        <div className="nav-right">
          <div className="logo_main">
            <h1>MoClet</h1>
          </div>
          <div className="nav-links">
            <NavLink to="/">
              <h4>Home</h4>
            </NavLink>
            <NavLink to="/bookings">
              <h4>Bookings</h4>
            </NavLink>
            <NavLink to="/places">
              <h4>Places</h4>
            </NavLink>
          </div>
        </div>

        {/* Left side: Theme toggle and user section */}
        <div className="nav-left">
          <div className="theme-box">
            <button
              className={`theme ${isDarkMode ? "dark" : "day"}`}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaMoon /> : <FaSun />}
            </button>
          </div>

          {user ? (
            <div className="user_bar">
              <img
                src={
                  user.avatar_url ||
                  "https://cdn-icons-png.flaticon.com/512/9203/9203764.png"
                }
                alt="User Profile"
                className="avatar"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <div className="user_dropdown">
                  <span style={{ color: "black" }}>{user.username}</span>
                  <NavLink to="/user_dashboard">
                    <p>Dashboard</p>
                  </NavLink>
                  <NavLink to="/user_profile">
                    <p>Profile</p>
                  </NavLink>
                  <NavLink to="/settings">
                    <p>Settings</p>
                  </NavLink>
                  <p>Logout</p>
                </div>
              )}
            </div>
          ) : (
            <div className="sign-in">
              {/* <NavLink to="/login">
              </NavLink> */}
              <button onClick={() => loginWithRedirect()}>Sign-Innn</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
