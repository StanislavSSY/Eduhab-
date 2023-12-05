import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// const stripePromise = loadStripe("pk_test_51OJsu6JcIJPxUw0xSj7tft2vqN7rLGzfLd81OPm0HWplrSHEuTCxhdTIH3pIFMEBs8eIpWyuBAsB3nJhqzYCIdMK0000TDHWle");

 const AppStripe = () => {
//   const [clientSecret, setClientSecret] = useState("");

//   // Получение значения clientSecret
//   useEffect(() => {
//     // Пример: Получение clientSecret с вашего сервера
//     fetch("/ваш-серверный-эндпоинт")
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, []);

const stripePromise = loadStripe('pk_test_51OJsu6JcIJPxUw0xSj7tft2vqN7rLGzfLd81OPm0HWplrSHEuTCxhdTIH3pIFMEBs8eIpWyuBAsB3nJhqzYCIdMK0000TDHWle');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

  return (
     <div className="AppStripe">
{/* //     
//         <Elements stripe={stripePromise}>
//           <CheckoutForm clientSecret={clientSecret} />
//         </Elements>
//       )} */}

<Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
    </div>

  );
};

 export default AppStripe;


//  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

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