import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="navbar__brand mobile">News</span>
      <span className="navbar__brand desktop">Accelerated News</span>
      <ul>
        <li>
          <NavLink className="navbar__link" to="/" end>
            Headlines
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar__link" to="/sports" end>
            Sports
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
