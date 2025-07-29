import React from 'react';

const Carousel = () => {
  const imageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '1rem',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.1))',
    borderRadius: '1rem',
  };

  return (
    <div id="heroCarousel" className="carousel slide mb-5 position-relative" data-bs-ride="carousel">
      <div className="carousel-inner shadow-lg rounded-4">

        <div className="carousel-item active position-relative">
          <img
            src="/uploads/BLACK_FRIDAY_SPLASH_BANNER_01.jpg"
            className="d-block w-100"
            alt="Slide 1"
            style={imageStyle}
          />
          <div style={overlayStyle}></div>
        </div>

        <div className="carousel-item position-relative">
          <img
            src="/uploads/BLACKFRII_Mesa_de_trabajo_1.jpg"
            className="d-block w-100"
            alt="Slide 2"
            style={imageStyle}
          />
          <div style={overlayStyle}></div>
        </div>

        <div className="carousel-item position-relative">
          <img
            src="/uploads/5309774.jpg"
            className="d-block w-100"
            alt="Slide 3"
            style={imageStyle}
          />
          <div style={overlayStyle}></div>
        </div>

      </div>

      {/* Custom Buttons */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3 shadow" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon bg-dark rounded-circle p-3 shadow" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Carousel;
