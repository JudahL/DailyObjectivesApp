import React from 'react';
import { Link } from 'react-router-dom';
import SignoutButton from './SignoutButton';
import '../componentsCss/NavBar.css';

export default function NavBar() {
  return (
    <nav className="Nav">
      <div className="Nav-container">
        <Link to="/">
          <h1 className="Nav-title">
            Daily Objectives
          </h1>
        </Link>
        <SignoutButton />
      </div>
    </nav>
  );
}
