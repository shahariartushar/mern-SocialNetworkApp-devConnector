import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='dashboard.html'>
          {' '}
          <i className='fas fa-code'></i> DevConnector{' '}
        </a>
      </h1>
      <ul>
        <li>
          <a href='profiles.html'>Developers</a>
        </li>
        <li>
          <a href='posts.html'>Posts</a>
        </li>
        <li>
          <a href='dashboard.html'>
            <i className='fas fa-user'></i>
            <span className='hide-sm'> Dashboard</span>
          </a>
        </li>
        <li>
          <a href='login.html'>
            <i className='fas fa-sign-out-alt'></i>
            <span className='hide-sm'> Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
