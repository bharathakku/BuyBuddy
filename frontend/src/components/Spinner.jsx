import React from 'react';

function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
      <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
