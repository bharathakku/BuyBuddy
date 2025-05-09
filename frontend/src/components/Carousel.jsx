import React from 'react';

const Carousel = () => {
  const imageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  };

  return (
    <div id="heroCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
      <div className="carousel-inner">

        <div className="carousel-item active">
          <img
            src="/uploads/BLACK_FRIDAY_SPLASH_BANNER_01.jpg"
            className="d-block w-100"
            alt="Slide 1"
            style={imageStyle}
          />
        </div>

        <div className="carousel-item">
          <img
            src="/uploads/BLACKFRII_Mesa_de_trabajo_1.jpg"
            className="d-block w-100"
            alt="Slide 2"
            style={imageStyle}
          />
        </div>

        <div className="carousel-item">
          <img
            src="/uploads/5309774.jpg"
            className="d-block w-100"
            alt="Slide 3"
            style={imageStyle}
          />
        </div>

      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Carousel;
