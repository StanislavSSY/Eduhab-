import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import StripeCheckout from "react-stripe-checkout"
const Stripe = () => {
 
   const onToken = (token) => {

        console.log(token)

    }

  return (

   

    <div className="stripe">

<StripeCheckout 
token={onToken}
stripeKey = 'pk_test_51OJsu6JcIJPxUw0xSj7tft2vqN7rLGzfLd81OPm0HWplrSHEuTCxhdTIH3pIFMEBs8eIpWyuBAsB3nJhqzYCIdMK0000TDHWle'
/>
        
    </div>
   
  );
};
export default Stripe


