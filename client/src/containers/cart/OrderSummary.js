import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "../../style.css";
// import ROUTES from "../../navigations/Routes";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Payment.js"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QKvH8HUA52nefNOQSVGLBvgsZObhLtxHGQVZTEjuwo4UMOHEOzrCFhzN9EPpUBcRfWoMHhGqldDZMhUmMDJWAyh00O2nAPpAZ");

const OrderSummary = () => {
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to control payment form visibility
  // const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressForm({
      ...addressForm,
      [name]: value,
    });
  };

  const handleSaveAddress = async () => {
    if (Object.values(addressForm).some((value) => value === "")) return;

    try {
      const response = await axios.post("https://university-project-44ul.onrender.com/address", addressForm);
      setAddresses([...addresses, response.data]);
      setAddressForm({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setAddressForm(address);
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("https://university-project-44ul.onrender.com/getaddress");
        setAddresses(response.data);
        fetchCart();
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    const fetchCart = async () => {
      try {
        const res = await axios.get("https://university-project-44ul.onrender.com/getItems");
        setCart(res.data[0]);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setOrderStatus("Please select an address.");
      return;
    }

    // Show the payment form instead of placing the order directly
    setShowPaymentForm(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order Summary</h2>

      {/* Order Details */}
      <div className="card p-3 mb-4">
        <h4>Order Details:</h4>
        <ul className="list-group">
          {cart?.items?.map((item) => (
            <li key={item._id} className="list-group-item">
              <strong>{item.productId.name}</strong> - {item.price} x{" "}
              {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      {/* Address Form */}
      <div className="card p-3 mb-4">
        <h5>Enter a New Address</h5>
        <form>
          {["street", "city", "state", "zipCode", "country"].map((field) => (
            <div className="form-group mt-2" key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                className="form-control"
                id={field}
                name={field}
                value={addressForm[field]}
                onChange={handleInputChange}
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleSaveAddress}
          >
            Save Address
          </button>
        </form>
      </div>

      {/* Saved Addresses */}
      <div className="card p-3 mb-4">
        <h5>Saved Addresses</h5>
        <div className="form-group">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`address-card mt-2 p-2 ${
                selectedAddress?._id === address._id ? "selected" : ""
              }`}
              onClick={() => handleAddressSelect(address)}
            >
              <input
                type="radio"
                className="form-check-input"
                name="address"
                value={address._id}
                checked={selectedAddress?._id === address._id}
                onChange={() => handleAddressSelect(address)}
              />
              <label className="form-check-label ms-2">
                {`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Address */}
      <div className="card p-3 mb-4">
        <h5>Selected Address</h5>
        <div className="alert alert-info">
          {selectedAddress
            ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipCode}, ${selectedAddress.country}`
            : "No address selected"}
        </div>
      </div>

      {/* Order Summary & Payment */}
      <h3 className="text-end mt-4">Total Price: ₹{cart?.totalPrice}</h3>
      <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
        Proceed to Payment
      </button>

      {/* Order Status */}
      {orderStatus && (
        <div className="mt-4 alert alert-info">{orderStatus}</div>
      )}

      {/* Conditionally render the CheckoutForm */}
      {showPaymentForm && cart?.totalPrice && selectedAddress && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={cart?.totalPrice}
            cart={cart}
            selectedAddress={selectedAddress}
          />
        </Elements>
      )}
    </div>
  );
};

export default OrderSummary;