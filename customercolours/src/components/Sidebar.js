import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return(
    <div>
      <nav>
        <NavLink exact to = '/'>Home</NavLink>
      </nav>
      </div>
  )
}

export default Sidebar;