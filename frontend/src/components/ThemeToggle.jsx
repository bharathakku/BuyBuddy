import React, { useEffect, useState } from 'react';

function ThemeToggle({ size = '1rem' }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('bg-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('bg-dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="form-check form-switch" style={{ fontSize: size }}>
      <input
        className="form-check-input"
        type="checkbox"
        id="themeSwitch"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <label className="form-check-label ms-1" htmlFor="themeSwitch">
        {darkMode ? '🌙' : '☀️'}
      </label>
    </div>
  );
}

export default ThemeToggle;
