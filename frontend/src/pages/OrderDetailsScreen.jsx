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

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!order) return <div className="container mt-5">Order not found!</div>;

  const itemsPrice = order.orderItems?.reduce((acc, item) => acc + item.price * item.qty, 0) || 0;
  const shippingPrice = order.shippingPrice || 0;
  const totalPrice = order.totalPrice || itemsPrice + shippingPrice;

  return (
    <div className="container mt-5">
      <h2>Order {order._id}</h2>
      <div className="row mt-4">
        {/* Shipping Address */}
        <div className="col-md-8">
          <div className="card p-3 mb-3">
            <h4>Shipping Address</h4>
            <p>
              {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
            </p>
            {order.isDelivered ? (
              <div className="alert alert-success">Delivered at {order.deliveredAt}</div>
            ) : (
              <div className="alert alert-warning">Not Delivered</div>
            )}
          </div>

          {/* Payment Method */}
          <div className="card p-3 mb-3">
            <h4>Payment Method</h4>
            <p>{order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="alert alert-success">Paid at {order.paidAt}</div>
            ) : (
              <div className="alert alert-warning">Not Paid</div>
            )}
          </div>

          {/* Order Items */}
          <div className="card p-3 mb-3">
            <h4>Order Items</h4>
            {order?.orderItems?.length > 0 ? (
              order.orderItems.map((item) => (
                <div key={item._id} className="d-flex justify-content-between">
                  <div>{item.name} x {item.qty}</div>
                  <div>${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <p>No order items found.</p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-4">
          <div className="card p-3">
            <h4>Order Summary</h4>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between">
                <strong>Items</strong>
                <span>${itemsPrice.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Shipping</strong>
                <span>${shippingPrice.toFixed(2) || '0.00'}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <span>${totalPrice.toFixed(2) || '0.00'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsScreen;
