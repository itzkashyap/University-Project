import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // Handle input change in address form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressForm({
      ...addressForm,
      [name]: value,
    });
  };

  // Save the address form data
  const handleSaveAddress = async () => {
    if (Object.values(addressForm).some((value) => value === "")) return;

    try {
      const response = await axios.post("http://127.0.0.1:8080/address", addressForm);
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

  // Select an address
  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setAddressForm(address); // Pre-fill address form
  };

  // Fetch saved addresses and cart items
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/getaddress");
        setAddresses(response.data);
        fetchCart();
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    const fetchCart = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8080/getItems");
        setCart(res.data[0]); // Assuming the first element contains cart data
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Place the order with selected address and cart details
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setOrderStatus("Please select an address.");
      return;
    }

    try {
      const orderDetails = {
        userId: cart.userId,
        items: cart.items,
        totalPrice: cart.totalPrice,
        address: selectedAddress,
      };

      const res = await axios.post("http://127.0.0.1:8080/order", orderDetails);
      setOrderStatus(res.data.message); // Success message
      // alert(orderStatus);
      navigate("/thank-you"); // Redirect to a confirmation page
    } catch (error) {
      setOrderStatus("Error placing order.");
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order Summary</h2>

      <div>
        <h4>Order Details:</h4>
        <ul>
          {cart?.items?.map((item) => (
            <li key={item._id}>
              {item.productId.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      {/* Address Form */}
      <h5>Enter a New Address</h5>
      <form>
        {["street", "city", "state", "zipCode", "country"].map((field) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
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
        <button type="button" className="btn btn-primary mt-3" onClick={handleSaveAddress}>
          Save Address
        </button>
      </form>

      {/* Saved Addresses */}
      <h5 className="mt-4">Saved Addresses</h5>
      <div className="form-group">
        {addresses.map((address) => (
          <div key={address._id} className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="address"
              value={address._id}
              checked={selectedAddress?._id === address._id}
              onChange={() => handleAddressSelect(address)}
            />
            <label className="form-check-label">
              {`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`}
            </label>
          </div>
        ))}
      </div>

      {/* Selected Address */}
      <h5 className="mt-4">Selected Address</h5>
      <div className="alert alert-info">
        {selectedAddress
          ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipCode}, ${selectedAddress.country}`
          : "No address selected"}
      </div>

      {/* Order Summary */}
      <h3 className="text-end mt-4">Total: ${cart?.totalPrice}</h3>
      <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
        Proceed to Payment
      </button>

      {/* Order Status */}
      {orderStatus && <div className="mt-4 alert alert-info">{orderStatus}</div>}
    </div>
  );
};

export default OrderSummary;
