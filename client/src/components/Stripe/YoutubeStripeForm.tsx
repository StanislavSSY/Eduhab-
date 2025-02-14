import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"

const checkoutFormOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
}

const CheckoutForm2 = ({ success = () => {}, amount }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })

    if (!error) {
      const { id } = paymentMethod
      try {
        const { data } = await axios.post(`http://localhost:3100/stripe`, {
          id,
          amount,
        })
        alert("Ваш платеж принят! Спасибо, что поддержали автора :)")
        success()
      } catch ({ message, response }) {
        console.log(response ? response.data : message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement options={checkoutFormOptions} />
      <button className="square_btn">Оплатить</button>
      <style global jsx>{`
        .square_btn {
          width: 100%;
          max-width: 150px;
          display: inline-block;
          padding: 0.5em 1em;
          text-decoration: none;
          background: #54ad54; /*Button Color*/
          color: #fff;
          border-bottom: solid 4px #627295;
          border-radius: 3px;
          margin: 20px auto;
        }
        .square_btn:active {
          /*on Click*/
          -ms-transform: translateY(4px);
          -webkit-transform: translateY(4px);
          transform: translateY(4px); /*Move down*/
          border-bottom: none; /*disappears*/
        }
        .checkout-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </form>
  )
}

export default CheckoutForm2