import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container pt-5 mt-4 mb-5">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      <div className="card shadow-sm p-4">
        <h4 className="mb-3">Welcome, Admin 👋</h4>
        <p className="mb-4">Use the quick links below to manage your store's data efficiently.</p>

        <div className="d-grid gap-3 d-md-flex">
          <Link to="/admin/products" className="btn btn-dark">
            🛒 Manage Products
          </Link>
          <Link to="/admin/orders" className="btn btn-outline-primary">
            📦 Manage Orders
          </Link>
          <Link to="/admin/users" className="btn btn-outline-secondary">
            👥 Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
