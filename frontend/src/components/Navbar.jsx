import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  useEffect(() => {
    if (onSearch) {
      const delayDebounce = setTimeout(() => {
        onSearch(searchTerm.trim());
      }, 300); // Adjust debounce time as needed

      return () => clearTimeout(delayDebounce);
    }
  }, [searchTerm, onSearch]);

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
        <Link className="navbar-brand fw-bold fs-4" to="/">
          BuyBuddy
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isNavbarCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavbarCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav align-items-center ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-lg-3 my-2 my-lg-0">
              <input
                className="form-control"
                style={{ minWidth: '250px' }}
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="fas fa-shopping-cart me-1"></i> Cart
              </Link>
            </li>

            {userInfo ? (
              <>
                {!userInfo.isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <i className="fas fa-user me-1"></i> Profile
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

                {userInfo.isAdmin && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                      <li><Link className="dropdown-item" to="/admin/products">Products</Link></li>
                      <li><Link className="dropdown-item" to="/admin/orders">Orders</Link></li>
                      <li><Link className="dropdown-item" to="/admin/users">Users</Link></li>
                    </ul>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

            <li className="nav-item ms-3">
              <ThemeToggle size="sm" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
