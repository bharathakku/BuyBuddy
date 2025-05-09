import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="navbar-brand fw-bold text-primary">
      <i className="bi bi-bag-heart"></i> BuyBuddy
    </Link>
  );
}

export default Logo;
