
import Order from '../models/Order.js';

export const updatePaymentStatus = async (orderId, paymentIntent) => {
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      console.error('Order not found');
      return;
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      update_time: new Date().toISOString(), // you can replace this with Stripe's timestamp if available
      email_address: paymentIntent.receipt_email,
    };

    await order.save();
    console.log(` Payment updated for order ID: ${orderId}`);
  } catch (error) {
    console.error(' Error updating payment status:', error.message);
  }
};
