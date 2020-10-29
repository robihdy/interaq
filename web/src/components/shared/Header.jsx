import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="hero-head">
      <nav className="tabs">
        <div className="navbar-end">
          <div className="container">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="create-meeting">Create a Meeting</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
