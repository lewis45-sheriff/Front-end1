import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // State to manage navbar visibility
  let lastScrollTop = 0; // Variable to hold the last scroll position

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Get the current scroll position

    if (scrollTop > lastScrollTop) {
      setIsHidden(true); // Hide navbar when scrolling down
    } else {
      setIsHidden(false); // Show navbar when scrolling up
    }
    lastScrollTop = scrollTop; // Update the last scroll position
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on component unmount
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div>
      {/* Toggle button for the mobile menu */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <i className={`fa ${menuActive ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
      </div>

      {/* Mobile menu */}
      <div id="menu" className={`text-left ${menuActive ? 'active' : ''}`} style={{ top: isHidden ? '-60px' : '0' }}>
        {/* Logo */}
        <div className="logo">
          <img src="my-wine-app/src/assets/atlas liquor logo.svg" alt="Logo" />
        </div>
        {/* Menu items */}
        <ul className="offcanvas_main_menu_horizontal">
          <li className="menu-item-has-children active">
            {/* Use Link component with 'to' prop for routing */}
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* Use Link component with 'to' prop for routing */}
            <Link to="/wines">Products</Link>
          </li>
          <li className="menu-item-has-children">
            {/* Use Link component with 'to' prop for routing */}
            <Link to="/about">About Us</Link>
          </li>
          <li className="menu-item-has-children">
            {/* Use Link component with 'to' prop for routing */}
            <Link to="/reviews">Reviews</Link>
          </li>
        </ul>

        {/* User link */}
        <ul className="menu-item-children">
          {/* Use Link component with 'to' prop for routing */}
          <Link to="/login" className="login-link">
            <i className="fa fa-user-o" aria-hidden="true"></i> Login
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
