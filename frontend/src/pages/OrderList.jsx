import React, { useEffect, useState } from 'react';
import API from '../services/apiService';
import { toast } from 'react-toastify';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '$0.00';
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) return;

        const { data } = await API.get('/orders/myorders', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sorted);
      } catch (error) {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <span className="badge bg-success">Delivered</span>;
      case 'shipped':
        return <span className="badge bg-info text-dark">Shipped</span>;
      case 'cancelled':
        return <span className="badge bg-danger">Cancelled</span>;
      default:
        return <span className="badge bg-secondary">Pending</span>;
    }
  };

  if (loading) return <div className="container mt-5">Loading orders...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info">You have no orders yet.</div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-6 mb-4" key={order._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Order #{order._id.slice(-6).toUpperCase()}</h5>
                  <p className="card-text mb-1"><strong>Total:</strong> {formatCurrency(order.totalPrice)}</p>
                  <p className="card-text mb-1"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="card-text mb-2"><strong>Status:</strong> {getStatusBadge(order.status)}</p>
                  <p className="card-text"><strong>Payment:</strong> Cash on Delivery</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderList;
