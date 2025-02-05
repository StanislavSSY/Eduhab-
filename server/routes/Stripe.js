
const express = require("express");
const app = express();
const router = require("express").Router();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51OJsu6JcIJPxUw0xiiRQpyl0wqLof46NRcyfmH1bbpNx8RtbTg1ESyzeyFRNQs8fIWGspY1ErHZf4qHIlR15oqpL00Pc4F7DmA');

// app.use(express.static("public"));
// app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1999;
};

router.post("/", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items) ,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


module.exports = router;
//app.listen(4242, () => console.log("Node server listening on port 4242!"));