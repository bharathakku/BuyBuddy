import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const fallbackImage = 'https://via.placeholder.com/500x500?text=No+Image';

const ProductCard = ({ product }) => {
  const [imageSrc, setImageSrc] = useState(product.image || fallbackImage);

  return (
    <div className="card h-100 shadow-sm border-0 rounded-3">
      <img
        src={imageSrc}
        alt={product.name}
        className="card-img-top"
        style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
        loading="lazy"
      />


      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold">{product.name}</h5>
        <p className="card-text text-muted fs-5">${product.price}</p>
        <Link
          to={`/product/${product._id}`}
          className="btn btn-dark mt-auto"
          style={{ borderRadius: '6px' }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
