import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Menu({ onLogout, isLoggedIn }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };
    return (
      <nav>
        <ul>
          <li><Link to="dashboard">Dashboard</Link></li>
          <li><Link to="summary">Summary</Link></li>
          <li><Link to="reports">Reports</Link></li>
          {isLoggedIn && (
            <li><button className="menu-btn logout-btn" onClick={handleLogout}>Log Out</button></li>
          )}
        </ul>
      </nav>
    );
  }
  
  export default Menu;