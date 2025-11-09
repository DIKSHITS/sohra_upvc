import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SohraLogo from "../Components/logo/sohra-updated.png";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const go = (path) => {
    navigate(path);
    setOpen(false); // close menu after navigation on mobile
  };

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        {/* Left: Logo */}
        <div
          className="navbar-logo"
          onClick={() => go("/")}
          tabIndex={0}
          role="button"
          aria-label="Go to home"
        >
          <img
            src={SohraLogo}
            alt="Sohra Metal Logo"
            className="navbar-logo-img"
          />
        </div>

        {/* Center: Links */}
        <ul
          id="nav-menu"
          className={`navbar-links ${open ? "is-open" : ""}`}
          role="menubar"
        >
          <li className="navbar-link" role="menuitem" onClick={() => go("/")}>
            Home
          </li>
          <li
            className="navbar-link"
            role="menuitem"
            onClick={() => go("/about")}
          >
            AboutUs
          </li>
          <li
            className="navbar-link"
            role="menuitem"
            onClick={() => go("/Productsredirect")}
          >
            Products
          </li>
          <li
            className="navbar-link"
            role="menuitem"
            onClick={() => go("/TeamPage")}
          >
            Team
          </li>
        </ul>

        {/* Right: Contact + Hamburger */}
        <div className="navbar-right">
          <button className="contact-button" onClick={() => go("/contact")}>
            Contact Us
          </button>

          <button
            className={`hamburger ${open ? "active" : ""}`}
            aria-label="Toggle navigation"
            aria-controls="nav-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
