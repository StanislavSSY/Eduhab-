import React, { useState, useEffect } from "react"
import { useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js"
import axios from "axios"
import CheckoutForm2 from "./YoutubeStripeForm"

const Payment = () => {
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState(null)
  const [amount] = useState(1000)

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Оплата за курс ......",
          amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
      })
      pr.canMakePayment()
        .then((result) => {
          if (result) {
            console.log(result)
            setPaymentRequest(pr)
          }
        })
        .catch(console.error)
    }
  }, [stripe, amount])

  if (paymentRequest) {
    paymentRequest.on("paymentmethod", async (event) => {
      const {
        id,
        billing_details: { email, phone },
      } = event.paymentMethod
      try {
        const { data } = await axios.post(`http://localhost:3100/stripe`, {
          id,
          amount,
          email,
          phone,
        })
        event.complete("success")
        console.log('data', data)
      } catch ({ message, response }) {
        event.complete("fail")
        console.log('response.data :message ', response ? response.data : message)
      }
    })
  }

  return (
    <>
      {paymentRequest ? (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      ) : (
        <CheckoutForm2 amount={amount} />
      )}
    </>
  )
}

export default Payment