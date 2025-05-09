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

  if (!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5 pt-4">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img
            src={imageSrc}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
            loading="lazy"
          />

        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success mb-3">${product.price}</h4>

          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="quantity" className="me-2">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              style={{ width: '80px' }}
              min="1"
              max={product.countInStock || 10}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Math.min(Number(e.target.value), product.countInStock || 10)))
              }
            />
          </div>

          <button className="btn btn-dark w-100" onClick={addToCartHandler}>
            <i className="fas fa-cart-plus me-2"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
