import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

function AdminNavbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/admin/dashboard">
          BuyBuddy Admin
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="adminNavbarNav"
          aria-expanded={!isNavbarCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavbarCollapsed ? 'collapse' : ''} navbar-collapse`} id="adminNavbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/orders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">Users</Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
            <li className="nav-item ms-2">
              <ThemeToggle size="0.95rem" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
