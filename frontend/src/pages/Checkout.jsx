import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../services/apiService';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // needed for email

  const [editMode, setEditMode] = useState(false);
  const [address, setAddress] = useState(savedAddress?.address || '');
  const [city, setCity] = useState(savedAddress?.city || '');
  const [postalCode, setPostalCode] = useState(savedAddress?.postalCode || '');
  const [country, setCountry] = useState(savedAddress?.country || '');

  useEffect(() => {
    if (!savedAddress) {
      toast.error('Please provide a shipping address first.');
      navigate('/shipping');
    }
  }, [savedAddress, navigate]);

  const itemsPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = itemsPrice + shippingPrice;
  
const placeOrderHandler = async () => {
  const updatedAddress = { address, city, postalCode, country };

  try {
    const orderItems = cart.map((item) => ({
      product: item._id,
      name: item.name,
      qty: item.quantity || 1,
      price: item.price,
      image: item.image || '',
    }));

    // ✅ Add token to headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data: order } = await API.post(
      '/orders',
      {
        orderItems,
        shippingAddress: updatedAddress,
        paymentMethod: 'Stripe',
        itemsPrice,
        shippingPrice,
        totalPrice,
      },
      config
    );

    const { data: session } = await API.post(
      '/payment/create-checkout-session',
      {
        orderId: order._id,
        items: orderItems,
        email: userInfo?.email || '',
      },
      config
    );

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    toast.error('Failed to start Stripe payment.');
  }
};

  const saveEditedAddress = () => {
    const updated = { address, city, postalCode, country };
    localStorage.setItem('shippingAddress', JSON.stringify(updated));
    toast.success('Address updated!');
    setEditMode(false);
  };

  if (!cart.length) return <div className="container mt-5">Cart is empty!</div>;

  return (
    <div className="container mt-5 pt-4">
      <h2 className="mb-4 text-center">🧾 Checkout</h2>

      <div className="row g-4">
        {/* Shipping Address */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Shipping Address</h5>
              {!editMode && (
                <button className="btn btn-sm btn-outline-dark" onClick={() => setEditMode(true)}>
                  Edit
                </button>
              )}
            </div>

            {editMode ? (
              <div>
                <div className="mb-2">
                  <label>Address</label>
                  <input
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>City</label>
                  <input
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>Postal Code</label>
                  <input
                    className="form-control"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Country</label>
                  <input
                    className="form-control"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-dark w-100" onClick={saveEditedAddress}>
                  Save Address
                </button>
              </div>
            ) : (
              <p className="mb-0">
                {address}, {city}, {postalCode}, {country}
              </p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Order Summary</h5>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {item.name} <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="mb-1">Items: <strong>${itemsPrice.toFixed(2)}</strong></p>
            <p className="mb-1">Shipping: <strong>${shippingPrice.toFixed(2)}</strong></p>
            <h5 className="mb-3">Total: <strong>${totalPrice.toFixed(2)}</strong></h5>
            <button className="btn btn-dark w-100" onClick={placeOrderHandler}>
              Pay with Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
