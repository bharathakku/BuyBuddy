import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cart and shipping info from localStorage
    localStorage.removeItem('cart');
    localStorage.removeItem('shippingAddress');

    toast.success('Payment successful!');

    // Redirect after 5 seconds (optional)
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <h2>🎉 Payment Successful!</h2>
      <p>Thank you for your order. We've received your payment.</p>
      <p>You will be redirected shortly...</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Go to Home Now
      </button>
    </div>
  );
}

export default Success;
