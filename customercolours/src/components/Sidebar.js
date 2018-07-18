import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return(
    <div>
    <div className = "navbar">
      <nav>
        <NavLink exact to = '/' style={{ textDecoration: 'none' }}><h2>Home</h2></NavLink>
        <NavLink exact to = '/customers' style={{ textDecoration: 'none' }}><h2>Customers</h2></NavLink>
        </nav>
      </div>
     <div className = "horizontal"></div>
     </div>
  )
}

export default Sidebar;