import React, { useEffect, useState } from 'react';

function ThemeToggle({ size = '1.25rem' }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute('data-bs-theme', 'dark');
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-bs-theme', 'light');
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      style={{
        fontSize: size,
        backgroundColor: darkMode ? '#1C69D4' : '#ccc',
        color: darkMode ? '#fff' : '#000',
        padding: '6px 14px',
        borderRadius: '50px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 0 8px rgba(28, 105, 212, 0.4)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: darkMode ? '1px solid #1C69D4' : '1px solid #bbb',
      }}
    >
      <i className={`fas ${darkMode ? 'fa-moon' : 'fa-sun'}`}></i>
      <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </span>
    </div>
  );
}

export default ThemeToggle;
