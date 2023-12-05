import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  

  return (
    
    <form onSubmit>
      
      <PaymentElement />
     
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
   
  );
};
export default CheckoutForm

// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

// const options = {
//   mode: 'payment',
//   amount: 1099,
//   currency: 'usd',
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };
// const Apps = () => (
//     <Elements stripe={stripePromise} options={options}>
//       <Strype />
//     </Elements>
//   );
  
//   ReactDOM.render(<Apps />, document.body);
