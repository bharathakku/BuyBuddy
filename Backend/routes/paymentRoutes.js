// Update payment status for an order
const updatePaymentStatus = async (orderId, paymentIntent) => {
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return { error: 'Order not found' };
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      update_time: new Date().toISOString(),
      email_address: paymentIntent.receipt_email,
    };

    await order.save();
    return { success: 'Order payment updated successfully' };
  } catch (error) {
    console.error('Failed to update payment status:', error);
    return { error: 'Failed to update payment status' };
  }
};
