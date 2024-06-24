import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

// razor pay
const razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async(req,res)=>{
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt : "order_receiptId_11",
    payment_capture: 1
};
try {
    const response = await razorpay.orders.create(options)
    res.json({
        order_id: response.id,
        currency: response.currency,
        amount: response.amount,
    })
} catch (err) {
   res.status(400).send('Not able to create order. Please try again!');
}
}



