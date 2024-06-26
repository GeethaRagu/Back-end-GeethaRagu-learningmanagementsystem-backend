import express from 'express';
import { createOrder } from '../Controllers/checkoutController.js';



const router  = express.Router();

router.post('/create-payment-intent',createOrder);

export default router;