import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ clientSecret, selectedAddress, cart, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: selectedAddress.street,
        },
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment Successful!");
      navigate("/thank-you");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mt-4">Enter Payment Details</h5>
      <CardElement className="form-control mb-3" />
      <button type="submit" className="btn btn-primary" disabled={!stripe}>
        Pay ${cart?.totalPrice}
      </button>
    </form>
  );
};

export default PaymentForm;
