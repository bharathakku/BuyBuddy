import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/apiService';
import { toast } from 'react-toastify';

function ProfileScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) return navigate('/login');

        const { data } = await API.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        setUser(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="text-center mt-5">Loading profile...</div>;
  if (!user) return null;

  return (
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <i className="fas fa-user-circle fa-5x text-secondary mb-3"></i>
              <h4 className="card-title">{user.name}</h4>
              <p className="card-text text-muted">{user.email}</p>
              <span className="badge bg-info text-dark">{user.role}</span>
              <p className="mt-3">
                <small className="text-muted">
                  Joined on {new Date(user.createdAt).toLocaleDateString()}
                </small>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="row g-3">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-list me-2"></i>Order Summary
                  </h5>
                  <p className="text-muted">You can track all your previous orders from the orders section.</p>
                  <Link to="/orders" className="btn btn-outline-primary">View Orders</Link>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="fas fa-shopping-cart me-2"></i>Your Cart
                  </h5>
                  <p className="text-muted">Check your cart and complete your purchases.</p>
                  <Link to="/cart" className="btn btn-outline-success">Go to Cart</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
