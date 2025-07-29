import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    setIsDarkMode(localStorage.getItem('theme') === 'dark');
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.getAttribute('data-bs-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (onSearch) {
      const delayDebounce = setTimeout(() => {
        onSearch(searchTerm.trim());
      }, 300);
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
    <nav
      className={`navbar navbar-expand-lg ${
        isDarkMode ? 'navbar-dark bg-dark border-bottom' : 'navbar-light bg-white border-bottom'
      } shadow-sm fixed-top py-3 transition`}
    >
      <div className="container">
        <Link className={`navbar-brand fw-bold fs-4 ${isDarkMode ? 'text-light' : 'text-dark'}`} to="/">
          <i className="fas fa-car me-2 text-primary"></i>
          Buy<span className="text-primary">Buddy</span>
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
          <ul className="navbar-nav align-items-lg-center w-100 d-flex flex-lg-row gap-3 mt-3 mt-lg-0">

            {/* Search */}
            <li className="nav-item flex-grow-1 me-auto">
              <input
                className={`form-control rounded-pill px-4 border-2 ${
                  isDarkMode ? 'bg-dark text-light border-primary' : 'border-primary'
                }`}
                type="search"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link className={`nav-link fw-medium d-flex align-items-center ${isDarkMode ? 'text-light' : 'text-dark'}`} to="/cart">
                <i className="fas fa-shopping-cart me-1 text-primary"></i> Cart
              </Link>
            </li>

            {/* User Info */}
            {userInfo ? (
              <>
                {!userInfo.isAdmin && (
                  <li className="nav-item">
                    <Link className={`nav-link fw-medium ${isDarkMode ? 'text-light' : 'text-dark'}`} to="/profile">
                      <i className="fas fa-user me-1 text-secondary"></i> Profile
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger rounded-pill px-3 py-1 fw-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

                {userInfo.isAdmin && (
                  <li className="nav-item dropdown">
                    <a
                      className={`nav-link dropdown-toggle fw-medium ${isDarkMode ? 'text-light' : 'text-dark'}`}
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <ul className={`dropdown-menu dropdown-menu-end ${isDarkMode ? 'dropdown-menu-dark' : ''}`}>
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
                  <Link className="btn btn-outline-primary rounded-pill px-3 py-1 fw-medium" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary rounded-pill px-3 py-1 fw-medium" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Theme Toggle */}
            <li className="nav-item ms-lg-2">
              <ThemeToggle size="1.25rem" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
