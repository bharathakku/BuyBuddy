import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/apiService';

function OrderDetailsScreen() {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${orderId}`);
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading)
    return <div className="text-center text-light mt-5 fs-4">Loading...</div>;

  if (!order)
    return <div className="container mt-5 text-light fs-5">Order not found!</div>;

  const itemsPrice = order.orderItems?.reduce((acc, item) => acc + item.price * item.qty, 0) || 0;
  const shippingPrice = order.shippingPrice || 0;
  const totalPrice = order.totalPrice || itemsPrice + shippingPrice;

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4 text-primary fw-bold border-bottom border-secondary pb-2">
        Order #{order._id}
      </h2>
      <div className="row g-4">
        {/* LEFT COLUMN */}
        <div className="col-md-8">
          {/* SHIPPING ADDRESS */}
          <div className="glass-card p-4 mb-4">
            <h5 className="text-info fw-bold mb-2">Shipping Address</h5>
            <p className="mb-2">
              {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
            </p>
            {order.isDelivered ? (
              <div className="alert alert-success py-2 px-3">Delivered at {order.deliveredAt}</div>
            ) : (
              <div className="alert alert-warning py-2 px-3">Not Delivered</div>
            )}
          </div>

          {/* PAYMENT METHOD */}
          <div className="glass-card p-4 mb-4">
            <h5 className="text-info fw-bold mb-2">Payment Method</h5>
            <p>{order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="alert alert-success py-2 px-3">Paid at {order.paidAt}</div>
            ) : (
              <div className="alert alert-warning py-2 px-3">Not Paid</div>
            )}
          </div>

          {/* ORDER ITEMS */}
          <div className="glass-card p-4 mb-4">
            <h5 className="text-info fw-bold mb-3">Order Items</h5>
            {order?.orderItems?.length > 0 ? (
              order.orderItems.map((item) => (
                <div key={item._id} className="d-flex justify-content-between border-bottom border-secondary py-2">
                  <span>{item.name} × {item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p>No order items found.</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY */}
        <div className="col-md-4">
          <div className="glass-card p-4">
            <h5 className="text-info fw-bold mb-3">Order Summary</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent text-light d-flex justify-content-between border-secondary">
                <strong>Items</strong>
                <span>${itemsPrice.toFixed(2)}</span>
              </li>
              <li className="list-group-item bg-transparent text-light d-flex justify-content-between border-secondary">
                <strong>Shipping</strong>
                <span>${shippingPrice.toFixed(2)}</span>
              </li>
              <li className="list-group-item bg-transparent text-light d-flex justify-content-between border-secondary">
                <strong>Total</strong>
                <span className="text-primary fw-bold">${totalPrice.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsScreen;
