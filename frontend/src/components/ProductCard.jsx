import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const fallbackImage = 'https://via.placeholder.com/500x500?text=No+Image';

const ProductCard = ({ product }) => {
  const [imageSrc, setImageSrc] = useState(product.image || fallbackImage);

  return (
    <div
      className="card border-0 shadow-sm rounded-4 product-card transition position-relative"
      style={{
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(255,255,255,0.85)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.05)';
      }}
    >
      {/* Product Image */}
      <img
        src={imageSrc}
        alt={product.name}
        className="card-img-top"
        style={{
          height: '240px',
          objectFit: 'cover',
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
        }}
        onError={() => setImageSrc(fallbackImage)}
        loading="lazy"
      />

      {/* Card Body */}
      <div className="card-body d-flex flex-column px-4 pb-4">
        <h5
          className="card-title fw-semibold text-truncate mb-1"
          title={product.name}
          style={{ fontSize: '1.1rem' }}
        >
          {product.name}
        </h5>
        <p className="card-text text-muted fs-5 mb-3">${product.price.toFixed(2)}</p>

        <Link
          to={`/product/${product._id}`}
          className="btn btn-outline-primary mt-auto rounded-pill fw-medium"
          style={{
            transition: 'all 0.2s ease',
          }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
