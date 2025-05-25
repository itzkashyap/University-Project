import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navigations/Routes";

const CheckoutForm = ({ amount, cart, selectedAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!stripe || !elements || !amount || !selectedAddress) {
      setMessage("Please select an address and ensure the cart is loaded.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "https://university-project-44ul.onrender.com/api/payments/create-payment-intent",
        {
          amount, // No need to multiply by 100 here
          currency: "inr",
        }
      );
      

      if (!data.clientSecret) {
        throw new Error("Failed to initialize payment. Please try again.");
      }

      const cardElement = elements.getElement(CardElement);
if (!cardElement) {
  setMessage("Payment method is missing. Please enter card details.");
  setLoading(false);
  return;
}

const result = await stripe.confirmCardPayment(data.clientSecret, {
  payment_method: { card: cardElement },
});


      if (result.error) {
        throw new Error(result.error.message);
      }

      const orderDetails = {
        userId: localStorage.getItem("id"),
        items: cart.items,
        totalPrice: cart.totalPrice,
        address: selectedAddress,
        status: "Pending",
      };

      const orderResponse = await axios.post(
        "https://university-project-44ul.onrender.com/api/orders/placeOrder",
        orderDetails
      );
      
      const orderId = orderResponse.data.order._id;

      await axios.put(
        `https://university-project-44ul.onrender.com/api/orders/updateOrderStatus/${orderId}`,
        { status: "Success" }
      );
      await axios.post("https://university-project-44ul.onrender.com/carts/clearCartAfterPayment", {
        userId: localStorage.getItem("id"),  // Pass userId here
      });

      setMessage("Payment Successful! Redirecting...");
      setTimeout(() => navigate(ROUTES.ThankuPage.name), 3000);

    } catch (error) {
      setMessage(error.message || "Payment failed. Please try again.");
      console.error("Error processing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="form-control my-3" />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
