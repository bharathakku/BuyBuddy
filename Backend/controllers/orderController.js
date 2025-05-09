import Order from '../models/Order.js';

export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  // Backend-controlled pricing logic
  const itemsPrice = Number(orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2)); // Example: 15% tax
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example: Free shipping for orders > $100
  const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
   console.error('Order creation error:', error.message, error.stack);

    res.status(500).json({ message: 'Failed to create order' });
  }
};


// Get all orders for the logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Failed to get orders' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
      if (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin) {
        res.json(order);
      } else {
        res.status(403).json({ message: 'Not authorized to view this order' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order to paid
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Update order payment error:', error);
    res.status(500).json({ message: 'Failed to update payment status' });
  }
};

// Update order to delivered
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Deliver error:', error);
    res.status(500).json({ message: 'Failed to update order to delivered' });
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, paymentStatus, paymentDetails } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = paymentDetails;

    await order.save();

    res.status(200).send({ message: 'Payment status updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
