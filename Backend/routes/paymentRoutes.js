import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import { updatePaymentStatus } from '../controllers/paymentController.js'; // ✅ Adjust path if needed

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware: use raw only for webhook
router.use((req, res, next) => {
  if (req.originalUrl === '/api/payment/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// ✅ Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  const { orderId, items, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      })),
      mode: 'payment',
      metadata: { orderId }, // ✅ Use metadata instead of parsing from URL
      // success_url: `https://buy-buddy-nine.vercel.app/success`,
      // cancel_url: `https://buy-buddy-nine.vercel.app/cancel`,
      success_url: `http://localhost:5173/success`,
cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ error: 'Stripe checkout failed' });
  }
});


export default router;
