import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/apiService';
import { toast } from 'react-toastify';

const fallbackImage = 'https://via.placeholder.com/500x500?text=No+Image';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageSrc, setImageSrc] = useState(fallbackImage);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setImageSrc(data.image || fallbackImage);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load product details');
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existsIndex = cart.findIndex((item) => item._id === product._id);

    if (existsIndex !== -1) {
      cart[existsIndex].quantity += quantity;
      toast.success('Cart updated');
    } else {
      cart.push({ ...product, quantity });
      toast.success('Added to cart!');
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (!product)
    return <div className="container mt-5 text-light fs-4">Loading...</div>;

  return (
    <div className="container mt-5 text-light">
      <div className="row g-5 align-items-center">
        {/* Image */}
        <div className="col-md-6">
          <div className="glass-card p-3">
            <img
              src={imageSrc}
              alt={product.name}
              className="img-fluid rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Details */}
        <div className="col-md-6">
          <div className="glass-card p-4">
            <h2 className="fw-bold mb-2 text-primary">{product.name}</h2>
            <p className="text-muted">{product.description}</p>
            <h4 className="text-success mb-4">${product.price}</h4>

            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="quantity" className="me-3 fw-semibold">Qty:</label>
              <input
                type="number"
                id="quantity"
                className="form-control bg-dark text-light border-secondary"
                style={{ width: '80px' }}
                min="1"
                max={product.countInStock || 10}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Math.min(Number(e.target.value), product.countInStock || 10)))
                }
              />
            </div>

            <button
              className="btn btn-primary w-100 fw-semibold shadow-sm"
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >
              <i className="fas fa-cart-plus me-2"></i> Add to Cart
            </button>

            {product.countInStock === 0 && (
              <div className="mt-3 text-danger">Out of stock</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
