import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Payment from "./YoutubePayment"

const stripePromise = loadStripe("pk_test_51OJsu6JcIJPxUw0xSj7tft2vqN7rLGzfLd81OPm0HWplrSHEuTCxhdTIH3pIFMEBs8eIpWyuBAsB3nJhqzYCIdMK0000TDHWle")

const Index = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  )
}

export default Index