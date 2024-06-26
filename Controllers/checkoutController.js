import Stripe from 'stripe';
import dotenv from 'dotenv';


dotenv.config();
const stripe = new Stripe(process.env.STRIPE_TEST_KEY);
//console.log(process.env.STRIPE_TEST_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
 //console.log(items);
 let price = 0;
 let totalprice =0;
 items.forEach(async (el) => {
        // let menu_item = await req.models.menu_item.findOne({ _id: el.id });
        // price += parseInt(menu_item.price);
        // console.log(menu_item.price) // first 12 second 9
        // console.log(price) // first 12 second 21
        price += parseInt(el.courseprice);
       // price = 1400;
        
      });
      totalprice = price * 100;
  return totalprice;
};

export const createOrder = async (req, res) => {
  const { items } = req.body;
  // console.log(items);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}


