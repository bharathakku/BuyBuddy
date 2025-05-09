import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFullImageUrl } from '../utils/imageURL';

function Cart() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);

  return (
    <div className="container mt-5 pt-4">
      <h2 className="text-center mb-4 fw-bold text-uppercase">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="mb-3">Your cart is currently empty.</h5>
          <Link to="/" className="btn btn-dark px-4">
            <i className="fas fa-arrow-left me-2"></i>Back to Shop
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cart.map((item) => (
              <div className="card shadow-sm mb-3" key={item._id}>
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={getFullImageUrl(item.image)}
                      className="img-fluid rounded-start"
                      alt={item.name}
                      style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title mb-1">{item.name}</h5>
                      <p className="card-text text-muted mb-1">Quantity: {item.quantity || 1}</p>
                      <p className="card-text fw-bold text-dark">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3 text-end pe-3">
                    <h5 className="fw-semibold">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm p-4">
              <h4 className="mb-3">Order Summary</h4>
              <p className="mb-1">Items: <strong>{cart.length}</strong></p>
              <p className="mb-3">Total: <strong>${total}</strong></p>
              <button
                className="btn btn-dark w-100 py-2"
                onClick={checkoutHandler}
              >
                Proceed to Checkout <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
