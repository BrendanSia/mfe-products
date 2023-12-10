import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/listing">Listing</Link>
          <Link to="/data-entry">Create/Edit</Link>
          <Link to="/detail">Detail</Link>
        </li>
        {/* Add more links for other pages */}
      </ul>
    </nav>
  );
};

export default Navigation;