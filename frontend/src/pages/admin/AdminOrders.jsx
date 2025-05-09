import React, { useEffect, useState } from 'react';
import API from '../../services/apiService';
import { toast } from 'react-toastify';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders function
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/orders');
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Handler to mark an order as delivered
  const deliverHandler = async (id) => {
    try {
      const { data } = await API.put(`/orders/${id}/deliver`);
      toast.success('Order marked as delivered');

      // Optimistically update UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, isDelivered: true, deliveredAt: data.deliveredAt } : order
        )
      );
    } catch (error) {
      toast.error('Failed to update delivery status');
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-sm p-4">
        <h3 className="fw-bold mb-4">Manage Orders</h3>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-dark" role="status" />
            <p className="mt-2">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-muted">No orders found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Delivered</th>
                  <th>Delivered At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(0, 10)}...</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.isDelivered ? 'bg-success' : 'bg-warning text-dark'
                        }`}
                      >
                        {order.isDelivered ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      {order.isDelivered
                        ? new Date(order.deliveredAt).toLocaleString()
                        : 'Pending'}
                    </td>
                    <td>
                      {!order.isDelivered && (
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => deliverHandler(order._id)}
                        >
                          Mark Delivered
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
